import connectDB from '../../../lib/dbConnect';
import Mining from '../../../models/Mining';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, minedPoints } = req.body;

    try {
      await connectDB();
      const newMining = new Mining({ userId, minedPoints });
      await newMining.save();
      res.status(201).json({ message: 'Mining points added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving mining points', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
