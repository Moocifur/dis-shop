const API_URL = import.meta.env.VITE_API_URL;

export async function getParts() {
    const response = await fetch(`${API_URL}/parts`, {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }

    return response.json();
}

export async function createPart(data) {
    const response = await fetch(`${API_URL}/parts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to delete part');
    }
}
