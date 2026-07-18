import { getAdminAuth, getAdminDb } from './firebaseAdmin.js'

/**
 * Verifies the request's Authorization: Bearer <idToken> header belongs to
 * a signed-in Firebase user listed in the admins/{uid} Firestore collection.
 * Throws an Error with a `status` property (401/403) on failure.
 */
export async function requireAdmin(req) {
  const header = req.headers.authorization || ''
  const idToken = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!idToken) {
    const err = new Error('Missing authorization token.')
    err.status = 401
    throw err
  }

  let decoded
  try {
    decoded = await getAdminAuth().verifyIdToken(idToken)
  } catch {
    const err = new Error('Invalid or expired session.')
    err.status = 401
    throw err
  }

  const adminDoc = await getAdminDb().collection('admins').doc(decoded.uid).get()
  if (!adminDoc.exists) {
    const err = new Error('This account is not authorized to perform admin actions.')
    err.status = 403
    throw err
  }

  return decoded.uid
}
