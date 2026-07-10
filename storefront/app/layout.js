import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Diesel Injection Service',
  description: 'Diesel parts and fuel injection components',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/parts"> | Parts Catalog</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}