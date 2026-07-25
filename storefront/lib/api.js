import { cookies } from 'next/headers'

async function getAuthToken() {
    const cookieStore = await cookies()
    return cookieStore.get('token')?.value
}

export async function fetchParts() {
    const token = await getAuthToken()

    const response = await fetch(`${process.env.API_URL}/parts`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error('Failed to fetch parts')
    }

    return response.json()
}

export async function fetchPart(id) {
    const token = await getAuthToken()

    const response = await fetch(`${process.env.API_URL}/parts/${id}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error('Part not found')
    }

    return response.json()
}

export async function fetchMyOrders() {
    const token = await getAuthToken()

    const response = await fetch(`${process.env.API_URL}/orders/mine`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        cache: 'no-store'
    })

    if (!response.ok) {
        throw new Error('Failed to fetch orders')
    }

    return response.json()
}
