import express from "express";
import bcrypt from "bcrypt";
import User from "../db/models/user.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Incorrect username/password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({ error: "Incorrect username/password" });
    }

    req.session.userId = user._id;
    req.session.save().then(() => {
      return res.status(200).json({ status: "success" });
    });

    console.log(req.session);
  } catch (err) {
    console.error("Error logging in:", err);
    return res.sendStatus(500).json(err);
  }
});

export default router;
