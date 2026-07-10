import Link from 'next/link'

async function getParts() {
  const response = await fetch('http://localhost:3000/parts', {
    headers: { 'Authorization': `Bearer ${process.env.API_TOKEN}` },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Failed to fetch parts')
  }

  return response.json()
}

export default async function PartsPage() {
  const parts = await getParts()

  return (
    <main>
      <h1>Parts Catalog</h1>
      <ul>
        {parts.map(part => (
          <li key={part.id}>
            <Link href={`/parts/${part.id}`}>
              <strong>{part.partNumber}</strong> — {part.description} ({part.brand})
              {part.price && <span> — ${part.price}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}