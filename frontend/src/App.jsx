import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useMemo, useState } from "react";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    // ✅ Only restore session if token exists
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("loggedInUser");
    return token && user ? user : null;
  });

  const isLoggedIn = useMemo(() => Boolean(loggedInUser), [loggedInUser]);

  const handleLoginSuccess = (user) => {
    // ✅ user is already a plain object from handleLogin in Home.jsx
    // just stringify it for state (to match how we read it back)
    setLoggedInUser(typeof user === "string" ? user : JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{
          height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Montserrat',sans-serif", fontSize: 12, letterSpacing: 3,
          color: "#b87333", textTransform: "uppercase"
        }}>
          Loading…
        </div>
      }>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />}
          />
          {/* Catch-all → redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;