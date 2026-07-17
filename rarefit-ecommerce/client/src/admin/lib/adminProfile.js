export function toAdminProfile(firebaseUser) {
  if (!firebaseUser) return null

  const name =
    firebaseUser.displayName ||
    firebaseUser.email
      .split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())

  const avatar = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name,
    role: 'Store Administrator',
    avatar: avatar || 'A',
    memberSince: firebaseUser.metadata.creationTime
      ? new Date(firebaseUser.metadata.creationTime).toISOString().slice(0, 10)
      : '',
    loginAt: firebaseUser.metadata.lastSignInTime || new Date().toISOString(),
  }
}
