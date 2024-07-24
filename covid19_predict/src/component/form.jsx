import React, { useState } from 'react';

const PredictionForm = () => {
  const [provinceState, setProvinceState] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [incidentRate, setIncidentRate] = useState('');
  const [caseFatalityRatio, setCaseFatalityRatio] = useState('');
  const [testingRate, setTestingRate] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      Province_State: provinceState,
      month: parseFloat(month),
      year: parseFloat(year),
      Incident_Rate: parseFloat(incidentRate),
      Case_Fatality_Ratio: parseFloat(caseFatalityRatio),
      Testing_Rate: parseFloat(testingRate)
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const result = await response.json();
      setResponse(result);
    } catch (error) {
      setError('Error al enviar los datos: ' + error.message);
    }
  };

  // Función para redondear números y mostrar solo la parte entera
  const formatPrediction = (value) => Math.floor(value);

  return (
    <div>
      <h1>Formulario de Predicción</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="provinceState">Estado/Provincia:</label>
          <input
            type="text"
            id="provinceState"
            value={provinceState}
            onChange={(e) => setProvinceState(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="month">Mes:</label>
          <input
            type="number"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Año:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="incidentRate">Tasa de Incidencia:</label>
          <input
            type="number"
            id="incidentRate"
            value={incidentRate}
            onChange={(e) => setIncidentRate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="caseFatalityRatio">Tasa de Mortalidad:</label>
          <input
            type="number"
            id="caseFatalityRatio"
            value={caseFatalityRatio}
            onChange={(e) => setCaseFatalityRatio(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="testingRate">Tasa de Pruebas:</label>
          <input
            type="number"
            id="testingRate"
            value={testingRate}
            onChange={(e) => setTestingRate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {response && (
        <div>
          <p>Muertes predichas: {formatPrediction(response.prediction[0][0])}</p>
          <p>Casos predichos: {formatPrediction(response.prediction[0][1])}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PredictionForm;
