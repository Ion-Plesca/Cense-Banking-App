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
import AccountManagementPage from "./pages/AccountManagementPage";
import OtherAccountsPage from "./pages/OtherAccountsPage";
import PrivacyDataPage from "./pages/PrivacyDataPage";


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
  const hideNavbarOn = ["/settings"];
  const shouldShowNavbar = user && !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<LoginPage onLogin={setUser} />} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/homepage" element={<HomePage user={user} />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/suggestions" element={<Suggestions />} />

            <Route path="/" element={<Navigate to="/homepage" />} />
            <Route path="/login" element={<Navigate to="/homepage" />} />
            
<Route path="/settings/account-management" element={<AccountManagementPage />} />
<Route path="/settings/other-accounts" element={<OtherAccountsPage />} />
<Route path="/settings/privacy-data" element={<PrivacyDataPage />} />

          </>
        )}
      </Routes>
    </>
  );
}

export default App;
