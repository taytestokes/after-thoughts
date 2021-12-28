import firestore from '../../../../lib/firebase-admin'

export default async (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
