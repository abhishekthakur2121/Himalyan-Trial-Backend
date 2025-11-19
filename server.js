import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://Abhi_111:Abhi111@cluster0.ulhadkb.mongodb.net/himalayan_trails';

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB', mongoose.connection.host, mongoose.connection.name);
  })
  .catch((err) => { 
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });



app.use('/api', apiRoutes);

// Basic error handler so unhandled errors return a JSON response
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
