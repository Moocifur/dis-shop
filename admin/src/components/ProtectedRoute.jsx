import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getMe } from '../api/auth'

function ProtectedRoute({ children }) {
    const [status, setStatus] = useState('checking')

    useEffect(() => {
        getMe()
            .then(() => setStatus('authenticated'))
            .catch(() => setStatus('unauthenticated'))
    }, [])

    if (status === 'checking') {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading...
            </div>
        )
    }
    if (status === 'unauthenticated') return <Navigate to="/login" />

    return children
}

export default ProtectedRoute
