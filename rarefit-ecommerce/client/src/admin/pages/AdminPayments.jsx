import { useEffect, useMemo, useState } from 'react'
import { subscribeToPayments } from '../lib/db'

const STATUS_FILTERS = ['All', 'Completed', 'Pending', 'Failed', 'Refunded']

export default function Payments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const unsubscribe = subscribeToPayments((docs) => {
      setPayments(docs)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const filtered = useMemo(
    () => (filter === 'All' ? payments : payments.filter((p) => p.status === filter)),
    [payments, filter]
  )

  const totalRevenue = useMemo(
    () => payments.filter((p) => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
    [payments]
  )

  return (
    <div>
      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-label">Total Revenue</span>
          <span className="stat-value">₹{totalRevenue.toLocaleString()}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Transactions</span>
          <span className="stat-value">{payments.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{payments.filter((p) => p.status === 'Pending').length}</span>
        </div>
      </div>

      <div className="filter-row">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            className={'chip' + (filter === s ? ' chip-active' : '')}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="card table-card">
        {loading ? (
          <p className="empty-state">Loading transactions…</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="mono" title={p.id}>{p.id.slice(0, 8)}…</td>
                  <td>{p.customer}</td>
                  <td>{p.product}</td>
                  <td>₹{p.amount.toLocaleString()}</td>
                  <td>{p.method}</td>
                  <td>{p.date}</td>
                  <td><span className={'status-badge status-' + p.status.toLowerCase()}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && filtered.length === 0 && <p className="empty-state">No transactions for this filter.</p>}
      </div>
    </div>
  )
}
