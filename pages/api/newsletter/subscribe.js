export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const result = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      body: JSON.stringify({
        contacts: [{ email: req.body.email }],
        list_ids: [process.env.SENDGRID_NEWSLETTER_LIST_ID],
      }),
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()

    if (!result.ok) {
      return res.status(500).json({ error: true, message: data.errors[0].message })
    }

    return res
      .status(200)
      .json({ error: false, message: 'Added to the newsletter! Thanks for subscribing!' })
  }
}
