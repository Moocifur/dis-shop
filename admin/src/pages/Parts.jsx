import { useState, useEffect } from 'react'
import { getParts, updatePart, deletePart } from '../api/parts'
import Nav from '../components/Nav'
import AddPartForm from '../components/AddPartForm'

function Parts() {
    const [parts, setParts] = useState([])
    const [error, setError] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editForm, setEditForm] = useState({})

    useEffect(() => {
        getParts()
            .then(data => setParts(data))
            .catch(err => setError(err.message))
    }, [])

    const handlePartAdded = (newPart) => {
        setParts([...parts, newPart])
    }

    const handleEditClick = (part) => {
        setEditingId(part.id)
        setEditForm({
            partNumber: part.partNumber,
            description: part.description,
            brand: part.brand,
            category: part.category,
            price: part.price ?? ''
        })
    }

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleEditSave = async (id) => {
        try {
            const updated = await updatePart(id, editForm)
            setParts(parts.map(p => p.id === id ? updated : p))
            setEditingId(null)
        } catch (err) {
            setError(err.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deletePart(id)
            setParts(parts.filter(p => p.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <Nav/>
            <h1>Parts</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <AddPartForm onPartAdded={handlePartAdded} />
            <table>
                <thead>
                    <tr>
                        <th>Part Number</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parts.map(part => (
                        <tr key={part.id}>
                            {editingId === part.id ? (
                                <>
                                    <td><input name="partNumber" value={editForm.partNumber} onChange={handleEditChange} /></td>
                                    <td><input name="description" value={editForm.description} onChange={handleEditChange} /></td>
                                    <td><input name="brand" value={editForm.brand} onChange={handleEditChange} /></td>
                                    <td><input name="category" value={editForm.category} onChange={handleEditChange} /></td>
                                    <td><input name="price" value={editForm.price} onChange={handleEditChange} /></td>
                                    <td>{part.active ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button onClick={() => handleEditSave(part.id)}>Save</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{part.partNumber}</td>
                                    <td>{part.description}</td>
                                    <td>{part.brand}</td>
                                    <td>{part.category}</td>
                                    <td>{part.price ?? '—'}</td>
                                    <td>{part.active ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(part)}>Edit</button>
                                        <button onClick={() => handleDelete(part.id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Parts