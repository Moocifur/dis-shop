'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('cart')
        if (stored) {
            setCart(JSON.parse(stored))
        }
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart, isLoaded])

    const addToCart = (part, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.partId === part.id)
            if (existing) {
                return prev.map(item =>
                    item.partId === part.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prev, {
                partId: part.id,
                partNumber: part.partNumber,
                description: part.description,
                price: part.price,
                wholesalePrice: part.wholesalePrice,
                coreCharge: part.coreCharge,
                quantity
            }]
        })
    }

    const removeFromCart = (partId) => {
        setCart(prev => prev.filter(item => item.partId !== partId))
    }

    const updateQuantity = (partId, quantity) => {
        if (quantity < 1) return
        setCart(prev => prev.map(item =>
            item.partId === partId ? { ...item, quantity } : item
        ))
    }

    const clearCart = () => setCart([])

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, itemCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
