import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  avatar: { type: String, required: true }
});

export default mongoose.model('Testimonial', TestimonialSchema);
