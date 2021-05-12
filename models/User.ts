import mongoose from 'mongoose';

const MercadopagoSchema = new mongoose.Schema({ items: [String], payment: String });

const UserSchema = new mongoose.Schema({
  userID: String,
  username: String,
  email: String,
  emailVerified: Boolean,
  purchases: [String],
  pendingPurchases: [String],
  mercadopagoPayments: [MercadopagoSchema],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
