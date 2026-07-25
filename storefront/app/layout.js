import { cookies } from 'next/headers'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'

export const metadata = {
  title: 'Diesel Injection Service',
  description: 'Diesel parts and fuel injection components',
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('token')?.value

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <CartProvider>
          <Header isLoggedIn={isLoggedIn} />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
