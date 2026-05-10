import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
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
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Terjadi kesalahan'
    return Promise.reject({
      status: error.response?.status,
      message,
      data: error.response?.data
    })
  }
)

/**
 * Upload CSV file dan process dengan ML
 * @param {File} file - CSV file dari input
 * @returns {Promise} Upload result dengan mapping dan preview
 */
export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  return axios.post(
    `${API_BASE_URL}/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: API_TIMEOUT,
    }
  ).then((response) => response.data)
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
