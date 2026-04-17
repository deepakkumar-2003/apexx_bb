import type { Metadata } from 'next'
import PackagesClient from './PackagesClient'
import { createServiceClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Packages — Admin' }
export const dynamic = 'force-dynamic'

export default async function AdminPackagesPage() {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('packages')
    .select('*')
    .order('price', { ascending: true })

  return <PackagesClient initialData={data || []} />
}
