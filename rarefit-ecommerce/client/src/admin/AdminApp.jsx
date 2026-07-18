import { Routes, Route } from 'react-router-dom'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import AdminLayout from './components/AdminLayout'
import AdminLogin from './pages/AdminLogin'
import AdminOverview from './pages/AdminOverview'
import AdminProducts from './pages/AdminProducts'
import AdminBlogs from './pages/AdminBlogs'
import AdminPayments from './pages/AdminPayments'
import AdminCustomers from './pages/AdminCustomers'
import AdminLeads from './pages/AdminLeads'
import AdminAccount from './pages/AdminAccount'

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/dashboard-login" element={<AdminLogin />} />
      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<AdminOverview />} />
        <Route path="/dashboard/products" element={<AdminProducts />} />
        <Route path="/dashboard/blogs" element={<AdminBlogs />} />
        <Route path="/dashboard/payments" element={<AdminPayments />} />
        <Route path="/dashboard/customers" element={<AdminCustomers />} />
        <Route path="/dashboard/leads" element={<AdminLeads />} />
        <Route path="/dashboard/account" element={<AdminAccount />} />
      </Route>
    </Routes>
  )
}
