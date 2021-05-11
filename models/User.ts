import mongoose from 'mongoose';

const pendingPurchaseSchema = new mongoose.Schema({ purchase: [String], payment: String });

const UserSchema = new mongoose.Schema({
  userID: String,
  username: String,
  email: String,
  emailVerified: Boolean,
  purchases: [String],
  mercadopago: [String],
  paypal: [String],
  tempPurchase: [String],
  pendingPurchases: [pendingPurchaseSchema],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
