import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  package: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Inquiry', InquirySchema);
