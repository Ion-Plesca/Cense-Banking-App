import React from "react";
import "./../styles/Predictions.css";

function PredictionsPage() {
  return (
    <div className="predictions-page">
      {/* MAIN CONTENT */}
      <div className="content">

        {/* LEFT SIDE */}
        <div className="chart-section">
          <h2 className="title">Expenses</h2>

          <div className="chart-placeholder">
            {/* Insert chart later */}
          </div>

          {/* STATS */}
          <div className="stats-row">
            <div className="stat-card">
              <p>Expected Expenditure</p>
              <h3>€3,678.90</h3>
              <small>+20% this month</small>
            </div>

            <div className="stat-card">
              <p>MAU (Monthly Active Users)</p>
              <h3>10,353</h3>
              <small>+5% month over month</small>
            </div>

            <div className="stat-card">
              <p>Groceries</p>
              <h3>€190</h3>
              <small>+8% this month</small>
            </div>
          </div>

          {/* FORECAST */}
          <div className="forecast-box">
            <h3>Spending Forecast</h3>

            <div className="forecast-row">
              <div className="forecast-item">
                <strong>Subscription Spending</strong>
                <p>Estimated €89/month</p>
              </div>

              <div className="forecast-item">
                <strong>Linear Spending Trend</strong>
                <p>Predicted €3,850 next month</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="accounts-box">
          <h3>Accounts</h3>

          <div className="account">
            <img src="https://i.pravatar.cc/100?img=12" alt="" />
            <div>
              Marie (Work) Andrews<br />
              marie@outlook.com
            </div>
          </div>

          <div className="account">
            <img src="https://i.pravatar.cc/100?img=22" alt="" />
            <div>
              Malcolm Andrews<br />
              malcolm@fastmail.net
            </div>
          </div>

          <div className="account">
            <img src="https://i.pravatar.cc/100?img=33" alt="" />
            <div>
              Carlo Emilio<br />
              carlo@email.com
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PredictionsPage;
