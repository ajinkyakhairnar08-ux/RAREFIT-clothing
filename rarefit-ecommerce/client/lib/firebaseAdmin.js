import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let app

export function getAdminDb() {
  if (!getApps().length) {
    app = process.env.FIRESTORE_EMULATOR_HOST
      // Local emulator: no real credential needed.
      ? initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || 'demo-test' })
      : initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
          }),
        })
  }
  return getFirestore(app)
}
