import { FieldValue } from 'firebase-admin/firestore'
import { getAdminDb } from '../lib/firebaseAdmin.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, phone, subject, message } = req.body || {}
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required.' })
    return
  }

  try {
    await getAdminDb().collection('leads').add({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      subject: subject ? String(subject).trim() : '',
      message: String(message).trim(),
      starred: false,
      createdAt: FieldValue.serverTimestamp(),
    })
  } catch (err) {
    console.error('[submit-lead] Failed to save lead:', err)
    res.status(500).json({ error: 'Could not save the lead. Please try again.' })
    return
  }

  res.status(200).json({ ok: true })
}
