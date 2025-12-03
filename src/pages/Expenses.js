import React, { useState, useEffect } from "react";
import "../styles/Expenses.css";
import API from "../api";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [occurred, setOccurred] = useState("");
  const [editingId, setEditingId] = useState(null);

  const user_id = localStorage.getItem("user_id");

  const formatDateTimeForInput = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return "";
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  };

  const formatDateTimeDisplay = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleString();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get(`/expenses/${user_id}`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddExpense = async () => {
    if (!category || !note || !amount || !occurred) return alert("Please fill all fields");

    try {
      await API.post("/expenses", {
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
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await API.put(`/expenses/${editingId}`, {
        category,
        note,
        amount,
        occurred,
      });

      clearForm();
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (expense) => {
    setCategory(expense.category);
    setNote(expense.note);
    setAmount(expense.amount);
    setOccurred(formatDateTimeForInput(expense.occurred));
    setEditingId(expense.id);
  };

  const clearForm = () => {
    setCategory("");
    setNote("");
    setAmount("");
    setOccurred("");
  };

  const categoryClass = (cat) => {
    return "expense-card category-" + cat.toLowerCase();
  };

  return (
    <div className="main">
      <div className="page">
        <h1>Expenses</h1>

        <div className="card">
          <h2>{editingId ? "Update Expense" : "Add Expense"}</h2>

          <select
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
            type="text"
            className="input-narrow"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <input
            type="number"
            className="input-narrow"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="datetime-local"
            className="input-narrow"
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
          {expenses.length === 0 ? (
            <p className="no-expenses">No expenses yet.</p>
          ) : (
            expenses.map((exp) => (
              <div key={exp.id} className={categoryClass(exp.category)}>
                <h3>{exp.note}</h3>
                <p>Category: {exp.category}</p>
                <p>Amount: €{exp.amount}</p>
                <p>Date: {formatDateTimeDisplay(exp.occurred)}</p>

                <div className="button-row">
                  <button
                    className="edit-btn"
                    onClick={() => startEditing(exp)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(exp.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
