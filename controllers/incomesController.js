import pool from "../db.js";

export const getIncomes = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM incomes WHERE user_id = $1 ORDER BY occurred DESC",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching incomes" });
  }
};

export const addIncome = async (req, res) => {
  const { user_id, source, amount, occurred } = req.body;
  try {
    await pool.query(
      "INSERT INTO incomes (user_id, source, amount, occurred, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())",
      [user_id, source, amount, occurred]
    );
    res.json({ message: "Income added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding income" });
  }
};

export const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { source, amount, occurred } = req.body;
  try {
    await pool.query(
      "UPDATE incomes SET source=$1, amount=$2, occurred=$3, updated_at=NOW() WHERE id=$4",
      [source, amount, occurred, id]
    );
    res.json({ message: "Income updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating income" });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM incomes WHERE id=$1", [id]);
    res.json({ message: "Income deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting income" });
  }
};
