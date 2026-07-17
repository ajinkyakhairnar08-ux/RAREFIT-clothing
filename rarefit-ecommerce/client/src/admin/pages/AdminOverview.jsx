import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { toAdminProfile } from '../lib/adminProfile'
import { seedSampleDataIfEmpty, subscribeToBlogs, subscribeToPayments, subscribeToProducts } from '../lib/db'

export default function AdminOverview() {
  const user = toAdminProfile(useAuthStore((state) => state.user))
  const [products, setProducts] = useState([])
  const [blogs, setBlogs] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => {
    const unsubProducts = subscribeToProducts((docs) => {
      setProducts(docs)
      setLoading(false)
    })
    const unsubBlogs = subscribeToBlogs(setBlogs)
    const unsubPayments = subscribeToPayments(setPayments)
    return () => {
      unsubProducts()
      unsubBlogs()
      unsubPayments()
    }
  }, [])

  const revenue = useMemo(
    () => payments.filter((p) => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
    [payments]
  )

  const lowStock = products.filter((p) => p.stock < 20).length
  const showSeedButton = !loading && products.length === 0 && blogs.length === 0 && payments.length === 0

  async function handleSeed() {
    setSeeding(true)
    try {
      await seedSampleDataIfEmpty()
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div>
      <p className="page-subtitle">Welcome back, {user?.name?.split(' ')[0]} 👋 — here's what's happening in your store.</p>

      {showSeedButton && (
        <div className="card form-card">
          <h3>Your database is empty</h3>
          <p className="page-subtitle seed-text">
            Load a few sample products, blog posts, and transactions to explore the dashboard.
          </p>
          <button className="btn btn-primary" onClick={handleSeed} disabled={seeding}>
            {seeding ? 'Loading sample data…' : 'Load Sample Data'}
          </button>
        </div>
      )}

      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-label">Products</span>
          <span className="stat-value">{products.length}</span>
          <Link to="/dashboard/products" className="stat-link">Manage products →</Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Blog Posts</span>
          <span className="stat-value">{blogs.length}</span>
          <Link to="/dashboard/blogs" className="stat-link">Manage blogs →</Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Revenue (Completed)</span>
          <span className="stat-value">₹{revenue.toLocaleString()}</span>
          <Link to="/dashboard/payments" className="stat-link">View payments →</Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Low Stock Items</span>
          <span className="stat-value">{lowStock}</span>
          <Link to="/dashboard/products" className="stat-link">Review stock →</Link>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <h3>Recent Products</h3>
          <ul className="mini-list">
            {products.slice(0, 5).map((p) => (
              <li key={p.id}>
                <span>{p.image} {p.name}</span>
                <span className="muted">₹{p.price.toLocaleString()}</span>
              </li>
            ))}
            {products.length === 0 && <li className="muted">No products yet.</li>}
          </ul>
        </div>
        <div className="card">
          <h3>Recent Transactions</h3>
          <ul className="mini-list">
            {payments.slice(0, 5).map((p) => (
              <li key={p.id}>
                <span>{p.customer}</span>
                <span className={'status-badge status-' + p.status.toLowerCase()}>{p.status}</span>
              </li>
            ))}
            {payments.length === 0 && <li className="muted">No transactions yet.</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
