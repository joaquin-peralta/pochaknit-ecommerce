import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userID: String,
  username: String,
  email: String,
  emailVerified: Boolean,
  purchases: [String],
  mercadopago: [String],
  paypal: [String],
  tempPurchase: [String],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
