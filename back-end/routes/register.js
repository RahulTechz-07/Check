import express from 'express';
import Participant from '../models/Participant.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Participant.findOne({ email });

    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const participant = new Participant(req.body);
    await participant.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
