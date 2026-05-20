import React, { useState } from 'react'
import { login } from '../services/apiClient'
import './Login.css'

export default function Login({ onLoginSuccess, showAlert }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await login(username, password)
      setLoading(false)
      onLoginSuccess(result)
    } catch (err) {
      setLoading(false)
      const msg = err?.message || err?.detail || 'Login gagal'
      showAlert(msg, 'error')
    }
  }

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-hero">
          <p className="login-kicker">Retail DW Access</p>
          <h2>Masuk untuk melanjutkan</h2>
          <p className="login-copy">
            Admin dapat melihat dashboard dan visualisasi data.
          </p>
          <p>
            User digunakan untuk upload data.
          </p>
        </div>

        <form className="login-card" onSubmit={submit}>
          <div className="login-card-head">
            <span className="login-badge">Session Auto-Detect</span>
            <h3>Login</h3>
          </div>

          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" />

          <button type="submit" disabled={loading}>
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
