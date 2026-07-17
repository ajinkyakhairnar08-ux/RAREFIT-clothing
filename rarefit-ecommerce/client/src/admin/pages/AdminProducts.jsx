import { useEffect, useState } from 'react'
import { addProduct, deleteProduct, subscribeToProducts } from '../lib/db'
import { resizeImageFile } from '../lib/imageResize'

const EMOJI_CHOICES = ['👕', '👖', '🧥', '👗', '👟', '🧢', '🩳', '🧦']
const CATEGORIES = ['T-Shirts', 'Jackets', 'Trousers', 'Dresses', 'Footwear', 'Accessories']
const MAX_IMAGE_BYTES = 8 * 1024 * 1024

const EMPTY_FORM = { name: '', category: CATEGORIES[0], price: '', stock: '', image: EMOJI_CHOICES[0], photo: null, description: '' }

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [imageError, setImageError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToProducts((docs) => {
      setProducts(docs)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handlePhotoChange(e) {
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
      setForm((f) => ({ ...f, photo: dataUrl }))
    } catch {
      setImageError('Could not process that image. Try a different file.')
    }
  }

  function removePhoto() {
    setForm((f) => ({ ...f, photo: null }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.price || !form.stock) return
    setSaving(true)
    try {
      await addProduct({
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        image: form.image,
        photo: form.photo,
        description: form.description.trim(),
      })
      setForm(EMPTY_FORM)
      setImageError('')
      setShowForm(false)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    await deleteProduct(id)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <p className="page-subtitle">{products.length} products in catalog</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Product Name</span>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Linen Shirt" required />
            </label>
            <label className="field">
              <span>Category</span>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Price (₹)</span>
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange} placeholder="999" required />
            </label>
            <label className="field">
              <span>Stock Quantity</span>
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="50" required />
            </label>
            <label className="field">
              <span>Fallback Icon</span>
              <select name="image" value={form.image} onChange={handleChange}>
                {EMOJI_CHOICES.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </label>
          </div>

          <label className="field">
            <span>Description (optional, shown on the storefront)</span>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Crafted for the modern aesthetic..."
            />
          </label>

          <div className="field">
            <span>Product Image</span>
            <div className="photo-upload">
              <div className="photo-preview">
                {form.photo ? (
                  <img src={form.photo} alt="Product preview" />
                ) : (
                  <span className="product-emoji">{form.image}</span>
                )}
              </div>
              <div className="photo-upload-actions">
                <label className="btn btn-ghost btn-sm photo-upload-btn">
                  Upload Image
                  <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
                </label>
                {form.photo && (
                  <button type="button" className="btn btn-danger btn-sm" onClick={removePhoto}>
                    Remove
                  </button>
                )}
              </div>
              {imageError && <span className="field-error">{imageError}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save Product'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="empty-state">Loading products…</p>
      ) : (
        <div className="grid-cards">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              {p.photo ? (
                <img className="product-photo" src={p.photo} alt={p.name} />
              ) : (
                <div className="product-emoji">{p.image}</div>
              )}
              <div className="product-body">
                <h3>{p.name}</h3>
                <span className="tag">{p.category}</span>
                <div className="product-meta">
                  <span>₹{p.price.toLocaleString()}</span>
                  <span className={p.stock < 20 ? 'stock low' : 'stock'}>{p.stock} in stock</span>
                </div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          ))}
          {products.length === 0 && <p className="empty-state">No products yet. Add your first one above.</p>}
        </div>
      )}
    </div>
  )
}
