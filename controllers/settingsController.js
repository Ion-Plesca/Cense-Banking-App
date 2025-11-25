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

export const updateSettings = async(req, res) => {
    const {id} = req.params;
    const {currency, default_period, notifications_enabled, updated_at} = req.body;
    try{
        await pool.query("UPDATE user_settings SET currency = $1, default_period = $2, notifications_enabled = $3, updated_at = NOW() WHERE id = $4)",
            [user_id, currency, default_period, notifications_enabled, updated_at]
        );
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Error updating settings"});
    }
};