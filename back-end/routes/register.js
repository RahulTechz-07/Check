import express from "express";
import Participant from "../models/Participant.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

router.post("/", async (req, res) => {

  const { name, email, college, phone, food, events } = req.body;

  try {

    const existing = await Participant.findOne({ email });

    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const participant = new Participant(req.body);
    await participant.save();

    const selectedEvents = Object.values(events || {}).filter(Boolean);

    const techEvents = selectedEvents.filter(ev =>
      ev.toLowerCase().includes("tech")
    ).length;

    const amountPaid = techEvents >= 2 ? 200 : 100;

    const emailHTML = `
      <h2 style="color:#2e6c80;">Thank You for Registering, ${name}!</h2>

      <p>
      We are pleased to confirm your registration for the 
      <strong>A.A.M. Engineering College – IT Symposium</strong>.
      This event is a celebration of innovation, technology, and student collaboration.
      </p>

      <p><strong>Your Registration Details:</strong></p>

      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>College:</strong> ${college}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Food Requirement:</strong> ${food}</li>
        <li><strong>Events Selected:</strong> ${selectedEvents.join(", ") || "None"}</li>
        <li><strong>Total Amount Paid:</strong> ₹${amountPaid}</li>
      </ul>

      <p>Please carry this confirmation email during the event.</p>

      <p style="margin-top:20px;">
      Warm regards,<br/>
      <strong>IT Department<br/>A.A.M. Engineering College</strong>
      </p>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "AAMEC IT Symposium Registration Confirmation",
      html: emailHTML
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Registration successful and confirmation email sent"
    });

  } catch (err) {

    console.error("Registration error:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message
    });

  }

});

export default router;