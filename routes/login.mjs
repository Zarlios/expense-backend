import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";

const router = express.Router();

// User Routes
const userCollection = await db.collection("users");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log("post before session")
  console.log(req.sessionID)
  console.log(req.session)
  
  try {
    const user = await userCollection.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Incorrect username/password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({ error: "Incorrect username/password" });
    }

    req.session.userId = user._id;
    await req.session.save();
    console.log("post after session")
    console.log(req.sessionID)
    console.log(req.session)

    res.sendStatus(200);
  } catch (err) {
    console.error("Error logging in:", err);
    res.sendStatus(500);
  }
});

export default router;
