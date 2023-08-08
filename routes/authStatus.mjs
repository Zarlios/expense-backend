import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
  const isAuthenticated = !!req.session.userId;
  res.json({ isAuthenticated });
});

export default router;