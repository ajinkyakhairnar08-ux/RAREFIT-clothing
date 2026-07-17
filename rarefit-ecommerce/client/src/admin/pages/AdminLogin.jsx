import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import '../adminStyles.css'

export default function AdminLogin() {
  const ready = useAuthStore((state) => state.ready)
  const adminChecked = useAuthStore((state) => state.adminChecked)
  const user = useAuthStore((state) => state.user)
  const isAdmin = useAuthStore((state) => state.isAdmin)
  const loginAdmin = useAuthStore((state) => state.loginAdmin)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (ready && adminChecked && user && isAdmin) return <Navigate to="/dashboard" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const result = await loginAdmin(email, password)
    if (!result.ok) {
      setSubmitting(false)
      setError(result.error)
      return
    }
    // Wait for the admin-role check (Firestore read) to resolve before
    // navigating, so a non-admin account gets a clear error instead of
    // bouncing straight back to this page.
    const settled = await new Promise((resolve) => {
      const unsubscribe = useAuthStore.subscribe((state) => {
        if (state.adminChecked) {
          unsubscribe()
          resolve(state.isAdmin)
        }
      })
      if (useAuthStore.getState().adminChecked) {
        unsubscribe()
        resolve(useAuthStore.getState().isAdmin)
      }
    })
    setSubmitting(false)
    if (settled) {
      navigate('/dashboard')
    } else {
      setError('This account is not authorized to access the dashboard.')
    }
  }

  return (
    <div className="admin-scope">
      <div className="auth-screen">
        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-logo">🛍️ StyleHub Admin</div>
          <h1>Welcome back</h1>
          <p className="auth-sub">Sign in to manage products, blogs, and payments.</p>

          {error && <div className="auth-error">{error}</div>}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@store.com"
              autoComplete="username"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
