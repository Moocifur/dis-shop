'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, Clock, Menu, X, MapPin, ShoppingCart } from 'lucide-react'
import LogoutButton from '../LogoutButton'
import { useCart } from '../context/CartContext'

const Header = ({ isLoggedIn }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { itemCount } = useCart()

    return (
        <>
            <div className="bg-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-gray-700">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>(909)-885-0590</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>contactus@injectorsusa.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>8482 Cherry Ave, Fontana, CA 92335</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span>Mon-Fri 7AM-5PM</span>
                        </div>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <img
                                    src="/diesel-logo.png"
                                    alt="Diesel Injection Service Logo"
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Diesel Injection Service</h1>
                                <p className="text-sm text-gray-400">Excellence Since 1951</p>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/#home" className="hover:text-blue-400 transition-colors">Home</Link>
                            <Link href="/#services" className="hover:text-blue-400 transition-colors">Services</Link>
                            <Link href="/#about" className="hover:text-blue-400 transition-colors">About</Link>
                            <Link href="/#location" className="hover:text-blue-400 transition-colors">Location</Link>
                            <Link href="/#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
                            <Link href="/parts" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">Shop Parts</Link>
                            <Link href="/cart" className="relative hover:text-blue-400 transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Link>
                            {isLoggedIn ? (
                                <>
                                    <Link href="/orders" className="hover:text-blue-400 transition-colors">My Orders</Link>
                                    <LogoutButton />
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link>
                                    <Link href="/register" className="hover:text-blue-400 transition-colors">Register</Link>
                                </>
                            )}
                        </nav>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {isMenuOpen && (
                        <nav className="md:hidden py-4 border-t border-gray-700">
                            <div className="flex flex-col space-y-4">
                                <Link href="/#home" className="hover:text-blue-400 transition-colors">Home</Link>
                                <Link href="/#services" className="hover:text-blue-400 transition-colors">Services</Link>
                                <Link href="/#about" className="hover:text-blue-400 transition-colors">About</Link>
                                <Link href="/#location" className="hover:text-blue-400 transition-colors">Location</Link>
                                <Link href="/#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
                                <Link href="/parts" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors inline-block">Shop Parts</Link>
                                <Link href="/cart" className="hover:text-blue-400 transition-colors">
                                    Cart{itemCount > 0 ? ` (${itemCount})` : ''}
                                </Link>
                                {isLoggedIn ? (
                                    <>
                                        <Link href="/orders" className="hover:text-blue-400 transition-colors">My Orders</Link>
                                        <LogoutButton />
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link>
                                        <Link href="/register" className="hover:text-blue-400 transition-colors">Register</Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header
