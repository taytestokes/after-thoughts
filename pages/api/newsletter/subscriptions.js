export default async function handler(req, res) {
  const sendgrid_api_url = 'https://api.sendgrid.com/v3/marketing/contacts/count'

  if (req.method === 'GET') {
    try {
      const result = await fetch(sendgrid_api_url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
      })

      const data = await result?.json()

      return res.status(200).json({ subscriber_count: data?.contact_count })
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: 'Sorry! There was an error that occured.' })
    }
  }
}
