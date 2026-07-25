'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, ShoppingCart, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

const getUnitPrice = (item) => Number(item.wholesalePrice ?? item.price ?? 0)

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const subtotal = cart.reduce((sum, item) => sum + getUnitPrice(item) * item.quantity, 0)
    const coreChargeTotal = cart.reduce((sum, item) => sum + Number(item.coreCharge ?? 0) * item.quantity, 0)
    const total = subtotal + coreChargeTotal

    const handleCheckout = async () => {
        setError('')
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.map(item => ({ partId: item.partId, quantity: item.quantity }))
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Checkout failed')
            }

            clearCart()
            router.push('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (cart.length === 0) {
        return (
            <main className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <ShoppingCart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <Link href="/parts" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Browse the catalog
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold mb-10 text-center">Your Cart</h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-900 border border-red-600 rounded-lg flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-300">{error}</span>
                    </div>
                )}

                <div className="bg-gray-800 rounded-xl divide-y divide-gray-700">
                    {cart.map(item => (
                        <div key={item.partId} className="p-6 flex items-center justify-between gap-4">
                            <div>
                                <div className="text-sm text-blue-400 font-semibold">{item.partNumber}</div>
                                <div className="font-semibold">{item.description}</div>
                                {item.coreCharge && (
                                    <div className="text-xs text-gray-400">+ ${item.coreCharge} core charge each</div>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.partId, Number(e.target.value))}
                                    className="w-16 px-2 py-1 bg-gray-900 border border-gray-600 rounded-lg text-center"
                                />
                                <div className="w-20 text-right font-semibold">
                                    ${(getUnitPrice(item) * item.quantity).toFixed(2)}
                                </div>
                                <button onClick={() => removeFromCart(item.partId)} className="text-gray-400 hover:text-red-400 transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-800 rounded-xl p-6 mt-6 space-y-2">
                    <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {coreChargeTotal > 0 && (
                        <div className="flex justify-between text-gray-300">
                            <span>Core Charges</span>
                            <span>${coreChargeTotal.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-xl font-bold border-t border-gray-700 pt-2 mt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </main>
    )
}
