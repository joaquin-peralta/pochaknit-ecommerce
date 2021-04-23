import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  product_id: String,
  preference_id: String,
  payment_system: String,
});

export default mongoose.models.Purchase ||
  mongoose.model('Purchase', PurchaseSchema);
