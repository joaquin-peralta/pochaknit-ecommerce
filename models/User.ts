import mongoose from 'mongoose';

const PendingPurchaseSchema = new mongoose.Schema({ preference: String, payment: String });

const UserSchema = new mongoose.Schema({
  userID: String,
  username: String,
  email: String,
  emailVerified: Boolean,
  purchases: [String],
  mercadopagoPayments: [String],
  mercadopagoPending: [PendingPurchaseSchema],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
