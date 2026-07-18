import { getAdminAuth } from '../lib/firebaseAdmin.js'
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

  const { uid, newPassword } = req.body || {}
  if (!uid || typeof uid !== 'string') {
    res.status(400).json({ error: 'A customer uid is required.' })
    return
  }
  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    res.status(400).json({ error: 'New password must be at least 6 characters.' })
    return
  }

  try {
    await getAdminAuth().updateUser(uid, { password: newPassword })
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      res.status(404).json({ error: 'This customer account no longer exists.' })
      return
    }
    console.error('[admin-reset-customer-password] Failed to update password:', err)
    res.status(500).json({ error: 'Could not update the password. Please try again.' })
    return
  }

  res.status(200).json({ ok: true })
}
