import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() 
{
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      background: "#001B79",
      color: "white",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      
      <h2>Cense</h2>

      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          fontSize: "24px",
          userSelect: "none"
        }}
      >
        ☰
      </div>
      {open && (
        <div style={{
          position: "absolute",
          top: "60px",
          right: "20px",
          background: "#081369",
          padding: "10px",
          borderRadius: "6px"
        }}>
          <Link to="/" style={{ color: "white", textDecoration: "none", display: "block", margin: "8px 0" }}>Home</Link>
          <Link to="/Expenses" style={{ color: "white", textDecoration: "none", display: "block", margin: "8px 0" }}>Expenses</Link>
          <Link to="/income" style={{ color: "white", textDecoration: "none", display: "block", margin: "8px 0" }}>Incomes</Link>
          <Link to="/logout" style={{ color: "white", textDecoration: "none", display: "block", margin: "8px 0" }}>Logout</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;