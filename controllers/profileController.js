import pool from "../db.js";

// -------------------------
// GET PROFILE
// -------------------------
export const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT user_id, username, email, profile_picture
       FROM users 
       WHERE user_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// -------------------------
// UPDATE PROFILE
// -------------------------
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, profile_picture } = req.body;

  try {
    await pool.query(
      `UPDATE users 
       SET username=$1,
           profile_picture=$2,
           updated_at=NOW()
       WHERE user_id=$3`,
      [username, profile_picture, id]
    );

    res.json({ message: "Profile updated successfully" });

  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
};
