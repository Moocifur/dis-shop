import Link from 'next/link'
import { fetchPart } from '@/lib/api'
import AddToCartButton from '../../components/AddToCartButton'

export default async function PartPage({ params }) {
    const { id } = await params
    const part = await fetchPart(id)

    return (
        <main className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link href="/parts" className="text-blue-400 hover:text-blue-300 transition-colors inline-block mb-8">
                    ← Back to catalog
                </Link>

                <div className="bg-gray-800 rounded-xl p-8">
                    <div className="text-sm text-blue-400 font-semibold mb-2">{part.partNumber}</div>
                    <h1 className="text-3xl font-bold mb-6">{part.description}</h1>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6 text-gray-300">
                        <p><span className="text-gray-400">Brand:</span> {part.brand}</p>
                        <p><span className="text-gray-400">Category:</span> {part.category}</p>
                        {part.weight && <p><span className="text-gray-400">Weight:</span> {part.weight} lbs</p>}
                        <p><span className="text-gray-400">In Stock:</span> {part.active ? 'Yes' : 'No'}</p>
                    </div>

                    <div className="border-t border-gray-700 pt-6 space-y-2 mb-6">
                        {part.price && <p className="text-2xl font-bold">${part.price}</p>}
                        {part.wholesalePrice && <p className="text-gray-400">Wholesale Price: ${part.wholesalePrice}</p>}
                        {part.coreCharge && <p className="text-gray-400">Core Charge: ${part.coreCharge}</p>}
                    </div>

                    <AddToCartButton part={part} />
                </div>
            </div>
        </main>
    )
}
