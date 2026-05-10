import React, { useState, useEffect } from 'react'
import './Alert.css'

const Alert = ({ message, type = 'info', duration = 5000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const iconMap = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-icon">{iconMap[type]}</span>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose}>×</button>
    </div>
  )
}

export default Alert
