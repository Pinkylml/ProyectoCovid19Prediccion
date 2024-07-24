from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
import joblib
import pandas as pd
import tensorflow as tf
from app.utils.prediction import predict_cases


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las IPs
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Cargar los objetos necesarios
label_encoder = joblib.load('app/assets/label_encoder.pkl')
scaler = joblib.load('app/assets/scaler.pkl')
model = tf.keras.models.load_model('app/models/model.h5')

class PredictionRequest(BaseModel):
    Province_State: str
    month: int
    year: int
    Incident_Rate: float
    Case_Fatality_Ratio: float
    Testing_Rate: float

@app.post("/predict")
async def predict(request: PredictionRequest):
    print(type(request.month))
    try:
        input_data = request.dict()
        
        prediction = predict_cases(input_data, label_encoder, scaler, model)
        return {"prediction": prediction.tolist()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
