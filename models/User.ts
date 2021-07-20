import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  itemsIds: [String],
  paymentMethod: String,
  paymentId: String,
  status: String,
});

const UserSchema = new mongoose.Schema({
  userId: String,
  username: String,
  email: String,
  emailVerified: Boolean,
  purchases: [PurchaseSchema],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
