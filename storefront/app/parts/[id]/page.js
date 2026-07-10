import Link from 'next/link'

async function getPart(id) {
  const response = await fetch(`http://localhost:3000/parts/${id}`, {
    headers: { 'Authorization': `Bearer ${process.env.API_TOKEN}` },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Part not found')
  }

  return response.json()
}

export default async function PartPage({ params }) {
    const { id } = await params
    const part = await getPart(id)

    return (
    <main>
        <Link href="/parts">← Back to catalog</Link>
        <h1>{part.partNumber}</h1>
        <p>{part.description}</p>
        <p><strong>Brand:</strong> {part.brand}</p>
        <p><strong>Category:</strong> {part.category}</p>
        {part.price && <p><strong>Price:</strong> ${part.price}</p>}
        {part.coreCharge && <p><strong>Core Charge:</strong> ${part.coreCharge}</p>}
        {part.weight && <p><strong>Weight:</strong> {part.weight} lbs</p>}
        <p><strong>In Stock:</strong> {part.active ? 'Yes' : 'No'}</p>
    </main>
    )
}