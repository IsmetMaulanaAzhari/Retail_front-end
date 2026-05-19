import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import FileUpload from './components/FileUpload'
import DataPreview from './components/DataPreview'
import Dashboard from './components/Dashboard'
import Alert from './components/Alert'
import Login from './components/Login'
import './App.css'

function App() {
  const [uploadResult, setUploadResult] = useState(null)
  const [alert, setAlert] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [activeTab, setActiveTab] = useState('upload')
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('access_token')))
  const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || '')

  const isAdmin = userRole === 'admin'
  const isUser = userRole === 'user'

  useEffect(() => {
    if (isAdmin) {
      setActiveTab('dashboard')
    } else if (isUser) {
      setActiveTab('upload')
    }
  }, [isAdmin, isUser])

  const showAlert = (message, type = 'info', duration = 5000) => {
    setAlert({ message, type, duration })
  }

  const handleUploadSuccess = (result) => {
    setUploadResult(result)
    setActiveTab('preview')
    showAlert(`File ${result.metadata?.source_file} berhasil diproses!`, 'success')

    setTimeout(() => {
      setRefreshTrigger((prev) => prev + 1)
      setActiveTab('dashboard')
    }, 2000)
  }

  const handleUploadError = (error) => {
    showAlert(error || 'Gagal mengupload file', 'error')
  }

  const handleAlertClose = () => {
    setAlert(null)
  }

  const handleLoginSuccess = (result) => {
    setIsAuthenticated(true)
    setUserRole(result?.role || localStorage.getItem('user_role') || 'user')
    showAlert('Login berhasil', 'success')
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_role')
    localStorage.removeItem('username')
    setIsAuthenticated(false)
    setUserRole('')
    setActiveTab('upload')
    showAlert('Logged out', 'info')
  }

  const content = isAuthenticated ? (
    <div className="content">
      <div style={{ textAlign: 'right', marginBottom: 8 }}>
        <button onClick={handleLogout}>Logout</button>
        <span style={{ marginLeft: 12, color: '#cbd5e1', fontSize: 13 }}>
          Role: {userRole || 'unknown'}
        </span>
      </div>

      {isUser && (
        <>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              <i className="fas fa-upload"></i> Upload Data
            </button>
            <button
              className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <i className="fas fa-chart-bar"></i> Preview Hasil
            </button>
          </div>

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
          </div>
        </>
      )}

      {isAdmin && (
        <>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <i className="fas fa-chart-line"></i> Dashboard
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'dashboard' && (
              <section className="tab-pane">
                <Dashboard refreshTrigger={refreshTrigger} />
              </section>
            )}
          </div>
        </>
      )}
    </div>
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} showAlert={showAlert} />
  )

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

        {content}

        <footer className="footer">
          <p className="footer-text">
            Copyright 2026 Retail Data Warehouse | Machine Learning Powered Data Pipeline
          </p>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span>-</span>
            <a href="#docs">Documentation</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
