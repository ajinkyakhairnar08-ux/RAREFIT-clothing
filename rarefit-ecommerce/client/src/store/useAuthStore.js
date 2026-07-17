import { create } from 'zustand'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const ERROR_MESSAGES = {
  'auth/invalid-email': 'That email address looks invalid.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'Invalid email or password.',
  'auth/wrong-password': 'Invalid email or password.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in instead.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
}

function friendlyError(err) {
  return ERROR_MESSAGES[err.code] || 'Something went wrong. Please try again.'
}

async function upsertUserProfile(firebaseUser, provider) {
  const ref = doc(db, 'users', firebaseUser.uid)
  const snap = await getDoc(ref)

  const payload = {
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    photoURL: firebaseUser.photoURL || null,
    provider,
    lastLoginAt: serverTimestamp(),
  }
  if (!snap.exists()) {
    payload.createdAt = serverTimestamp()
  }

  await setDoc(ref, payload, { merge: true })
}

const useAuthStore = create((set) => ({
  user: null,
  ready: false,
  isAdmin: false,
  adminChecked: false,

  async signInWithGoogle() {
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider())
      await upsertUserProfile(credential.user, 'google')
      return { ok: true }
    } catch (err) {
      return { ok: false, error: friendlyError(err) }
    }
  },

  async registerWithEmail(name, email, password) {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
      await updateProfile(credential.user, { displayName: name.trim() })
      await upsertUserProfile({ ...credential.user, displayName: name.trim() }, 'password')
      return { ok: true }
    } catch (err) {
      return { ok: false, error: friendlyError(err) }
    }
  },

  async loginWithEmail(email, password) {
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
      await upsertUserProfile(credential.user, 'password')
      return { ok: true }
    } catch (err) {
      return { ok: false, error: friendlyError(err) }
    }
  },

  // Admin dashboard login: signs in without writing a storefront customer
  // profile, since the store owner isn't a customer.
  async loginAdmin(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: friendlyError(err) }
    }
  },

  async logout() {
    await signOut(auth)
  },

  // Signup email verification: request a 6-digit code be emailed to the
  // given address (server-side, see api/send-otp.js).
  async sendSignupOtp(email) {
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return { ok: false, error: data.error || 'Could not send verification code.' }
      return { ok: true, devCode: data.devCode }
    } catch {
      return { ok: false, error: 'Network error. Please try again.' }
    }
  },

  // Confirms the code entered matches what was emailed (see api/verify-otp.js).
  async verifySignupOtp(email, code) {
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return { ok: false, error: data.error || 'Invalid code.' }
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error. Please try again.' }
    }
  },
}))

onAuthStateChanged(auth, async (firebaseUser) => {
  useAuthStore.setState({ user: firebaseUser, ready: true, adminChecked: false })

  if (!firebaseUser) {
    useAuthStore.setState({ isAdmin: false, adminChecked: true })
    return
  }

  try {
    const adminSnap = await getDoc(doc(db, 'admins', firebaseUser.uid))
    useAuthStore.setState({ isAdmin: adminSnap.exists(), adminChecked: true })
  } catch {
    useAuthStore.setState({ isAdmin: false, adminChecked: true })
  }
})

export default useAuthStore
