import React, { useState, useEffect } from "react";
import API from "../api";

function HomePage({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenseForm, setExpenseForm] = useState({ category: "", note: "", amount: "", occurred: "" });
  const [incomeForm, setIncomeForm] = useState({ source: "", amount: "", occurred: "" });
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const fetchExpenses = async () => {
    try {
      const res = await API.get(`/expenses/${user.user_id}`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchIncomes = async () => {
    try {
      const res = await API.get(`/incomes/${user.user_id}`);
      setIncomes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expenses", { user_id: user.user_id, ...expenseForm });
      setExpenseForm({ category: "", note: "", amount: "", occurred: "" });
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      await API.post("/incomes", { user_id: user.user_id, ...incomeForm });
      setIncomeForm({ source: "", amount: "", occurred: "" });
      setShowIncomeForm(false);
      fetchIncomes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await API.delete(`/incomes/${id}`);
      fetchIncomes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Main app container. You can change background, borders and spacing by editing
    // the `.app-container` class in `src/index.css` or your global stylesheet.
  <div className="app-container">
      {/* render site header */}
      <h2>Welcome, {user.username}</h2>

      {/* EXPENSE SECTION */}
      <div className="section-card">
        <h3>Add Expense</h3>
        <form onSubmit={handleAddExpense}>
          <input
            className="auth-input"
            type="text"
            placeholder="Category"
            value={expenseForm.category}
            onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
            required
          />
          <input
            className="auth-input"
            type="text"
            placeholder="Note"
            value={expenseForm.note}
            onChange={(e) => setExpenseForm({ ...expenseForm, note: e.target.value })}
          />
          <input
            className="auth-input"
            type="number"
            placeholder="Amount"
            value={expenseForm.amount}
            onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
            required
          />
          <input
            className="auth-input"
            type="date"
            value={expenseForm.occurred}
            onChange={(e) => setExpenseForm({ ...expenseForm, occurred: e.target.value })}
            required
          />
          <button className="auth-button" type="submit">Add</button>
        </form>
      </div>

      <div className="section-card">
        <h3>Your Expenses</h3>
        <ul>
          {expenses.map((exp) => (
            <li className="list-item" key={exp.id}>
              {exp.category} - {exp.note} - ${exp.amount} - {exp.occurred}
              <button className="auth-button ml-8" onClick={() => handleDeleteExpense(exp.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="section-card">
        <h3>Your Incomes</h3>
        <button className="auth-button" onClick={() => setShowIncomeForm(!showIncomeForm)}>
          {showIncomeForm ? "Cancel" : "Add Income"}
        </button>

        {showIncomeForm && (
          <form onSubmit={handleAddIncome} className="mt-10">
            <input
              className="auth-input"
              type="text"
              placeholder="Source"
              value={incomeForm.source}
              onChange={(e) => setIncomeForm({ ...incomeForm, source: e.target.value })}
              required
            />
            <input
              className="auth-input"
              type="number"
              placeholder="Amount"
              value={incomeForm.amount}
              onChange={(e) => setIncomeForm({ ...incomeForm, amount: e.target.value })}
              required
            />
            <input
              className="auth-input"
              type="date"
              value={incomeForm.occurred}
              onChange={(e) => setIncomeForm({ ...incomeForm, occurred: e.target.value })}
              required
            />
            <button className="auth-button" type="submit">Add Income</button>
          </form>
        )}

        <ul>
          {incomes.map((inc) => (
            <li className="list-item" key={inc.id}>
              {inc.source} - ${inc.amount} - {inc.occurred}
              <button className="auth-button ml-8" onClick={() => handleDeleteIncome(inc.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
