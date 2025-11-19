import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  shortDesc: { type: String, required: true },
  popular: { type: Boolean, default: false }
});

export default mongoose.model('Package', PackageSchema);
