export default async function handler(req, res) {
  const sendgrid_api_url = 'https://api.sendgrid.com/v3/marketing/contacts'

  if (req.method === 'POST') {
    try {
      await fetch(sendgrid_api_url, {
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

      res.status(200).json({ error: false, message: "Success! You've joined the newsletter!" })
    } catch (error) {
      res.status(500).json({ error: true, message: 'Sorry! There was an error that occured.' })
    }
  }
}
