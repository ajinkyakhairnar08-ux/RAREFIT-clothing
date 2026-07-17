import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'
import '../adminStyles.css'

const TITLES = {
  '/dashboard': 'Overview',
  '/dashboard/products': 'Products',
  '/dashboard/blogs': 'Blogs',
  '/dashboard/payments': 'Payments History',
  '/dashboard/customers': 'Customers',
  '/dashboard/account': 'My Account',
}

export default function AdminLayout() {
  const location = useLocation()
  const title = TITLES[location.pathname] ?? 'Dashboard'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="admin-scope">
      <div className="app-shell">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="app-main">
          <AdminNavbar title={title} onMenuClick={() => setSidebarOpen((v) => !v)} />
          <main className="app-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
