import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { username } = req.query; // Assuming the username is passed as a query parameter

  const db = await connectToDatabase();
  const usersCollection = db.collection('users'); // Collection to store user data

  if (req.method === 'GET') {
    // Fetch user mining data from MongoDB
    const user = await usersCollection.findOne({ username });

    if (user) {
      res.status(200).json({ balance: user.balance });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else if (req.method === 'POST') {
    // Update user mining data in MongoDB
    const { balance } = req.body;

    const result = await usersCollection.updateOne(
      { username },
      { $set: { balance } },
      { upsert: true } // Creates the user if they don't exist
    );

    res.status(200).json({ message: 'Mining data updated' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
