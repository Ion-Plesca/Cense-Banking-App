import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import { Link, Navigate } from "react-router-dom";
import API from "../api";

function HomePage({ user }) {
  // ────────────────────────────────
  // REACT HOOKS MUST BE AT THE TOP
  // ────────────────────────────────
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const [expenseForm, setExpenseForm] = useState({
    category: "",
    note: "",
    amount: "",
    occurred: "",
  });

  const [incomeForm, setIncomeForm] = useState({
    source: "",
    amount: "",
    occurred: "",
  });

  const [showIncomeForm, setShowIncomeForm] = useState(false);

  // ────────────────────────────────
  // FETCH FUNCTIONS
  // ────────────────────────────────
  const fetchExpenses = async () => {
    try {
      const res = await API.get(`/expenses/${user?.user_id}`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchIncomes = async () => {
    try {
      const res = await API.get(`/incomes/${user?.user_id}`);
      setIncomes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchExpenses();
      fetchIncomes();
    }
  }, [user]);

  // ────────────────────────────────
  // REDIRECT AFTER HOOKS ARE DECLARED
  // ────────────────────────────────
  if (!user?.user_id) {
    return <Navigate to="/login" />;
  }

  // ────────────────────────────────
  // ADD + DELETE LOGIC (unchanged)
  // ────────────────────────────────

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

  // ────────────────────────────────
  // UI LAYOUT (unchanged)
  // ────────────────────────────────

  return (
    <div className="home-wrap">
      <div className="home-inner">

        <div className="left">
          <h3 className="heading">A bit About Cense</h3>

          <div className="about-box">
            <p>Cense is a <strong>student budgeting</strong> application that combines</p>
            <p className="green">FINANCIAL</p>
            <p className="green">SUGGESTIONS</p>
            <p className="blue">Predictions</p>
            <p className="red">Trackers</p>
            <p className="yellow">Expenses</p>
            <p>all into one application.</p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="right">
          <h3 className="heading">Testimonials</h3>

          <div className="t-card">
            <p className="quote">"Lifesaver"</p>
            <div className="pf blue"></div>
            <p className="name">Jessie</p>
            <p className="role">Commuting Student</p>
          </div>

          <div className="t-card">
            <p className="quote">"Amazing"</p>
            <div className="pf yellow"></div>
            <p className="name">Kelly</p>
            <p className="role">Renting Student</p>
          </div>

          <div className="t-card">
            <p className="quote">"Informative"</p>
            <div className="pf purple"></div>
            <p className="name">Daniel</p>
            <p className="role">Mature Student</p>
          </div>
        </div>

        <Link to="/settings" className="gear-link">
          <div className="gear">⚙️</div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
