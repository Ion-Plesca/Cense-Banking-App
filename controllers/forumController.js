import pool from "../db.js";

export const getThreads = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.id, t.title, t.body, t.author_name, t.created_at,
      COUNT(c.id) AS comment_count
      FROM forum_threads t
      LEFT JOIN forum_comments c ON c.thread_id = t.id
      GROUP BY t.id
      ORDER BY t.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error loading threads" });
  }
};

export const getThreadById = async (req, res) => {
  const { id } = req.params;
  try {
    const threadRes = await pool.query(
      "SELECT * FROM forum_threads WHERE id = $1",
      [id]
    );
    if (threadRes.rows.length === 0) return res.status(404).json({ message: "Thread not found" });

    const commentsRes = await pool.query(
      "SELECT * FROM forum_comments WHERE thread_id = $1 ORDER BY created_at ASC",
      [id]
    );

    res.json({
      thread: threadRes.rows[0],
      comments: commentsRes.rows
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading thread" });
  }
};

export const createThread = async (req, res) => {
  const { user_id, author_name, title, body } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO forum_threads (user_id, author_name, title, body, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [user_id, author_name, title, body]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error creating thread" });
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params; 
  const { user_id, author_name, text } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO forum_comments (thread_id, user_id, author_name, text, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [id, user_id, author_name, text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
};
