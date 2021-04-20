import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    category: String,
    name: String,
    price: Number,
    description: String,
    creationDate: Date,
    primaryColor: String,
    images: Array,
    videos: Array,
    files: Array,
    registryNumber: String,
  },
  {
    collection: 'patterns',
  },
);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
