import React, { useState, useEffect } from "react";
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
import AccountManagementPage from "./pages/AccountManagementPage";
import OtherAccountsPage from "./pages/OtherAccountsPage";
import PrivacyDataPage from "./pages/PrivacyDataPage";

import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
    const profile_picture = localStorage.getItem("profile_picture");

    if (user_id && username) {
      setUser({
        user_id,
        username,
        profile_picture
      });
    }
  }, []);

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

function AppContent({ user, setUser }) {
  const location = useLocation();
  const hideNavbarOn = ["/settings"];

  const shouldShowNavbar =
    user &&
    !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar user={user} />}

      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<LoginPage onLogin={setUser} />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/homepage" element={<HomePage user={user} />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/settings" element={<Settings onUserUpdate={setUser} />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/suggestions" element={<Suggestions />} />

            {/* Redirect logged-in users */}
            <Route path="/" element={<Navigate to="/homepage" />} />
            <Route path="/login" element={<Navigate to="/homepage" />} />

            <Route path="/settings/account-management" element={<AccountManagementPage />} />
            <Route path="/settings/other-accounts" element={<OtherAccountsPage />} />
            <Route path="/settings/privacy-data" element={<PrivacyDataPage />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/homepage" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
