import useAuthStore from '../../store/useAuthStore'
import { toAdminProfile } from '../lib/adminProfile'

export default function AdminAccount() {
  const user = toAdminProfile(useAuthStore((state) => state.user))

  if (!user) return null

  const loginTime = new Date(user.loginAt).toLocaleString()

  return (
    <div className="account-page">
      <div className="card account-card">
        <div className="avatar avatar-lg">{user.avatar}</div>
        <h2>{user.name}</h2>
        <span className="tag">{user.role}</span>

        <dl className="account-details">
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{user.role}</dd>
          </div>
          <div>
            <dt>Member Since</dt>
            <dd>{user.memberSince}</dd>
          </div>
          <div>
            <dt>Current Session Started</dt>
            <dd>{loginTime}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd><span className="status-badge status-completed">Logged In</span></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
