import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { getUsers, approveWholesale, makeAdmin } from '../api/users'

const STATUS_STYLES = {
    APPROVED: 'bg-green-900 text-green-300',
    PENDING: 'bg-yellow-900 text-yellow-300',
    NONE: 'bg-gray-700 text-gray-400'
}

function Users() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getUsers()
            .then(data => setUsers(data))
            .catch(err => setError(err.message))
    }, [])

    const handleApproveWholesale = async (id) => {
        try {
            const updated = await approveWholesale(id)
            setUsers(users.map(u => u.id === id ? updated : u))
        } catch (err) {
            setError(err.message)
        }
    }

    const handleMakeAdmin = async (id) => {
        try {
            const updated = await makeAdmin(id)
            setUsers(users.map(u => u.id === id ? updated : u))
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <Nav />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Users</h1>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <div className="bg-gray-800 rounded-xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700 text-sm text-gray-300">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Company</th>
                                <th className="px-4 py-3">Wholesale</th>
                                <th className="px-4 py-3">Admin</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3 text-gray-400">{user.email}</td>
                                    <td className="px-4 py-3 text-gray-400">{user.company ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${STATUS_STYLES[user.wholesaleStatus]}`}>
                                            {user.wholesaleStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{user.isAdmin ? 'Yes' : 'No'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            {user.wholesaleStatus !== 'APPROVED' && (
                                                <button
                                                    onClick={() => handleApproveWholesale(user.id)}
                                                    className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg transition-colors"
                                                >
                                                    Approve Wholesale
                                                </button>
                                            )}
                                            {!user.isAdmin && (
                                                <button
                                                    onClick={() => handleMakeAdmin(user.id)}
                                                    className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg transition-colors"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users
