import { create } from 'zustand'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

function toDateInputValue(value) {
  if (!value) return ''
  const jsDate = typeof value.toDate === 'function' ? value.toDate() : new Date(value)
  if (Number.isNaN(jsDate.getTime())) return ''
  return jsDate.toISOString().slice(0, 10)
}

function toDisplayDate(value) {
  if (!value) return ''
  const jsDate = typeof value.toDate === 'function' ? value.toDate() : new Date(value)
  if (Number.isNaN(jsDate.getTime())) return ''
  return jsDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function normalizeBlog(docSnap) {
  const data = docSnap.data()
  return {
    id: docSnap.id,
    title: data.title,
    author: data.author || 'Admin',
    excerpt: data.excerpt || '',
    content: data.content || data.excerpt || '',
    image: data.image || null,
    date: toDisplayDate(data.createdAt),
    dateValue: toDateInputValue(data.createdAt),
  }
}

const useBlogStore = create(() => ({
  blogs: [],
  loading: true,
}))

const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
onSnapshot(q, (snapshot) => {
  useBlogStore.setState({
    blogs: snapshot.docs.map(normalizeBlog),
    loading: false,
  })
})

export default useBlogStore
