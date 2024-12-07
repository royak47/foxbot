import connectDB from '../../../lib/dbConnect';
import Mining from '../../../models/Mining';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      await connectDB();
      const dailyPoints = await Mining.find({ userId }).sort({ date: -1 });
      res.status(200).json(dailyPoints);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
