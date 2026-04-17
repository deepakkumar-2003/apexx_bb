import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    await setSession()
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
}
