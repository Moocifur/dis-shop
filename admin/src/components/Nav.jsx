import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Package, Users as UsersIcon, ClipboardList } from 'lucide-react'
import { logout } from '../api/auth'

function Nav() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <span className="font-bold text-lg">DIS Admin</span>
                <Link to="/parts" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <Package className="w-4 h-4" />
                    Parts
                </Link>
                <Link to="/users" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <UsersIcon className="w-4 h-4" />
                    Users
                </Link>
                <Link to="/orders" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <ClipboardList className="w-4 h-4" />
                    Orders
                </Link>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
            </button>
        </nav>
    )
}

export default Nav
