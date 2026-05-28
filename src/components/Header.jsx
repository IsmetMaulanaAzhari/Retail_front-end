import React from 'react'
import './Header.css'

const Header = ({ userRole, username, isAuthenticated, onLogout }) => {
  const displayName = username || userRole || 'unknown'

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo"><i className="fas fa-chart-bar"></i> Retail DW</h1>
            <p className="subtitle">Data Warehouse Management System</p>
          </div>
          <div className="header-badges">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span className="status-text">System Active</span>
            </div>

            {isAuthenticated && (
              <div className={`role-badge role-${userRole || 'unknown'}`}>
                <span className="role-badge-label">Username</span>
                <span className="role-badge-value">{displayName}</span>
              </div>
            )}

            {isAuthenticated && (
              <button className="logout-button header-logout-button" onClick={onLogout} type="button">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
