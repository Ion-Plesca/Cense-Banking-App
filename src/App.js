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
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";
import Tracker from "./pages/Tracker";
import Predictions from "./pages/Predictions";
import Suggestions from "./pages/Suggestions";

import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
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
