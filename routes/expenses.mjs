import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const expenses = express.Router();

// User Routes
const expenseCollection = await db.collection("expenses");

expenses.get("/expense/:id", async (req, res) => {
  let query = {_id: new ObjectId(req.params.id)};
  let results = await expensesCollection.find({}).toArray();
  res.send(results).status(200);
});

expenses.post("/expense/:id")

export default user;