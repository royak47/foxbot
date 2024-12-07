const Mining = require('../models/Mining');
const User = require('../models/User');

// Add mining points
const addMiningPoints = async (req, res) => {
  const { userId, minedPoints } = req.body;

  try {
    const mining = new Mining({ userId, minedPoints });
    await mining.save();

    // Update total points in User
    const user = await User.findById(userId);
    user.totalPoints += minedPoints;
    await user.save();

    res.status(201).json({ message: 'Mining points added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch mining points
const getMiningPoints = async (req, res) => {
  const { userId } = req.params;

  try {
    const dailyPoints = await Mining.find({ userId }).sort({ date: -1 });
    const user = await User.findById(userId);

    res.status(200).json({
      dailyPoints,
      totalPoints: user.totalPoints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMiningPoints, getMiningPoints };
