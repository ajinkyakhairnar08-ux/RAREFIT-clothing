import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

export default function AdminProtectedRoute({ children }) {
  const ready = useAuthStore((state) => state.ready)
  const adminChecked = useAuthStore((state) => state.adminChecked)
  const user = useAuthStore((state) => state.user)
  const isAdmin = useAuthStore((state) => state.isAdmin)

  if (!ready || !adminChecked) return null
  if (!user || !isAdmin) return <Navigate to="/dashboard-login" replace />
  return children
}
