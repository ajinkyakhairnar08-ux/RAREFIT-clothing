import { useEffect, useMemo, useState } from 'react'
import { addBlog, deleteBlog, formatDate, subscribeToBlogs, updateBlog } from '../lib/db'
import { resizeImageFile } from '../lib/imageResize'

const MAX_IMAGE_BYTES = 8 * 1024 * 1024
const EMPTY_FORM = { title: '', author: '', excerpt: '', content: '', image: null }

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [imageError, setImageError] = useState('')
  const [saving, setSaving] = useState(false)
  const [filterDate, setFilterDate] = useState('')

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

  async function handleImageChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setImageError('Please choose an image file.')
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError('Image is too large (max 8MB).')
      return
    }
    setImageError('')
    try {
      const dataUrl = await resizeImageFile(file)
      setForm((f) => ({ ...f, image: dataUrl }))
    } catch {
      setImageError('Could not process that image. Try a different file.')
    }
  }

  function removeImage() {
    setForm((f) => ({ ...f, image: null }))
  }

  function startAdd() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImageError('')
    setShowForm(true)
  }

  function startEdit(blog) {
    setEditingId(blog.id)
    setForm({
      title: blog.title || '',
      author: blog.author || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      image: blog.image || null,
    })
    setImageError('')
    setShowForm(true)
  }

  function cancelForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImageError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.excerpt.trim()) return
    setSaving(true)
    try {
      const payload = {
        title: form.title.trim(),
        author: form.author.trim() || 'Admin',
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        image: form.image,
      }
      if (editingId) {
        await updateBlog(editingId, payload)
      } else {
        await addBlog(payload)
      }
      cancelForm()
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (editingId === id) cancelForm()
    await deleteBlog(id)
  }

  const filteredBlogs = useMemo(() => {
    if (!filterDate) return blogs
    return blogs.filter((b) => formatDate(b.createdAt) === filterDate)
  }, [blogs, filterDate])

  return (
    <div>
      <div className="page-header">
        <p className="page-subtitle">{blogs.length} blog posts published</p>
        <button className="btn btn-primary" onClick={() => (showForm ? cancelForm() : startAdd())}>
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
            <span>Excerpt</span>
            <textarea name="excerpt" rows="3" value={form.excerpt} onChange={handleChange} placeholder="Short summary shown on the blog listing..." required />
          </label>
          <label className="field">
            <span>Full Content (optional, shown on the blog page)</span>
            <textarea name="content" rows="8" value={form.content} onChange={handleChange} placeholder="Write the full article here..." />
          </label>

          <div className="field">
            <span>Cover Image</span>
            <div className="photo-upload">
              <div className="photo-preview">
                {form.image ? (
                  <img src={form.image} alt="Blog cover preview" />
                ) : (
                  <span className="product-emoji">📝</span>
                )}
              </div>
              <div className="photo-upload-actions">
                <label className="btn btn-ghost btn-sm photo-upload-btn">
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                </label>
                {form.image && (
                  <button type="button" className="btn btn-danger btn-sm" onClick={removeImage}>
                    Remove
                  </button>
                )}
              </div>
              {imageError && <span className="field-error">{imageError}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : editingId ? 'Update Blog' : 'Publish Blog'}
          </button>
        </form>
      )}

      <div className="filter-row">
        <label className="field date-filter-field">
          <span>Filter by date</span>
          <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
        </label>
        {filterDate && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFilterDate('')}>
            Clear filter
          </button>
        )}
      </div>

      {loading ? (
        <p className="empty-state">Loading blogs…</p>
      ) : (
        <div className="blog-list">
          {filteredBlogs.map((b) => (
            <article className="blog-card" key={b.id}>
              {b.image && (
                <div className="photo-preview blog-card-thumb">
                  <img src={b.image} alt={b.title} />
                </div>
              )}
              <div className="blog-card-body">
                <h3>{b.title}</h3>
                <p className="blog-excerpt">{b.excerpt}</p>
                <div className="blog-meta">
                  <span>By {b.author}</span>
                  <span>·</span>
                  <span>{formatDate(b.createdAt)}</span>
                </div>
              </div>
              <div className="blog-card-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => startEdit(b)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.id)}>Delete</button>
              </div>
            </article>
          ))}
          {filteredBlogs.length === 0 && (
            <p className="empty-state">
              {filterDate ? 'No blog posts published on that date.' : 'No blog posts yet. Write your first one above.'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
