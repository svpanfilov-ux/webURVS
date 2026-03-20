// MOCK AUTH — временная заглушка, без реального логина
// Роль хранится в sessionStorage под ключом 'mock_role'
// Значения: 'admin' | 'manager'

export type MockRole = 'admin' | 'manager'

export function getMockRole(): MockRole | null {
  if (typeof window === 'undefined') return null
  return (sessionStorage.getItem('mock_role') as MockRole) || null
}

export function setMockRole(role: MockRole): void {
  sessionStorage.setItem('mock_role', role)
}

export function clearMockRole(): void {
  sessionStorage.removeItem('mock_role')
}
