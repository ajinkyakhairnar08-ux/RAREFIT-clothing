import { useEffect, useState } from 'react'
import { formatDate, subscribeToUsers } from '../lib/db'
import { deleteCustomer, resetCustomerPassword } from '../lib/customerActions'

export default function Customers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [resetTarget, setResetTarget] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [resetError, setResetError] = useState('')
  const [resetSuccess, setResetSuccess] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToUsers((docs) => {
      setUsers(docs)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  function openReset(user) {
    setResetTarget(user)
    setNewPassword('')
    setResetError('')
    setResetSuccess('')
  }

  function closeReset() {
    setResetTarget(null)
    setNewPassword('')
    setResetError('')
    setResetSuccess('')
  }

  async function handleResetSubmit(e) {
    e.preventDefault()
    if (newPassword.length < 6) {
      setResetError('New password must be at least 6 characters.')
      return
    }
    setSaving(true)
    setResetError('')
    try {
      await resetCustomerPassword(resetTarget.id, newPassword)
      setResetSuccess('Password updated successfully.')
      setNewPassword('')
    } catch (err) {
      setResetError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(user) {
    if (!window.confirm(`Delete ${user.name || user.email}? This permanently removes their account and cannot be undone.`)) {
      return
    }
    setDeletingId(user.id)
    try {
      await deleteCustomer(user.id)
      if (resetTarget?.id === user.id) closeReset()
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="page-header">
        <p className="page-subtitle">{users.length} registered storefront customers</p>
      </div>

      {resetTarget && (
        <form className="card form-card" onSubmit={handleResetSubmit}>
          <h3>Reset password for {resetTarget.name || resetTarget.email}</h3>
          <p className="page-subtitle seed-text">{resetTarget.email}</p>

          {resetError && <div className="auth-error">{resetError}</div>}
          {resetSuccess && <div className="auth-success">{resetSuccess}</div>}

          <label className="field">
            <span>New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              required
            />
          </label>

          <div className="reset-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Update Password'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={closeReset}>Close</button>
          </div>
        </form>
      )}

      <div className="card table-card">
        {loading ? (
          <p className="empty-state">Loading customers…</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Signed Up Via</th>
                <th>Joined</th>
                <th>Last Login</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="customer-cell">
                      {u.photoURL ? (
                        <img className="customer-avatar" src={u.photoURL} alt={u.name} />
                      ) : (
                        <div className="avatar customer-avatar-fallback">
                          {(u.name || u.email || '?')[0].toUpperCase()}
                        </div>
                      )}
                      <span>{u.name || 'Unnamed'}</span>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td><span className="tag">{u.provider === 'google' ? 'Google' : 'Email'}</span></td>
                  <td>{formatDate(u.createdAt)}</td>
                  <td>{formatDate(u.lastLoginAt) || '—'}</td>
                  <td>
                    <div className="customer-actions">
                      <button className="btn btn-ghost btn-sm" onClick={() => openReset(u)}>Reset Password</button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(u)}
                        disabled={deletingId === u.id}
                      >
                        {deletingId === u.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && users.length === 0 && (
          <p className="empty-state">No customers have registered on the storefront yet.</p>
        )}
      </div>
    </div>
  )
}
