import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">📊 Retail DW</h1>
            <p className="subtitle">Data Warehouse Management System</p>
          </div>
          <div className="status-badge">
            <span className="status-dot"></span>
            <span className="status-text">System Active</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
