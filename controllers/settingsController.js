import pool from "../db.js";

export const getSettings = async (req, res) => {
    const {user_id} = req.params;
    try{
        const result = await pool.query("SELECT * FROM user_settings WHERE user_id = $1", [user_id]);
        res.json(result.rows);
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error getting settings"});
    }
};

export const addSettings = async(req, res) => {
    const {user_id, currency, default_period, notifications_enabled, updated_at} = req.body;
    try{
        const result = await pool.query("INSERT INTO user_settings (user_id, currency, default_period, notifications_enabled, created_at, updated_at) VALUE ($1, $2, $3, $4, NOW(), NOW())"
            [user_id, currency, default_period, notifications_enabled, updated_at]
        );
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Error adding settings"});
    }
};

export async function updateSettings(req, res) {
  try {
    const user_id = req.params.id;
    const { username } = req.body;

    let profilePicUrl = null;

    if (req.file) {
      profilePicUrl = `/uploads/${req.file.filename}`;
    }

    await pool.query(
      "UPDATE users SET username = $1, profile_picture = $2 WHERE user_id = $3",
      [username, profilePicUrl, user_id]
    );

    return res.json({
      username,
      profile_picture: profilePicUrl,
      message: "Profile updated",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update settings" });
  }
}

