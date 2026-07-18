import { useEffect, useMemo, useState } from 'react'
import { deleteLead, formatDate, subscribeToLeads, toggleLeadStar } from '../lib/db'

const STAR_FILTERS = ['All', 'Starred']

const SORT_OPTIONS = [
  { value: 'newest', label: 'Date: Newest First' },
  { value: 'oldest', label: 'Date: Oldest First' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'email-asc', label: 'Email: A to Z' },
  { value: 'email-desc', label: 'Email: Z to A' },
]

const SORT_COMPARATORS = {
  oldest: (a, b) => toMillis(a.createdAt) - toMillis(b.createdAt),
  'name-asc': (a, b) => (a.name || '').localeCompare(b.name || ''),
  'name-desc': (a, b) => (b.name || '').localeCompare(a.name || ''),
  'email-asc': (a, b) => (a.email || '').localeCompare(b.email || ''),
  'email-desc': (a, b) => (b.email || '').localeCompare(a.email || ''),
}

function toMillis(value) {
  if (!value) return 0
  return typeof value.toDate === 'function' ? value.toDate().getTime() : new Date(value).getTime()
}

export default function Leads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [starFilter, setStarFilter] = useState('All')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const unsubscribe = subscribeToLeads((docs) => {
      setLeads(docs)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function handleToggleStar(lead) {
    await toggleLeadStar(lead.id, !lead.starred)
  }

  async function handleDelete(lead) {
    if (!window.confirm(`Delete the lead from ${lead.name || lead.email}?`)) return
    await deleteLead(lead.id)
  }

  const visibleLeads = useMemo(() => {
    const filtered = starFilter === 'Starred' ? leads.filter((l) => l.starred) : leads
    const comparator = SORT_COMPARATORS[sortBy]
    return comparator ? [...filtered].sort(comparator) : filtered
  }, [leads, starFilter, sortBy])

  return (
    <div>
      <div className="page-header">
        <p className="page-subtitle">{leads.length} leads received</p>
      </div>

      <div className="filter-row">
        {STAR_FILTERS.map((s) => (
          <button
            key={s}
            className={'chip' + (starFilter === s ? ' chip-active' : '')}
            onClick={() => setStarFilter(s)}
          >
            {s}
          </button>
        ))}
        <label className="field date-filter-field">
          <span>Sort by</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
      </div>

      <div className="card table-card">
        {loading ? (
          <p className="empty-state">Loading leads…</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visibleLeads.map((l) => (
                <tr key={l.id}>
                  <td>
                    <button
                      className={'star-btn' + (l.starred ? ' star-btn-active' : '')}
                      onClick={() => handleToggleStar(l)}
                      title={l.starred ? 'Unstar' : 'Star this lead'}
                    >
                      {l.starred ? '★' : '☆'}
                    </button>
                  </td>
                  <td>{l.name}</td>
                  <td>{l.email}</td>
                  <td>{l.phone || '—'}</td>
                  <td><span className="tag">{l.subject || 'General'}</span></td>
                  <td className="lead-message">{l.message}</td>
                  <td>{formatDate(l.createdAt)}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(l)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && visibleLeads.length === 0 && (
          <p className="empty-state">
            {starFilter === 'Starred' ? 'No starred leads yet.' : 'No leads yet. New contact form submissions will show up here.'}
          </p>
        )}
      </div>
    </div>
  )
}
