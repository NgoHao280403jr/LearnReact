import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "@/contexts/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
