const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user details
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update mined tokens and balance
router.post('/mine', async (req, res) => {
  const { username, minedTokens } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.balance += minedTokens;
    user.minedTokens += minedTokens;
    await user.save();

    res.json({ message: 'Mining data updated', balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update referral count
router.post('/refer', async (req, res) => {
  const { referrerCode, referredUsername } = req.body;

  try {
    const referrer = await User.findOne({ referralCode: referrerCode });
    if (!referrer) return res.status(404).json({ error: 'Referrer not found' });

    referrer.referrals += 1;
    await referrer.save();

    const referredUser = await User.findOneAndUpdate(
      { username: referredUsername },
      { referredBy: referrerCode },
      { new: true, upsert: true } // Create the user if not exists
    );

    res.json({ message: 'Referral updated', referredUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
