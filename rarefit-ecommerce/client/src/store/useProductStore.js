import { create } from 'zustand'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

const FALLBACK_DESCRIPTION = 'Crafted for the modern aesthetic — a RareFit essential.'

function normalizeProduct(docSnap) {
  const data = docSnap.data()
  return {
    id: docSnap.id,
    name: data.name,
    category: data.category,
    price: data.price,
    stock: data.stock,
    photo: data.photo || null,
    emoji: data.image || '👕',
    description: data.description || FALLBACK_DESCRIPTION,
  }
}

const useProductStore = create(() => ({
  products: [],
  loading: true,
}))

const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
onSnapshot(q, (snapshot) => {
  useProductStore.setState({
    products: snapshot.docs.map(normalizeProduct),
    loading: false,
  })
})

export default useProductStore
