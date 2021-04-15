import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  username: String,
  email: String,
  emailVerified: Boolean,
  purchases: Array,
});

export default mongoose.models.User || mongoose.model('Pet', UserSchema);
