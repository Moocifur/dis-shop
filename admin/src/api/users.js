const API_URL = 'http://localhost:3000';

function getToken() {
    return localStorage.getItem('token');
}

export async function getUsers() {
    const response = await fetch(`${API_URL}/users`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
}

export async function approveWholesale(id) {
    const response = await fetch(`${API_URL}/users/${id}/approve-wholesale`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (!response.ok) {
        throw new Error('Failed to approve wholesale');
    }

    return response.json();
}

export async function makeAdmin(id) {
    const response = await fetch(`${API_URL}/users/${id}/make-admin`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (!response.ok) {
        throw new Error('Failed to make admin');
    }

    return response.json();
}