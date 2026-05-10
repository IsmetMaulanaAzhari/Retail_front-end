import React, { useState } from 'react'
import Header from './components/Header'
import FileUpload from './components/FileUpload'
import DataPreview from './components/DataPreview'
import Dashboard from './components/Dashboard'
import Alert from './components/Alert'
import './App.css'

function App() {
  const [uploadResult, setUploadResult] = useState(null)
  const [alert, setAlert] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [activeTab, setActiveTab] = useState('upload')

  const showAlert = (message, type = 'info', duration = 5000) => {
    setAlert({ message, type, duration })
  }

  const handleUploadSuccess = (result) => {
    setUploadResult(result)
    setActiveTab('preview')
    showAlert(
      `✓ File ${result.metadata?.source_file} berhasil diproses!`,
      'success'
    )
    // Refresh dashboard setelah upload sukses
    setTimeout(() => {
      setRefreshTrigger(prev => prev + 1)
      setActiveTab('dashboard')
    }, 2000)
  }

  const handleUploadError = (error) => {
    showAlert(error || 'Gagal mengupload file', 'error')
  }

  const handleAlertClose = () => {
    setAlert(null)
  }

  return (
    <div className="app">
      <Header />

      <div className="app-container">
        <div className="alert-container">
          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              duration={alert.duration}
              onClose={handleAlertClose}
            />
          )}
        </div>

        <div className="content">
          {/* Navigation Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              📤 Upload File
            </button>
            <button
              className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              📊 Preview Data
            </button>
            <button
              className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📈 Dashboard
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'upload' && (
              <section className="tab-pane">
                <FileUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                />
              </section>
            )}

            {activeTab === 'preview' && (
              <section className="tab-pane">
                <DataPreview
                  mappingResult={uploadResult?.mapping_result}
                  previewData={uploadResult?.preview_data}
                  fileName={uploadResult?.metadata?.source_file}
                />
              </section>
            )}

            {activeTab === 'dashboard' && (
              <section className="tab-pane">
                <Dashboard refreshTrigger={refreshTrigger} />
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            © 2026 Retail Data Warehouse | Machine Learning Powered Data Pipeline
          </p>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span>•</span>
            <a href="#docs">Documentation</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
