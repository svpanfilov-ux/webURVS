// Placeholder toast implementation
type Toast = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function toast(data: Toast) {
  console.log('[Toast]', data)
}
