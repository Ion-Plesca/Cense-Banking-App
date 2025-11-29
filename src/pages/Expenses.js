import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Expenses.css";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [occurred, setOccurred] = useState("");
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
    if (!category || !note || !amount || !occurred) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/expenses", {
        user_id,
        category,
        note,
        amount,
        occurred,
      });

      clearForm();
      fetchExpenses();
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
        category,
        note,
        amount,
        occurred,
      });

      setEditingId(null);
      clearForm();
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (expense) => {
    setCategory(expense.category);
    setNote(expense.note);
    setAmount(expense.amount);
    setOccurred(expense.occurred);
    setEditingId(expense.id);
  };

  const clearForm = () => {
    setCategory("");
    setNote("");
    setAmount("");
    setOccurred("");
  };

  // CATEGORY → CSS MAP
  const getCategoryClass = (cat) => {
    switch (cat) {
      case "Food":
        return "category-food";
      case "Transport":
        return "category-transport";
      case "Bills":
        return "category-bills";
      case "Shopping":
        return "category-shopping";
      default:
        return "category-other";
    }
  };

  return (
    <div className="main">
      <div className="page">
        <h1>Expenses</h1>

        <div className="card">
          <h2>{editingId ? "Update Expense" : "Add Expense"}</h2>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="date"
            value={occurred}
            onChange={(e) => setOccurred(e.target.value)}
          />

          {!editingId ? (
            <button onClick={handleAddExpense}>Add Expense</button>
          ) : (
            <button onClick={handleUpdate}>Save Changes</button>
          )}
        </div>

        <div className="expenses-container">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className={`expense-card ${getCategoryClass(expense.category)}`}
            >
              <h3>{expense.note}</h3>
              <p>Category: {expense.category}</p>
              <p>Amount: €{expense.amount}</p>
              <p>Date: {expense.occurred}</p>

              <div className="button-row">
                <button className="edit-btn" onClick={() => startEditing(expense)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(expense.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Expenses;
