import express from "express";
import Participant from "../models/Participant.js"; // adjust the path based on your project
const router = express.Router();

// GET all participants
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch participants" });
  }
});

export default router;
