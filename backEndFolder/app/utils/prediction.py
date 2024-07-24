import pandas as pd
import numpy as np

def predict_cases(input_data: dict, label_encoder, scaler, model):
    """
    Función para predecir el número de casos confirmados.

    Parameters:
    - input_data: dict con las siguientes llaves:
        'Province_State': str
        'month': int
        'year': int
        'Incident_Rate': float
        'Case_Fatality_Ratio': float
        'Testing_Rate': float

    Returns:
    - Predicción del número de casos confirmados.
    """
    
    # Convertir el diccionario de entrada en un DataFrame
    input_df = pd.DataFrame([input_data])

    # Codificar la variable categórica 'Province_State'
    input_df['Province_State'] = label_encoder.transform(input_df['Province_State'])

    # Escalar las características numéricas
    input_transformed = scaler.transform(input_df)
    
    # Hacer la predicción
    prediction_log = model.predict(input_transformed)
    
    return prediction_log
