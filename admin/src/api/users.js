const API_URL = import.meta.env.VITE_API_URL;

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`, {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
}

export async function approveWholesale(id) {
    const response = await fetch(`${API_URL}/users/${id}/approve-wholesale`, {
        method: 'PUT',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to approve wholesale');
    }

    return response.json();
}

export async function makeAdmin(id) {
    const response = await fetch(`${API_URL}/users/${id}/make-admin`, {
        method: 'PUT',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to make admin');
    }

    return response.json();
}
