import pool from "../db.js";

export const getExpenses = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM expenses WHERE user_id = $1 ORDER BY occurred DESC", [user_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

export const addExpense = async (req, res) => {
  const { user_id, category, note, amount, occurred } = req.body;
  try {
    await pool.query(
      "INSERT INTO expenses (user_id, category, note, amount, occurred, created_at) VALUES ($1, $2, $3, $4, $5, NOW())",
      [user_id, category, note, amount, occurred]
    );
    res.json({ message: "Expense added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding expense" });
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { category, note, amount, occurred } = req.body;
  try {
    await pool.query(
      "UPDATE expenses SET category=$1, note=$2, amount=$3, occurred=$4 WHERE id=$5",
      [category, note, amount, occurred, id]
    );
    res.json({ message: "Expense updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating expense" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM expenses WHERE id=$1", [id]);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting expense" });
  }
};
