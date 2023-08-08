import express from "express";
import db from "../db/conn.mjs";
import Expenses from "../db/models/expense.mjs"

const expenses = express.Router();

expenses.get("/expense", async (req, res) => {
  let _id = req.session._id;
  let results = await Expenses.find({ _id }).toArray();
  res.send(results).status(200);
});

// expenses.post("/expense/:id")

export default expenses; 