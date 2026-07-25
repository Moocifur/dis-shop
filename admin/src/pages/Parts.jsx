import { useState, useEffect } from 'react'
import { getParts, updatePart, deletePart } from '../api/parts'
import Nav from '../components/Nav'
import AddPartForm from '../components/AddPartForm'
import { Pencil, Trash2, Check, X } from 'lucide-react'

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
            price: part.price ?? '',
            wholesalePrice: part.wholesalePrice ?? '',
            coreCharge: part.coreCharge ?? ''
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

    const cellInputClass = "w-full px-2 py-1 bg-gray-900 border border-gray-600 rounded text-white"

    return (
        <div>
            <Nav/>
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Parts</h1>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <AddPartForm onPartAdded={handlePartAdded} />
                <div className="bg-gray-800 rounded-xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700 text-sm text-gray-300">
                            <tr>
                                <th className="px-4 py-3">Part Number</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Brand</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Wholesale</th>
                                <th className="px-4 py-3">Core Charge</th>
                                <th className="px-4 py-3">Active</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {parts.map(part => (
                                <tr key={part.id} className="hover:bg-gray-700/50 transition-colors">
                                    {editingId === part.id ? (
                                        <>
                                            <td className="px-4 py-2"><input name="partNumber" value={editForm.partNumber} onChange={handleEditChange} className={cellInputClass} /></td>
                                            <td className="px-4 py-2"><input name="description" value={editForm.description} onChange={handleEditChange} className={cellInputClass} /></td>
                                            <td className="px-4 py-2"><input name="brand" value={editForm.brand} onChange={handleEditChange} className={cellInputClass} /></td>
                                            <td className="px-4 py-2"><input name="category" value={editForm.category} onChange={handleEditChange} className={cellInputClass} /></td>
                                            <td className="px-4 py-2"><input name="price" value={editForm.price} onChange={handleEditChange} className={cellInputClass} /></td>
                                            <td className="px-4 py-2"><input name="wholesalePrice" value={editForm.wholesalePrice} onChange={handleEditChange} className={cellInputClass} /></td>
                                            <td className="px-4 py-2"><input name="coreCharge" value={editForm.coreCharge} onChange={handleEditChange} className={cellInputClass} /></td>
                                            <td className="px-4 py-2">{part.active ? 'Yes' : 'No'}</td>
                                            <td className="px-4 py-2">
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEditSave(part.id)} className="text-green-400 hover:text-green-300">
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-300">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-3 text-blue-400 font-medium">{part.partNumber}</td>
                                            <td className="px-4 py-3">{part.description}</td>
                                            <td className="px-4 py-3 text-gray-400">{part.brand}</td>
                                            <td className="px-4 py-3 text-gray-400">{part.category}</td>
                                            <td className="px-4 py-3">{part.price ?? '—'}</td>
                                            <td className="px-4 py-3 text-gray-400">{part.wholesalePrice ?? '—'}</td>
                                            <td className="px-4 py-3 text-gray-400">{part.coreCharge ?? '—'}</td>
                                            <td className="px-4 py-3">{part.active ? 'Yes' : 'No'}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-3">
                                                    <button onClick={() => handleEditClick(part)} className="text-blue-400 hover:text-blue-300">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(part.id)} className="text-red-400 hover:text-red-300">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Parts
