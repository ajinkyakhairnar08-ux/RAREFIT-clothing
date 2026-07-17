import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../../firebase'

const PRODUCTS = 'products'
const BLOGS = 'blogs'
const PAYMENTS = 'payments'
const USERS = 'users'

function toDoc(snap) {
  return { id: snap.id, ...snap.data() }
}

/** Formats a Firestore Timestamp (or ISO string, for seeded data) as YYYY-MM-DD. */
export function formatDate(value) {
  if (!value) return ''
  const jsDate = typeof value.toDate === 'function' ? value.toDate() : new Date(value)
  return jsDate.toISOString().slice(0, 10)
}

function subscribe(collectionName, onChange) {
  const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    onChange(snapshot.docs.map(toDoc))
  })
}

// ---------- Products ----------
export function subscribeToProducts(onChange) {
  return subscribe(PRODUCTS, onChange)
}

export async function addProduct(product) {
  await addDoc(collection(db, PRODUCTS), { ...product, createdAt: serverTimestamp() })
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, PRODUCTS, id))
}

// ---------- Blogs ----------
export function subscribeToBlogs(onChange) {
  return subscribe(BLOGS, onChange)
}

export async function addBlog(blog) {
  await addDoc(collection(db, BLOGS), { ...blog, createdAt: serverTimestamp() })
}

export async function deleteBlog(id) {
  await deleteDoc(doc(db, BLOGS, id))
}

// ---------- Payments ----------
// Written by the storefront checkout flow (or seeded here for demo purposes).
// The dashboard only reads/monitors this collection.
export function subscribeToPayments(onChange) {
  return subscribe(PAYMENTS, onChange)
}

export async function addPayment(payment) {
  await addDoc(collection(db, PAYMENTS), { ...payment, createdAt: serverTimestamp() })
}

// ---------- Storefront customers ----------
// Written by the storefront itself on register/login. The dashboard only
// reads/monitors this collection.
export function subscribeToUsers(onChange) {
  return subscribe(USERS, onChange)
}

// ---------- One-time sample data seed ----------
const SEED_PRODUCTS = [
  { name: 'Classic Denim Jacket', category: 'Jackets', price: 2499, stock: 34, image: '🧥', photo: null },
  { name: 'Oversized Cotton Tee', category: 'T-Shirts', price: 599, stock: 120, image: '👕', photo: null },
  { name: 'Slim Fit Chinos', category: 'Trousers', price: 1299, stock: 58, image: '👖', photo: null },
  { name: 'Summer Floral Dress', category: 'Dresses', price: 1799, stock: 22, image: '👗', photo: null },
  { name: 'Running Sneakers', category: 'Footwear', price: 3299, stock: 15, image: '👟', photo: null },
]

const SEED_BLOGS = [
  { title: '5 Ways to Style a Denim Jacket This Season', author: 'Admin', excerpt: 'Denim jackets are back in a big way — here is how to wear yours for every occasion.' },
  { title: 'Summer 2026 Trend Report', author: 'Admin', excerpt: 'Breezy fabrics, bold prints, and pastel tones are dominating racks this summer.' },
  { title: 'Sustainable Fashion: What We Are Doing Differently', author: 'Admin', excerpt: 'A look at our new sourcing practices and the fabrics we are moving toward.' },
]

const SEED_PAYMENTS = [
  { customer: 'Riya Sharma', product: 'Classic Denim Jacket', amount: 2499, status: 'Completed', date: '2026-07-15', method: 'UPI' },
  { customer: 'Karan Mehta', product: 'Running Sneakers', amount: 3299, status: 'Completed', date: '2026-07-14', method: 'Card' },
  { customer: 'Priya Nair', product: 'Oversized Cotton Tee', amount: 599, status: 'Pending', date: '2026-07-14', method: 'UPI' },
  { customer: 'Amit Kumar', product: 'Slim Fit Chinos', amount: 1299, status: 'Completed', date: '2026-07-12', method: 'Card' },
  { customer: 'Sneha Rao', product: 'Summer Floral Dress', amount: 1799, status: 'Failed', date: '2026-07-11', method: 'Netbanking' },
  { customer: 'Vikram Singh', product: 'Classic Denim Jacket', amount: 2499, status: 'Refunded', date: '2026-07-08', method: 'Card' },
  { customer: 'Ananya Iyer', product: 'Running Sneakers', amount: 3299, status: 'Completed', date: '2026-07-06', method: 'UPI' },
]

/** Returns true if sample data was inserted (i.e. the store was empty). */
export async function seedSampleDataIfEmpty() {
  const existing = await getDocs(collection(db, PRODUCTS))
  if (!existing.empty) return false

  for (const product of SEED_PRODUCTS) await addProduct(product)
  for (const blog of SEED_BLOGS) await addBlog(blog)
  for (const payment of SEED_PAYMENTS) await addPayment(payment)
  return true
}
