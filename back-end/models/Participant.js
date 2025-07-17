import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  food: { type: String, required: true },
  events: {
    section1: { type: String },
    section2: { type: String },
    section3: { type: String },
    section4: { type: String }
  },
  registeredAt: { type: Date, default: Date.now }
});

export default mongoose.model("Participant", participantSchema);
