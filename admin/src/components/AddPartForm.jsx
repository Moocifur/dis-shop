import { useState } from 'react'
import { createPart } from '../api/parts'

function AddPartForm({ onPartAdded }) {
    const [form, setForm] = useState({
        partNumber: '',
        description: '',
        brand: '',
        category: '',
        price: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const newPart = await createPart(form)
            onPartAdded(newPart)
            setForm({ partNumber: '', description: '', brand: '', category: '', price: '' })
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h2>Add Part</h2>
            <form onSubmit={handleSubmit}>
                <input name="partNumber" placeholder="Part Number" value={form.partNumber} onChange={handleChange} required />
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Add Part</button>
            </form>
        </div>
    )
}

export default AddPartForm