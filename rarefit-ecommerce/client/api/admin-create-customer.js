import { FieldValue } from 'firebase-admin/firestore'
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

  const { name, email, password } = req.body || {}
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'A valid email is required.' })
    return
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters.' })
    return
  }

  const trimmedName = (name || '').trim()
  const normalizedEmail = email.trim().toLowerCase()

  let userRecord
  try {
    userRecord = await getAdminAuth().createUser({
      email: normalizedEmail,
      password,
      displayName: trimmedName || undefined,
    })
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      res.status(409).json({ error: 'An account with this email already exists.' })
      return
    }
    console.error('[admin-create-customer] Failed to create auth user:', err)
    res.status(500).json({ error: 'Could not create the account. Please try again.' })
    return
  }

  await getAdminDb().collection('users').doc(userRecord.uid).set({
    name: trimmedName,
    email: normalizedEmail,
    photoURL: null,
    provider: 'password',
    createdAt: FieldValue.serverTimestamp(),
    lastLoginAt: null,
  })

  res.status(200).json({ ok: true, uid: userRecord.uid })
}
