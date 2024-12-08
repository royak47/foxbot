const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  photoUrl: { type: String, default: '/userimage.png' },
  balance: { type: Number, default: 0 },
  minedTokens: { type: Number, default: 0 },
  referrals: { type: Number, default: 0 },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null }, // Referral code of the user who referred this one
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
