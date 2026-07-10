import { Link, useNavigate } from 'react-router-dom'

function Nav() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav>
            <Link to="/parts">Parts</Link>
            <Link to="/users">Users</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Nav