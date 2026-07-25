import { useState } from 'react'
import { Plus } from 'lucide-react'
import { createPart } from '../api/parts'

function AddPartForm({ onPartAdded }) {
    const [form, setForm] = useState({
        partNumber: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        wholesalePrice: '',
        coreCharge: ''
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
            setForm({ partNumber: '', description: '', brand: '', category: '', price: '', wholesalePrice: '', coreCharge: '' })
        } catch (err) {
            setError(err.message)
        }
    }

    const inputClass = "px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white w-full"

    return (
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Add Part</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
                <input name="partNumber" placeholder="Part Number" value={form.partNumber} onChange={handleChange} required className={inputClass} />
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required className={inputClass} />
                <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required className={inputClass} />
                <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required className={inputClass} />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className={inputClass} />
                <input name="wholesalePrice" placeholder="Wholesale Price" value={form.wholesalePrice} onChange={handleChange} className={inputClass} />
                <input name="coreCharge" placeholder="Core Charge" value={form.coreCharge} onChange={handleChange} className={inputClass} />
                {error && <p className="text-red-400 text-sm md:col-span-3">{error}</p>}
                <button
                    type="submit"
                    className="md:col-span-3 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Part
                </button>
            </form>
        </div>
    )
}

export default AddPartForm
