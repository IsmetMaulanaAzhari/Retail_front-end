import React, { useState, useEffect } from 'react'
import { fetchDashboardData } from '../services/apiClient'
import './Dashboard.css'

const Dashboard = ({ refreshTrigger }) => {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalRecords, setTotalRecords] = useState(0)

  useEffect(() => {
    loadDashboardData()
  }, [refreshTrigger])

  const loadDashboardData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchDashboardData()
      setDashboardData(result.data || [])
      setTotalRecords(result.total_records || 0)
    } catch (err) {
      setError(err.message || 'Gagal memuat data dashboard')
      console.error('Dashboard error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const StatCard = ({ icon, title, value, color }) => (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Memuat data dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <p className="error-icon"><i className="fas fa-exclamation-triangle"></i></p>
          <h3>Gagal Memuat Data</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={loadDashboardData}>
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title"><i className="fas fa-chart-line"></i> Dashboard</h2>
        <button className="refresh-btn" onClick={loadDashboardData}>
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<i className="fas fa-chart-bar"></i>}
          title="Total Records"
          value={totalRecords.toLocaleString('id-ID')}
          color="blue"
        />
        <StatCard
          icon={<i className="fas fa-folder"></i>}
          title="Data Sources"
          value={new Set(dashboardData?.map(d => d.source_file) || []).size}
          color="green"
        />
        <StatCard
          icon={<i className="fas fa-check"></i>}
          title="Processed"
          value={dashboardData?.length || 0}
          color="purple"
        />
        <StatCard
          icon={<i className="fas fa-clock"></i>}
          title="Last Updated"
          value={dashboardData?.[0]?.processed_at ? new Date(dashboardData[0].processed_at).toLocaleDateString('id-ID') : 'N/A'}
          color="orange"
        />
      </div>

      {dashboardData && dashboardData.length > 0 ? (
        <div className="data-grid-section">
          <h3 className="section-title"><i className="fas fa-list"></i> Data Terbaru</h3>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Source File</th>
                  <th>Processed At</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'even' : 'odd'}>
                    <td className="col-no">{idx + 1}</td>
                    <td className="col-id">{row.product_id || '-'}</td>
                    <td className="col-name">{row.product_name || '-'}</td>
                    <td className="col-price">{typeof row.price === 'number' ? `Rp${row.price.toLocaleString('id-ID')}` : row.price || '-'}</td>
                    <td className="col-stock">{row.stock || 0}</td>
                    <td className="col-category">{row.category || '-'}</td>
                    <td className="col-source">
                      <span className="badge">{row.source_file || '-'}</span>
                    </td>
                    <td className="col-date">
                      {row.processed_at ? new Date(row.processed_at).toLocaleDateString('id-ID') : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>📭 Belum ada data di dashboard</p>
          <span>Upload file CSV untuk menampilkan data di sini</span>
        </div>
      )}
    </div>
  )
}

export default Dashboard
