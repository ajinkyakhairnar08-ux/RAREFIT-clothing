import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import { toAdminProfile } from '../lib/adminProfile'

export default function AdminNavbar({ title, onMenuClick }) {
  const firebaseUser = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const user = toAdminProfile(firebaseUser)

  async function handleLogout() {
    await logout()
    navigate('/dashboard-login')
  }

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
          ☰
        </button>
        <h1 className="navbar-title">{title}</h1>
      </div>
      <div className="navbar-user">
        <div className="avatar">{user?.avatar}</div>
        <div className="navbar-user-info">
          <span className="navbar-user-name">{user?.name}</span>
          <span className="navbar-user-role">{user?.role}</span>
        </div>
        <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  )
}
