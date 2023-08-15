import express from "express";
import Expenses from "../db/models/expense.mjs";

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

expenses.patch("/expense", async (req, res) => {
  let _id = req.session.userId;
  const updates =  {
    $set: {

    }
  };

  let result = await User.updateOne(_id, updates);

  res.send(result).status(200);
});


export default expenses; 