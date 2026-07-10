import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import { getUsers, approveWholesale, makeAdmin } from '../api/users'

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
            <h1>Users</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Wholesale</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.company ?? '—'}</td>
                            <td>{user.wholesaleStatus}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                                {user.wholesaleStatus !== 'APPROVED' && (
                                <button onClick={() => handleApproveWholesale(user.id)}>
                                    Approve Wholesale
                                </button>
                                )}
                                {!user.isAdmin && (
                                <button onClick={() => handleMakeAdmin(user.id)}>
                                    Make Admin
                                </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users