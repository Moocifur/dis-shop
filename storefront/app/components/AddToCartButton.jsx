'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function AddToCartButton({ part, className }) {
    const { addToCart } = useCart()

    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToCart(part)
            }}
            className={className ?? 'bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2'}
        >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
        </button>
    )
}
