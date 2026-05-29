import React, { useState, useEffect } from 'react'
import { fetchDashboardData } from '../services/apiClient'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  Sector,
  Rectangle,
} from 'recharts'
import './Dashboard.css'

const Dashboard = ({ refreshTrigger }) => {
  const [dashboardData, setDashboardData] = useState(null)
  const [allData, setAllData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChartLoading, setIsChartLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalRecords, setTotalRecords] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(500)
  const [pageDataCount, setPageDataCount] = useState(0)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null)
  const [activeUploaderIndex, setActiveUploaderIndex] = useState(null)
  const [activeFileIndex, setActiveFileIndex] = useState(null)

  const normalizeCategoryForVisualization = (value) => {
    const category = (value || '').toString().trim().toLowerCase()

    if (!category || ['uncategory', 'uncategorized', 'unknown', 'other', 'lainnya'].includes(category)) {
      return 'Lainnya'
    }

    if (
      category.includes('sembako') ||
      category.includes('bumbu') ||
      category.includes('daily need')
    ) {
      return 'Sembako'
    }

    if (
      category.includes('food') ||
      category.includes('beverage') ||
      category.includes('minuman') ||
      category.includes('makanan') ||
      category.includes('food & beverage') ||
      category.includes('food and beverage')
    ) {
      return 'Makanan dan Minuman'
    }

    if (
      category.includes('perawatan') ||
      category.includes('perawatan bayi') ||
      category.includes('perawatan pribadi') ||
      category.includes('personal care')
    ) {
      return 'Perawatan'
    }

    if (category.includes('rokok')) {
      return 'Rokok'
    }

    if (category.includes('pembersih') || category.includes('kebersihan')) {
      return 'Kebersihan'
    }

    return 'Lainnya'
  }

  const uploaderChartData = Object.entries(
    (allData || []).reduce((acc, row) => {
      const key = row.uploaded_by || 'Unknown'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  const fileChartData = Object.entries(
    (allData || []).reduce((acc, row) => {
      const key = row.source_file || 'Unknown'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  const categoryOrder = ['Lainnya', 'Sembako', 'Makanan dan Minuman', 'Perawatan', 'Kebersihan', 'Rokok']
  const categoryCounts = (allData || []).reduce((acc, row) => {
    const key = normalizeCategoryForVisualization(row.category)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
  const categoryChartData = categoryOrder
    .map((name) => ({ name, value: categoryCounts[name] || 0 }))
    .filter((item) => item.value > 0)

  const chartColors = ['#60a5fa', '#22c55e', '#f59e0b', '#a78bfa', '#14b8a6', '#ef4444']

  useEffect(() => {
    loadDashboardData()
  }, [refreshTrigger, page])

  useEffect(() => {
    loadAllDataForCharts()
  }, [refreshTrigger])

  const loadDashboardData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchDashboardData({ page, page_size: pageSize })
      setDashboardData(result.data || [])
      setTotalRecords(result.total_records || result.total_records_fetched || 0)
      setPageDataCount(result.data?.length || 0)
    } catch (err) {
      setError(err.message || 'Gagal memuat data dashboard')
      console.error('Dashboard error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const loadAllDataForCharts = async () => {
    setIsChartLoading(true)
    try {
      const result = await fetchDashboardData({ page: 1, page_size: 10000 })
      setAllData(result.data || [])
    } catch (err) {
      console.error('Chart data error:', err)
      setAllData([])
    } finally {
      setIsChartLoading(false)
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

  const chartTooltipStyle = {
    background: '#0b1220',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#f8fafc',
    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.45)',
  }

  const chartTooltipLabelStyle = {
    color: '#f8fafc',
    fontWeight: 700,
  }

  const chartTooltipItemStyle = {
    color: '#f8fafc',
  }

  const renderActiveCategoryShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 12}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  const renderActiveBarShape = (props) => {
    const { x, y, width, height, fill } = props

    return (
      <Rectangle
        x={x - 3}
        y={y - 10}
        width={width + 6}
        height={height + 10}
        fill={fill}
        radius={[10, 10, 0, 0]}
        opacity={1}
      />
    )
  }

  const getBarCellFill = (index, activeIndex, baseColor) => {
    if (activeIndex === null) {
      return baseColor
    }

    return index === activeIndex ? baseColor : 'rgba(148, 163, 184, 0.22)'
  }

  const totalPages = Math.max(Math.ceil(totalRecords / pageSize), 1)

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
          title="Page Records"
          value={pageDataCount}
          color="purple"
        />
        <StatCard
          icon={<i className="fas fa-clock"></i>}
          title="Last Updated"
          value={dashboardData?.[0]?.processed_at ? new Date(dashboardData[0].processed_at).toLocaleDateString('id-ID') : 'N/A'}
          color="orange"
        />
      </div>

      <div className="pagination-bar">
        <div className="pagination-info">
          <span>Page {page} dari {totalPages}</span>
          <span>Menampilkan {pageDataCount} data per halaman</span>
        </div>
        <div className="pagination-actions">
          <button
            className="pagination-btn"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page <= 1 || isLoading}
          >
            Previous
          </button>
          <button
            className="pagination-btn"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page >= totalPages || isLoading}
          >
            Next
          </button>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card chart-card-bar">
          <div className="chart-card-header">
            <h3 className="section-title"><i className="fas fa-layer-group"></i> Distribusi Upload per User</h3>
            <p className="chart-subtitle">Jumlah data berdasarkan username peng-upload, dari seluruh data yang ada</p>
          </div>
          <div className="chart-box chart-box-bar">
            {isChartLoading ? (
              <div className="chart-empty">Memuat seluruh data untuk visualisasi...</div>
            ) : uploaderChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={uploaderChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={chartTooltipItemStyle}
                  />
                  <Bar
                    dataKey="value"
                    fill="#60a5fa"
                    radius={[8, 8, 0, 0]}
                    activeBar={renderActiveBarShape}
                    onMouseEnter={(_, index) => setActiveUploaderIndex(index)}
                    onMouseLeave={() => setActiveUploaderIndex(null)}
                  >
                    {uploaderChartData.map((entry, index) => (
                      <Cell
                        key={`uploader-cell-${index}`}
                        fill={getBarCellFill(index, activeUploaderIndex, '#60a5fa')}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">Belum ada data untuk divisualisasikan</div>
            )}
          </div>
        </div>

        <div className="chart-card chart-card-bar">
          <div className="chart-card-header">
            <h3 className="section-title"><i className="fas fa-file-alt"></i> File yang Diupload</h3>
            <p className="chart-subtitle">Daftar file CSV yang masuk, dihitung dari seluruh data yang ada</p>
          </div>
          <div className="chart-box chart-box-bar">
            {isChartLoading ? (
              <div className="chart-empty">Memuat seluruh data untuk visualisasi...</div>
            ) : fileChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={fileChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={chartTooltipItemStyle}
                  />
                  <Bar
                    dataKey="value"
                    fill="#22c55e"
                    radius={[8, 8, 0, 0]}
                    activeBar={renderActiveBarShape}
                    onMouseEnter={(_, index) => setActiveFileIndex(index)}
                    onMouseLeave={() => setActiveFileIndex(null)}
                  >
                    {fileChartData.map((entry, index) => (
                      <Cell
                        key={`file-cell-${index}`}
                        fill={getBarCellFill(index, activeFileIndex, '#22c55e')}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">Belum ada file upload untuk divisualisasikan</div>
            )}
          </div>
        </div>
      </div>

      <div className="chart-grid-donut">
        <div className="chart-card chart-card-donut">
          <div className="chart-card-header">
            <h3 className="section-title"><i className="fas fa-chart-pie"></i> Komposisi Kategori</h3>
            <p className="chart-subtitle">Distribusi kategori dari seluruh data yang ada</p>
          </div>
          <div className="chart-box chart-box-pie">
            {categoryChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    activeIndex={activeCategoryIndex ?? undefined}
                    activeShape={renderActiveCategoryShape}
                    onMouseEnter={(_, index) => setActiveCategoryIndex(index)}
                    onMouseLeave={() => setActiveCategoryIndex(null)}
                    onClick={(_, index) => setActiveCategoryIndex(index)}
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={chartTooltipStyle}
                    labelStyle={chartTooltipLabelStyle}
                    itemStyle={chartTooltipItemStyle}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">Belum ada data kategori untuk divisualisasikan</div>
            )}
          </div>
        </div>
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
                  <th>Uploaded By</th>
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
                    <td className="col-user">{row.uploaded_by || '-'}</td>
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
