import React, { useState } from 'react';
import axios from 'axios';
import './DesignAnalyzer.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function DesignAnalyzer({ onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Lütfen bir görsel seçin');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/v1/analyze/design`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setResults(response.data);
      onAnalysisComplete(response.data);
    } catch (err) {
      setError('Analiz başarısız: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-container">
      <div className="upload-section">
        <h2>📸 Tasarımınızı Yükleyin</h2>
        <div className="upload-area">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
          <p>{selectedFile ? selectedFile.name : 'Dosya seçmek için tıklayın'}</p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !selectedFile}
          className="analyze-btn"
        >
          {loading ? '⏳ Analiz ediliyor...' : '🔍 Analiz Et'}
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>

      {results && (
        <div className="results-section">
          <h2>📊 Analiz Sonuçları</h2>
          <div className="results-grid">
            <div className="result-card">
              <h3>Baskı Uygunluğu</h3>
              <p className="score">{(results.print_suitability * 100).toFixed(0)}%</p>
            </div>
            <div className="result-card">
              <h3>Kalite Puanı</h3>
              <p className="score">{(results.quality_score * 100).toFixed(0)}%</p>
            </div>
            <div className="result-card">
              <h3>Pattern Karmaşıklığı</h3>
              <p className="score">{(results.pattern_complexity * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div className="recommendations">
            <h3>💡 Öneriler</h3>
            <ul>
              {results.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignAnalyzer;