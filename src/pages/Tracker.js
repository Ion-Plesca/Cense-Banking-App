import React, { useEffect, useState } from "react";
import "../styles/Tracker.css";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Tracker() {
  const [expenses, setExpenses] = useState([]);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`http://localhost:5000/api/expenses/${user_id}`);
        setExpenses(res.data);
      } catch (e) {}
    }
    load();
  }, [user_id]);

  const categoryTotals = expenses.reduce((acc, exp) => {
    if (!acc[exp.category]) acc[exp.category] = 0;
    acc[exp.category] += Number(exp.amount);
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([cat, total]) => ({
    name: cat,
    value: total,
  }));

  const monthlyTotals = expenses.reduce((acc, exp) => {
    const m = new Date(exp.occurred).toLocaleString("default", { month: "short" });
    if (!acc[m]) acc[m] = 0;
    acc[m] += Number(exp.amount);
    return acc;
  }, {});

  const barData = Object.entries(monthlyTotals).map(([m, total]) => ({
    month: m,
    amount: total,
  }));

  const COLORS = ["#4CAF50", "#2196F3", "#EB4335", "#9C27B0", "#FF9800"];

  return (
    <div className="tracker-page">
      <h1 className="tracker-title">Spending Tracker</h1>

      <div className="tracker-grid">
        <div className="tracker-card">
          <h2 className="tracker-subtitle">Spending by Category</h2>
          <div className="chart-wrapper">
            {pieData.length === 0 ? (
              <p className="empty-chart">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="tracker-card">
          <h2 className="tracker-subtitle">Monthly Spending</h2>
          <div className="chart-wrapper">
            {barData.length === 0 ? (
              <p className="empty-chart">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#2d6eff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracker;
