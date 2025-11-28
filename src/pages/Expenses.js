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
      const res = await axios.get(
        `http://localhost:5000/api/expenses/${user_id}`
      );
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

    const newExpense = {
      user_id,
      category,
      note,
      amount,
      occurred,
    };

    try {
      await axios.post("http://localhost:5000/api/expenses", newExpense);
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
    const updated = {
      category,
      note,
      amount,
      occurred,
    };

    try {
      await axios.put(
        `http://localhost:5000/api/expenses/${editingId}`,
        updated
      );
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

  return (
    <div className="page">
      <h1>Expenses</h1>

      {/* Add / Update Form */}
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

      {/* Expenses List */}
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <div className="expenses-container">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className={`expense-card category-${expense.category.toLowerCase()}`}
            >
              <h3>{expense.note}</h3>
              <p>
                <strong>Category:</strong> {expense.category}
              </p>
              <p>
                <strong>Amount:</strong> €{expense.amount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {expense.occurred
                  ? new Date(expense.occurred).toLocaleDateString()
                  : ""}
              </p>

              <div className="button-row">
                <button
                  onClick={() => startEditing(expense)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Expenses;