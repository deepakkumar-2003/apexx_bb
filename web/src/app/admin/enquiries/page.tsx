import type { Metadata } from 'next'
import EnquiriesClient from './EnquiriesClient'
import { createServiceClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Enquiries — Admin' }
export const dynamic = 'force-dynamic'

export default async function EnquiriesPage() {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return <EnquiriesClient initialData={data || []} />
}
