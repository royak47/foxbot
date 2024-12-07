import mongoose from 'mongoose';

const miningSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  minedPoints: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Mining || mongoose.model('Mining', miningSchema);
