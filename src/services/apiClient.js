import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://apiretail.ramidzelab.my.id/api'
const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api$/, '')
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Attach Authorization header when token available
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('[API] Request:', config.method.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('[API] Response OK:', response.status)
    return response.data
  },
  (error) => {
    console.log('[API] Error:', error.message, error.response?.status)
    const message = error.response?.data?.message || error.message || 'Terjadi kesalahan'
    return Promise.reject({
      status: error.response?.status,
      message,
      data: error.response?.data,
      isNetworkError: !error.response
    })
  }
)

/**
 * Check if Backend is online
 * @returns {Promise<boolean>}
 */
export const checkBackendHealth = async () => {
  try {
    await axios.get(`${BACKEND_BASE_URL}/docs`, { 
      timeout: 5000 
    })
    return true
  } catch (error) {
    console.log('[API] Backend health check failed:', error.message)
    return false
  }
}

/**
 * Upload CSV file dan process dengan ML
 * @param {File} file - CSV file dari input
 * @returns {Promise} Upload result dengan mapping dan preview
 */
export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    console.log('[API] Uploading file:', file.name)
    const response = await apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    })
    console.log('[API] Upload success')
    return response
  } catch (error) {
    console.log('[API] Upload error:', error.message)
    if (error.code === 'ECONNABORTED') {
      throw new Error(`Timeout - Backend tidak merespons. Pastikan Backend running di ${BACKEND_BASE_URL}`)
    }
    if (!error.response) {
      throw new Error(`Network Error - Backend tidak dapat diakses di ${BACKEND_BASE_URL}. Status: ${error.message}`)
    }
    throw new Error(error.response?.data?.detail || error.response?.data?.message || 'Gagal upload file')
  }
}

/**
 * Login dan simpan token ke localStorage
 */
export const login = async (username, password) => {
  try {
    const resp = await axios.post(`${API_BASE_URL}/auth/login`, { username, password })
    const token = resp.data?.access_token
    if (token) {
      localStorage.setItem('access_token', token)
      localStorage.setItem('user_role', resp.data?.role || '')
      localStorage.setItem('username', resp.data?.username || username)
    }
    return resp.data
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' }
  }
}

/**
 * Fetch dashboard data dari BigQuery
 * @returns {Promise} Data dengan preview
 */
export const fetchDashboardData = async () => {
  return apiClient.get('/data')
}

/**
 * Fetch data dengan filter/pagination
 * @param {Object} params - Query parameters (limit, offset, search)
 * @returns {Promise} Filtered data
 */
export const fetchDataWithParams = async (params = {}) => {
  return apiClient.get('/data', { params })
}

/**
 * Get statistics/summary dari data
 * @returns {Promise} Statistics data
 */
export const fetchStatistics = async () => {
  return apiClient.get('/statistics')
}

/**
 * Get processing history
 * @returns {Promise} History data
 */
export const fetchProcessingHistory = async () => {
  return apiClient.get('/history')
}

export default apiClient
