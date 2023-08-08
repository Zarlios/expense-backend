import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

export default router;