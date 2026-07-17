import { useEffect, useState } from 'react'
import { addBlog, deleteBlog, formatDate, subscribeToBlogs } from '../lib/db'

const EMPTY_FORM = { title: '', author: '', excerpt: '' }

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToBlogs((docs) => {
      setBlogs(docs)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.excerpt.trim()) return
    setSaving(true)
    try {
      await addBlog({
        title: form.title.trim(),
        author: form.author.trim() || 'Admin',
        excerpt: form.excerpt.trim(),
      })
      setForm(EMPTY_FORM)
      setShowForm(false)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    await deleteBlog(id)
  }

  return (
    <div>
      <div className="page-header">
        <p className="page-subtitle">{blogs.length} blog posts published</p>
        <button className="btn btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : '+ Add Blog'}
        </button>
      </div>

      {showForm && (
        <form className="card form-card" onSubmit={handleSubmit}>
          <label className="field">
            <span>Title</span>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Autumn Layering Guide" required />
          </label>
          <label className="field">
            <span>Author</span>
            <input name="author" value={form.author} onChange={handleChange} placeholder="Admin" />
          </label>
          <label className="field">
            <span>Content / Excerpt</span>
            <textarea name="excerpt" rows="4" value={form.excerpt} onChange={handleChange} placeholder="Write a short summary or the full post..." required />
          </label>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Publishing…' : 'Publish Blog'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="empty-state">Loading blogs…</p>
      ) : (
        <div className="blog-list">
          {blogs.map((b) => (
            <article className="blog-card" key={b.id}>
              <div>
                <h3>{b.title}</h3>
                <p className="blog-excerpt">{b.excerpt}</p>
                <div className="blog-meta">
                  <span>By {b.author}</span>
                  <span>·</span>
                  <span>{formatDate(b.createdAt)}</span>
                </div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.id)}>Delete</button>
            </article>
          ))}
          {blogs.length === 0 && <p className="empty-state">No blog posts yet. Write your first one above.</p>}
        </div>
      )}
    </div>
  )
}
