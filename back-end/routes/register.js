import express from 'express';
import Participant from '../models/Participant.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // for .env access
const router = express.Router();

// Nodemailer setup (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,       // your Gmail address
    pass: process.env.GMAIL_PASS        // your Gmail App Password
  }
});

router.post('/', async (req, res) => {  // ✅ updated from '/register' to '/'
  const { name, email, college, phone, food, events } = req.body;

  try {
    const existing = await Participant.findOne({ email });

    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const participant = new Participant(req.body);
    await participant.save();

    // Count total cost
    const selectedEvents = Object.values(events || {}).filter(Boolean);
    const techEvents = selectedEvents.filter(ev => ev.toLowerCase().includes("tech")).length;
    const amountPaid = techEvents >= 2 ? 200 : 100;

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Symposium Registration Confirmation',
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for registering for our IT Symposium!</p>
        <p><strong>College:</strong> ${college}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Events Selected:</strong> ${selectedEvents.join(", ") || "None"}</p>
        <p><strong>Food Required:</strong> ${food}</p>
        <p><strong>Total Paid:</strong> ₹${amountPaid}</p>
        <hr/>
        <p>We look forward to seeing you!</p>
        <p>Regards,<br/>IT Department Symposium Team</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Registration successful and email sent' });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
