import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  registryNumber: String,
  category: String,
  name: String,
  price: Number,
  description: String,
  creationDate: Date,
  primaryColor: String,
  images: Array,
  videos: Array,
  files: Array,
});

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
