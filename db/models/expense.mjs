import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Create a unique index on the username field
  },
  expense: {
    type: String,
    required: true,
  },
  amount: {
    type: Decimal128,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;