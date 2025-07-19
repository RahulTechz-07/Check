import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Route Imports
import registerRoute from './routes/register.js';
import participantRoutes from "./routes/participants.js";
import createorder from "./routes/create-order.js";
import checkEmailRoute from './routes/check-email.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Route Mounting
app.use('/register', registerRoute);       // ✅ Correct for POST /register
app.use('/participants', participantRoutes);
app.use('/create-order', createorder);
app.use('/check-email', checkEmailRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
