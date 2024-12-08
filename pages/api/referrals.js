import { connectToDatabase } from '@/utils/mongodb';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const { userId } = req.query;
      const { db } = await connectToDatabase();

      // Fetch referral count from the database
      const user = await db.collection('users').findOne({ userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ count: user.referrals || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching referral count' });
    }
  }

  if (method === 'POST') {
    try {
      const { referrerId } = req.body;
      const { db } = await connectToDatabase();

      // Increment the referral count for the referrer
      await db.collection('users').updateOne(
        { userId: referrerId },
        { $inc: { referrals: 1 } },
        { upsert: true }
      );

      res.status(200).json({ message: 'Referral count updated' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating referral count' });
    }
  }
}
