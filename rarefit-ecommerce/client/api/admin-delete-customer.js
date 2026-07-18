import { getAdminAuth, getAdminDb } from '../lib/firebaseAdmin.js'
import { requireAdmin } from '../lib/verifyAdmin.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    await requireAdmin(req)
  } catch (err) {
    res.status(err.status || 401).json({ error: err.message })
    return
  }

  const { uid } = req.body || {}
  if (!uid || typeof uid !== 'string') {
    res.status(400).json({ error: 'A customer uid is required.' })
    return
  }

  try {
    await getAdminAuth().deleteUser(uid)
  } catch (err) {
    if (err.code !== 'auth/user-not-found') {
      console.error('[admin-delete-customer] Failed to delete auth user:', err)
      res.status(500).json({ error: 'Could not delete the account. Please try again.' })
      return
    }
  }

  await getAdminDb().collection('users').doc(uid).delete()

  res.status(200).json({ ok: true })
}
