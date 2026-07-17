import { useEffect, useState } from 'react'
import { formatDate, subscribeToUsers } from '../lib/db'

export default function Customers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToUsers((docs) => {
      setUsers(docs)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <div>
      <div className="page-header">
        <p className="page-subtitle">{users.length} registered storefront customers</p>
      </div>

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
