import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useMemo, useState } from "react";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => localStorage.getItem("loggedInUser"));
  const isLoggedIn = useMemo(() => Boolean(loggedInUser), [loggedInUser]);

  const handleLoginSuccess = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(JSON.stringify(user));
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 24, fontFamily: "sans-serif" }}>Loading…</div>}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Home onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
