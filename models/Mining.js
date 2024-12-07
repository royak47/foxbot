
const mongoose = require('mongoose');

const miningSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  minedPoints: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Mining', miningSchema);
