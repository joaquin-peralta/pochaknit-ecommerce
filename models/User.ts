import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  sub: String,
  username: String,
  email: String,
  emailVerified: Boolean,
  purchases: [String],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
