import React, { useState } from 'react';
import './App.css';
import DesignAnalyzer from './components/DesignAnalyzer';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [analysisResults, setAnalysisResults] = useState(null);

  return (
    <div className="App">
      <header className="header">
        <h1>🎨 Etsy AI App</h1>
        <p>T-shirt Design Analyzer & Sales Optimizer</p>
      </header>

      <nav className="navbar">
        <button
          className={`nav-btn ${activeTab === 'analyzer' ? 'active' : ''}`}
          onClick={() => setActiveTab('analyzer')}
        >
          📸 Design Analyzer
        </button>
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'analyzer' && (
          <DesignAnalyzer onAnalysisComplete={setAnalysisResults} />
        )}
        {activeTab === 'dashboard' && <Dashboard results={analysisResults} />}
      </main>

      <footer className="footer">
        <p>© 2026 Etsy AI App - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;