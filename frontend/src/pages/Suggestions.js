import React, { useState } from "react";
import "../styles/Suggestions.css";

const initialThreads = [
  {
    id: 1,
    title: "Best ways to save on groceries?",
    author: "Jessie",
    body: "Any tips for cheap but healthy meals while commuting and not always having time to cook?",
    createdAt: "2025-01-20",
    comments: [
      {
        id: 1,
        author: "Kelly",
        text: "Batch cook on Sundays and freeze portions. Also buy store brands instead of big names."
      },
      {
        id: 2,
        author: "Daniel",
        text: "Go late in the evening for yellow-sticker discounts, especially on fresh food."
      }
    ]
  },
  {
    id: 2,
    title: "Managing rent and utilities on a tight budget",
    author: "Kelly",
    body: "For renting students, how do you split bills fairly and avoid arguments about money?",
    createdAt: "2025-01-22",
    comments: [
      {
        id: 1,
        author: "Jessie",
        text: "Use a shared spreadsheet or app where everyone can see who paid what."
      }
    ]
  }
];

function Suggestions() {
  const [threads, setThreads] = useState(initialThreads);
  const [selectedId, setSelectedId] = useState(initialThreads[0]?.id || null);

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText] = useState("");

  const selectedThread = threads.find((t) => t.id === selectedId) || null;

  function handleCreateThread(e) {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim() || !newAuthor.trim()) return;

    const nextId = threads.length ? Math.max(...threads.map((t) => t.id)) + 1 : 1;
    const thread = {
      id: nextId,
      title: newTitle.trim(),
      author: newAuthor.trim(),
      body: newBody.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
      comments: []
    };

    const updated = [thread, ...threads];
    setThreads(updated);
    setSelectedId(thread.id);
    setNewTitle("");
    setNewBody("");
    setNewAuthor("");
  }

  function handleAddComment(e) {
    e.preventDefault();
    if (!selectedThread || !commentAuthor.trim() || !commentText.trim()) return;

    const updatedThreads = threads.map((t) => {
      if (t.id !== selectedThread.id) return t;
      const nextId = t.comments.length ? Math.max(...t.comments.map((c) => c.id)) + 1 : 1;
      const comment = {
        id: nextId,
        author: commentAuthor.trim(),
        text: commentText.trim()
      };
      return { ...t, comments: [...t.comments, comment] };
    });

    setThreads(updatedThreads);
    setCommentAuthor("");
    setCommentText("");
  }

  return (
    <div className="suggestions-page">
      <div className="suggestions-inner">
        <div className="suggestions-column suggestions-left">
          <h2 className="suggestions-heading">Forums</h2>

          <form className="new-thread-card" onSubmit={handleCreateThread}>
            <h3 className="card-title">Start a new discussion</h3>
            <input
              type="text"
              className="input"
              placeholder="Your name"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
            <input
              type="text"
              className="input"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              className="textarea"
              placeholder="Ask a question or share a tip..."
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />
            <button type="submit" className="primary-btn">
              Post
            </button>
          </form>

          <div className="thread-list">
            {threads.map((thread) => (
              <button
                key={thread.id}
                className={
                  "thread-item" +
                  (thread.id === selectedId ? " thread-item-active" : "")
                }
                onClick={() => setSelectedId(thread.id)}
              >
                <div className="thread-title">{thread.title}</div>
                <div className="thread-meta">
                  <span className="meta-author">{thread.author}</span>
                  <span className="meta-date">{thread.createdAt}</span>
                  <span className="meta-count">
                    {thread.comments.length} comment
                    {thread.comments.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </button>
            ))}
            {threads.length === 0 && (
              <div className="empty-state">No posts yet. Be the first to start a discussion.</div>
            )}
          </div>
        </div>

        <div className="suggestions-column suggestions-right">
          {selectedThread ? (
            <>
              <div className="thread-detail-card">
                <h2 className="thread-detail-title">{selectedThread.title}</h2>
                <div className="thread-detail-meta">
                  <span>{selectedThread.author}</span>
                  <span>•</span>
                  <span>{selectedThread.createdAt}</span>
                </div>
                <p className="thread-detail-body">{selectedThread.body}</p>
              </div>

              <div className="comments-card">
                <h3 className="card-title">Comments</h3>
                <div className="comments-list">
                  {selectedThread.comments.length === 0 && (
                    <div className="empty-state small">No comments yet. Start the conversation.</div>
                  )}
                  {selectedThread.comments.map((c) => (
                    <div key={c.id} className="comment-item">
                      <div className="comment-avatar">
                        {c.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="comment-content">
                        <div className="comment-author">{c.author}</div>
                        <div className="comment-text">{c.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="comment-form" onSubmit={handleAddComment}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your name"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                  />
                  <textarea
                    className="textarea"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button type="submit" className="primary-btn">
                    Add comment
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="empty-detail-state">
              Select a forum thread on the left or create a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
