import React, { useState, useRef } from 'react'
import { uploadFile } from '../services/apiClient'
import './FileUpload.css'

const FileUpload = ({ onUploadSuccess, onUploadError }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      onUploadError?.('Hanya file CSV yang diizinkan')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      onUploadError?.('Ukuran file terlalu besar (max 10MB)')
      return
    }

    setIsLoading(true)
    setUploadProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 30
        })
      }, 200)

      const result = await uploadFile(file)
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Reset after successful upload
      setTimeout(() => {
        setIsLoading(false)
        setUploadProgress(0)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        onUploadSuccess?.(result)
      }, 500)
    } catch (error) {
      setIsLoading(false)
      setUploadProgress(0)
      onUploadError?.(error.message || 'Gagal upload file')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
    const files = e.dataTransfer.files
    if (files.length > 0) {
      fileInputRef.current.files = files
      handleFileSelect({ target: { files } })
    }
  }

  return (
    <div className="file-upload-container">
      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="file-input"
          id="csv-input"
        />

        <label htmlFor="csv-input" className="upload-label">
          <div className="upload-icon">📁</div>
          <h3 className="upload-title">Pilih atau Drag File CSV</h3>
          <p className="upload-description">
            Dukungan: CSV (max 10MB)
          </p>
          {isLoading && (
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="progress-text">{Math.round(uploadProgress)}%</p>
            </div>
          )}
        </label>

        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Memproses file...</p>
          </div>
        )}
      </div>

      <div className="upload-info">
        <h4 className="info-title">📋 Format File CSV</h4>
        <p className="info-text">
          File CSV harus memiliki kolom-kolom seperti: ID, Nama, Harga, Stok, Kategori, dll.
          Sistem akan otomatis mendeteksi dan memetakan kolom ke standar BigQuery.
        </p>
      </div>
    </div>
  )
}

export default FileUpload
