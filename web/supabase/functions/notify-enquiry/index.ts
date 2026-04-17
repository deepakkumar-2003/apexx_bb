import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'deepakkumar.aadhi@gmail.com'

serve(async (req) => {
  try {
    const payload = await req.json()
    const record = payload.record

    const body = `
New enquiry received at Apexx Fitness Studio

Name:    ${record.name}
Phone:   ${record.phone}
Email:   ${record.email || 'Not provided'}
Package: ${record.package || 'Not specified'}
Message: ${record.message || 'No message'}
Time:    ${new Date(record.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

---
Apexx Fitness Studio
5/433, Sivasakthi Nagar, Erode Road, Mettukadai, Perundurai, Erode - 638107
+91 98941 22627
    `.trim()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Apexx Fitness Studio <noreply@yourdomain.com>',
        to: [ADMIN_EMAIL],
        subject: `New Enquiry — Apexx Fitness Studio (${record.name})`,
        text: body,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend error:', error)
      return new Response(JSON.stringify({ error }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})
