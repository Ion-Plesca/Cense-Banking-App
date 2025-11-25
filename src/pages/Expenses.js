import React, { useState, useEffect } from "react";
import axios from "axios";
import './Expenses.css';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/expenses/${user_id}`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddExpense = async () => {
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = { user_id, title, amount, category, date };

    try {
      await axios.post("http://localhost:5000/api/expenses", newExpense);
      fetchExpenses();
      clearForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/expenses/${editingId}`, {
        title,
        amount,
        category,
        date,
      });

      setEditingId(null);
      clearForm();
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setEditingId(expense.id);
  };

  const clearForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="expenses-page">
      <h1 className="title">Expenses</h1>

      {/* Form */}
      <div className="section-card">
        <h2>{editingId ? "Update Expense" : "Add Expense"}</h2>

        <input
          className="auth-input"
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="auth-input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="auth-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <input
          className="auth-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {!editingId ? (
          <button className="auth-button" onClick={handleAddExpense}>
            Add Expense
          </button>
        ) : (
          <button className="auth-button" onClick={handleUpdate}>
            Save Changes
          </button>
        )}
      </div>

      {/* Expense List */}
      <ul className="expense-list">
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div className="expense-info">
                <span><strong>{expense.title}</strong></span>
                <span>Amount: €{expense.amount}</span>
                <span>Category: {expense.category}</span>
                <span className="date">Date: {expense.date}</span>
              </div>

              <button className="auth-button" onClick={() => startEditing(expense)}>
                Edit
              </button>

              <button className="auth-button" onClick={() => handleDelete(expense.id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Expenses;
