import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getConnectionString(): string | null {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL_UNPOOLED ??
    null
  )
}

let tableReady = false

export async function POST(request: Request) {
  const connectionString = getConnectionString()
  if (!connectionString) {
    return NextResponse.json(
      { error: 'Subscriptions are not configured yet. Try again later.' },
      { status: 503 }
    )
  }

  let body: { email?: string; source?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  if (!email || email.length > 320 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const source = typeof body.source === 'string' ? body.source.slice(0, 64) : null

  try {
    const sql = neon(connectionString)

    if (!tableReady) {
      await sql`
        CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          source TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
      tableReady = true
    }

    await sql`
      INSERT INTO subscribers (email, source)
      VALUES (${email}, ${source})
      ON CONFLICT (email) DO NOTHING
    `

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
