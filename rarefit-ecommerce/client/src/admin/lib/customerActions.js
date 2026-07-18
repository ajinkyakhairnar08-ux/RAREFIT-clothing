import { auth } from '../../firebase'

async function authedPost(url, body) {
  const idToken = await auth.currentUser.getIdToken()
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.')
  }
  return data
}

export function deleteCustomer(uid) {
  return authedPost('/api/admin-delete-customer', { uid })
}

export function resetCustomerPassword(uid, newPassword) {
  return authedPost('/api/admin-reset-customer-password', { uid, newPassword })
}
