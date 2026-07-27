import { cookies } from 'next/headers'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import { fetchMe } from '@/lib/api'

export const metadata = {
  title: 'Diesel Injection Service',
  description: 'Diesel parts and fuel injection components',
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const hasToken = !!cookieStore.get('token')?.value

  let user = null
  if (hasToken) {
    try {
      user = await fetchMe()
    } catch {
      user = null
    }
  }

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <CartProvider>
          <Header user={user} />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
