import express from 'express';
import Participant from '../models/Participant.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Participant.findOne({ email });

    if (existing) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }

  } catch (err) {
    console.error("Email check error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
