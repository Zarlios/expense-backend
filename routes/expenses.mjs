import express from "express";
import Expenses from "../db/models/expense.mjs";
import mongoose from "mongoose";

const expenses = express.Router();

expenses.get("/", async (req, res) => {
  try {
    const _id = req.session.userId;
    let results = await Expenses.find({ userId: _id });
    res.status(200).json(results);
  } catch (error) {
    res.send(error)
  }
});

expenses.post("/", async (req, res) => {
  try {
    const expense = {
      userId: req.session.userId,
      expenseDate: req.body.expenseDate,
      category: req.body.category,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      merchant: req.body.merchant,
      note: req.body.note,
      receipt: req.body.receipt
    }
    const createdExpense = await Expenses.create(expense);
    res.status(200).json({ status: "success" });
  }
  catch (error) {
    res.status(500).send( error );
  }
  
});

expenses.patch("/", async (req, res) => {
  let _id = new mongoose.Types.ObjectId(req.body._id);
  const updates =  {
    $set: {
      userId: req.session.userId,
      expenseDate: req.body.expenseDate,
      category: req.body.category,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      merchant: req.body.merchant,
      note: req.body.note,
      receipt: req.body.receipt
    }
  };

  let result = await Expenses.updateOne({_id: _id}, updates);

  res.send(result).status(200);
});

expenses.delete("/:id", async (req, res) => {
  const query = { _id: req.params.id };

  let result = await Expenses.deleteOne(query);

  res.send(result).status(200);
});


export default expenses; 