import pool from "../db.js";

export const getPredictions = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT category, amount, occurred FROM expenses WHERE user_id = $1",
      [user_id]
    );

    const rows = result.rows;

    if (!rows.length) {
      return res.json({
        summary: { thisMonthTotal: 0, lastMonthTotal: 0, changePercent: 0 },
        groceries: { thisMonth: 0 },
        forecast: { nextMonthEstimate: 0 }
      });
    }

    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastYear = lastMonthDate.getFullYear();

    let thisMonthTotal = 0;
    let lastMonthTotal = 0;
    let groceriesThisMonth = 0;

    const monthTotals = {};

    rows.forEach((r) => {
      const d = new Date(r.occurred);
      const m = d.getMonth();
      const y = d.getFullYear();
      const key = `${y}-${m + 1}`;
      const amt = Number(r.amount);

      if (!monthTotals[key]) monthTotals[key] = 0;
      monthTotals[key] += amt;

      if (y === thisYear && m === thisMonth) {
        thisMonthTotal += amt;
        if (r.category === "Food") groceriesThisMonth += amt;
      }
      if (y === lastYear && m === lastMonth) {
        lastMonthTotal += amt;
      }
    });

    let changePercent =
      lastMonthTotal > 0
        ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
        : 0;

    const monthKeys = Object.keys(monthTotals).sort();
    let nextMonthEstimate = thisMonthTotal;
    if (monthKeys.length >= 2) {
      const values = monthKeys.map((k) => monthTotals[k]);
      const avg = values.reduce((a, b) => a + b) / values.length;
      nextMonthEstimate = avg;
    }

    res.json({
      summary: { thisMonthTotal, lastMonthTotal, changePercent },
      groceries: { thisMonth: groceriesThisMonth },
      forecast: { nextMonthEstimate }
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating predictions" });
  }
};
