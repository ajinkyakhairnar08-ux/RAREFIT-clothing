import { createHash } from 'crypto'
import { getAdminDb } from '../lib/firebaseAdmin.js'

const MAX_ATTEMPTS = 5

function hashCode(code) {
  return createHash('sha256').update(code).digest('hex')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { email, code } = req.body || {}
  if (!email || !code) {
    res.status(400).json({ error: 'Email and code are required.' })
    return
  }

  const normalizedEmail = email.trim().toLowerCase()
  const db = getAdminDb()
  const ref = db.collection('otpCodes').doc(normalizedEmail)
  const snap = await ref.get()

  if (!snap.exists) {
    res.status(400).json({ error: 'No verification code found for this email. Please request a new one.' })
    return
  }

  const data = snap.data()

  if (data.expiresAt.toMillis() < Date.now()) {
    await ref.delete()
    res.status(400).json({ error: 'This code has expired. Please request a new one.' })
    return
  }

  if (data.attempts >= MAX_ATTEMPTS) {
    await ref.delete()
    res.status(400).json({ error: 'Too many incorrect attempts. Please request a new code.' })
    return
  }

  if (hashCode(String(code)) !== data.codeHash) {
    await ref.update({ attempts: data.attempts + 1 })
    res.status(400).json({ error: 'Incorrect code. Please try again.' })
    return
  }

  await ref.delete()
  res.status(200).json({ ok: true })
}
