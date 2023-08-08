import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
  console.log("get auth session")
  console.log(req.sessionID)
  const isAuthenticated = !!req.session.userId;
  res.json({ isAuthenticated });
});

export default router;