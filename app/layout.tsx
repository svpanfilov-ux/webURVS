import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Staff Schedule App',
  description: 'Управление штатным расписанием и графиками сотрудников',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
