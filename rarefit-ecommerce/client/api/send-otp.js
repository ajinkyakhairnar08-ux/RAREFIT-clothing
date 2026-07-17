import { createHash, randomInt } from 'crypto'
import { Resend } from 'resend'
import { getAdminDb } from '../lib/firebaseAdmin.js'

const COOLDOWN_MS = 60 * 1000
const EXPIRY_MS = 10 * 60 * 1000

function hashCode(code) {
  return createHash('sha256').update(code).digest('hex')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { email } = req.body || {}
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'A valid email is required.' })
    return
  }

  const normalizedEmail = email.trim().toLowerCase()
  const db = getAdminDb()
  const ref = db.collection('otpCodes').doc(normalizedEmail)

  const existing = await ref.get()
  if (existing.exists) {
    const data = existing.data()
    if (data.lastSentAt && Date.now() - data.lastSentAt.toMillis() < COOLDOWN_MS) {
      res.status(429).json({ error: 'Please wait a moment before requesting another code.' })
      return
    }
  }

  const code = String(randomInt(0, 1000000)).padStart(6, '0')

  await ref.set({
    codeHash: hashCode(code),
    expiresAt: new Date(Date.now() + EXPIRY_MS),
    attempts: 0,
    lastSentAt: new Date(),
  })

  if (!process.env.RESEND_API_KEY) {
    // Local/dev fallback: no email service configured, log the code instead
    // of failing outright so the flow can still be exercised end to end.
    console.log(`[send-otp] RESEND_API_KEY not set. Code for ${normalizedEmail}: ${code}`)
    res.status(200).json({ ok: true, devCode: code })
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

  try {
    const { error } = await resend.emails.send({
      from,
      to: normalizedEmail,
      subject: 'Your RareFit verification code',
      html: `<p>Your verification code is:</p><h2 style="letter-spacing:4px">${code}</h2><p>This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>`,
    })

    if (error) {
      console.error('[send-otp] Resend rejected the send:', error)
      res.status(500).json({ error: 'Could not send the verification email. Please try again.' })
      return
    }
  } catch (err) {
    console.error('[send-otp] Resend error:', err)
    res.status(500).json({ error: 'Could not send the verification email. Please try again.' })
    return
  }

  res.status(200).json({ ok: true })
}
