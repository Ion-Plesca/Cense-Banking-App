import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";
import Tracker from "./pages/Tracker";
import Predictions from "./pages/Predictions";
import Suggestions from "./pages/Suggestions";

import Navbar from "./components/Navbar";
=======
import Expenses from "./pages/Expenses"
import Navbar from "./components/navbar";
>>>>>>> 19054aabbb51193d586683c272f866c43e4a4243

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  return (
    <Router>
<<<<<<< HEAD
      <AppContent user={user} setUser={setUser} />
=======
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
>>>>>>> 19054aabbb51193d586683c272f866c43e4a4243
    </Router>
  );
}

function AppContent({ user, setUser }) {
  const location = useLocation();

  //navabar at the side for settings page
  const hideNavbarOn = ["/settings"];
  const shouldShowNavbar =
    user && !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {/* Conditionally show Navbar */}
      {shouldShowNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        {!user && (
          <>
            <Route path="/" element={<LoginPage onLogin={setUser} />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Private Routes */}
        {user && (
          <>
            <Route path="/homepage" element={<HomePage user={user} />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/suggestions" element={<Suggestions />} />

            {/* Redirect logged-in users from login page to homepage */}
            <Route path="/" element={<Navigate to="/homepage" />} />
            <Route path="/login" element={<Navigate to="/homepage" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
