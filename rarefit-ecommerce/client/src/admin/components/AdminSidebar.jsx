import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: '📊', end: true },
  { to: '/dashboard/products', label: 'Products', icon: '👕' },
  { to: '/dashboard/blogs', label: 'Blogs', icon: '📝' },
  { to: '/dashboard/payments', label: 'Payments', icon: '💳' },
  { to: '/dashboard/customers', label: 'Customers', icon: '🧑‍🤝‍🧑' },
  { to: '/dashboard/leads', label: 'Leads', icon: '📥' },
  { to: '/dashboard/account', label: 'Account', icon: '👤' },
]

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={'sidebar' + (isOpen ? ' sidebar-open' : '')}>
        <div className="sidebar-logo">
          <span className="logo-rare">R</span><span className="logo-fit">F</span>
          <span className="logo-admin">Admin</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
