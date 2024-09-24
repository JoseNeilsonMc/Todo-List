import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoListPage from "./pages/TodoListPage";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todos" element={user ? <TodoListPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/todos" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
