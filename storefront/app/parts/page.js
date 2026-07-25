import Link from 'next/link'
import { fetchParts } from '@/lib/api'
import AddToCartButton from '../components/AddToCartButton'

export default async function PartsPage() {
  const parts = await fetchParts()

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">Parts Catalog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map(part => (
            <div key={part.id} className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-xl p-6 flex flex-col">
              <Link href={`/parts/${part.id}`} className="block mb-4">
                <div className="text-sm text-blue-400 font-semibold mb-1">{part.partNumber}</div>
                <div className="text-lg font-semibold mb-2">{part.description}</div>
                <div className="text-sm text-gray-400">{part.brand}</div>
              </Link>
              <div className="mt-auto flex items-center justify-between gap-4">
                <div>
                  {part.price && <div className="text-xl font-bold">${part.price}</div>}
                  {part.wholesalePrice && <div className="text-xs text-gray-400">Wholesale: ${part.wholesalePrice}</div>}
                </div>
                <AddToCartButton part={part} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
