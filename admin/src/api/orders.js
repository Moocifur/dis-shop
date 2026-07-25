const API_URL = import.meta.env.VITE_API_URL;

export async function getOrders() {
    const response = await fetch(`${API_URL}/orders`, {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    return response.json();
}

export async function updateCoreStatus(orderId, itemId, coreStatus) {
    const response = await fetch(`${API_URL}/orders/${orderId}/items/${itemId}/core-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ coreStatus })
    });

    if (!response.ok) {
        throw new Error('Failed to update core status');
    }

    return response.json();
}
