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

router.post('/', async (req, res) => {
  const { name, email, college, phone, food, events } = req.body;

  try {
    const existing = await Participant.findOne({ email });

    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const participant = new Participant(req.body);
    await participant.save();

    const selectedEvents = Object.values(events || {}).filter(Boolean);
    const techEvents = selectedEvents.filter(ev =>
      ev.toLowerCase().includes("tech")
    ).length;
    const amountPaid = techEvents >= 2 ? 200 : 100;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'AAMEC IT Symposium Registration Confirmation',
      html: `
        <h2 style="color:#2e6c80;">Thank You for Registering, ${name}!</h2>
        <p>
  We are pleased to confirm your registration for the <strong>A.A.M. Engineering College – IT Symposium</strong>.
  This event is a celebration of innovation, technology, and student collaboration, and we’re excited to have you as a part of it.
  Your participation adds value to the symposium, and we are committed to providing you with a memorable and enriching experience.
  The event will feature technical and non-technical activities, competitions, and opportunities to network with peers and professionals.
  Please make sure to arrive on time and bring this confirmation for entry.
  We truly appreciate your interest and look forward to seeing you at the venue.
</p>


        <p>Below are your registration details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>College:</strong> ${college}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Food Requirement:</strong> ${food}</li>
          <li><strong>Events Selected:</strong> ${selectedEvents.join(', ') || "None"}</li>
          <li><strong>Total Amount Paid:</strong> ₹${amountPaid}</li>
        </ul>

        <p>We look forward to welcoming you on the day of the event. Please carry this confirmation for verification.</p>

        <p>For any queries, feel free to contact our coordinators.</p>

        <p style="margin-top:20px;">Warm regards,<br/>
        <strong>IT Department<br/>A.A.M. Engineering College</strong></p>
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
