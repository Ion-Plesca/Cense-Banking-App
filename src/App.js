import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Expenses from "./pages/Expenses"
import Navbar from "./components/navbar";

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  return (
    <Router>
      <Navbar />
      <Routes>
        
        {!user ? (
          <>
            <Route path="/" element={<LoginPage onLogin={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path = "/Expenses" element= {<Expenses />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
