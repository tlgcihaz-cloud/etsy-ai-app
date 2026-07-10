import React from 'react';
import './Dashboard.css';

function Dashboard({ results }) {
  if (!results) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <p>📊 Dashboard bilgisi göstermek için tasarım analizi yapın</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>📊 Analiz Panosu</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Tasarım ID</h3>
          <p>{results.design_id}</p>
        </div>
        <div className="dashboard-card">
          <h3>Baskı Uygunluğu</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${results.print_suitability * 100}%` }}
            ></div>
          </div>
          <p>{(results.print_suitability * 100).toFixed(0)}%</p>
        </div>
        <div className="dashboard-card">
          <h3>Kalite Puanı</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${results.quality_score * 100}%` }}
            ></div>
          </div>
          <p>{(results.quality_score * 100).toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;