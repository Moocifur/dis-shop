const API_URL = 'http://localhost:3000';

function getToken() {
    return localStorage.getItem('token');
}

export async function getParts() {
    const response = await fetch(`${API_URL}/parts`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }

    return response.json();
}

export async function createPart(data) {
    const response = await fetch(`${API_URL}/parts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to create part');
    }

    return response.json();
}

export async function updatePart(id, data) {
    const response = await fetch(`${API_URL}/parts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update part');
    }

    return response.json();
}

export async function deletePart(id) {
    const response = await fetch(`${API_URL}/parts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (!response.ok) {
        throw new Error('Failed to delete part');
    }
}

