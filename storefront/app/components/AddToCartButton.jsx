'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function AddToCartButton({ part, className = '', iconOnly = false }) {
    const { addToCart } = useCart()

    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToCart(part)
            }}
            aria-label="Add to Cart"
            className={`flex items-center justify-center gap-2 rounded-lg font-semibold transition-all active:scale-95 ${className || 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2'}`}
        >
            <ShoppingCart className="w-4 h-4" />
            {!iconOnly && <span>Add to Cart</span>}
        </button>
    )
}
