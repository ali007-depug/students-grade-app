// components
import StudentsGrade from "./pages/StudentsGrade";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
// React Router Dom
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* Routes */}
      <Routes>
        {/* students UI */}
        <Route
          path="/"
          element={
            <div className="[direction:rtl] px-2 grid place-items-center h-[100dvh] bg-bg-color">
              <StudentsGrade />
            </div>
          }
        />
        {/* ==== End students UI */}
        {/* Login UI */}
        <Route
          path="/login"
          element={
            <div className="[direction:rtl] px-2 grid place-items-center h-[100dvh] bg-bg-color">
              <Login />
            </div>
          }
        />
        {/* ==== End Login UI ==== */}
        {/* signup UI */}
        <Route
          path="/signup"
          element={
            <div className="[direction:rtl] px-2 grid place-items-center h-[100dvh] bg-bg-color">
              <Signup />
            </div>
          }
        />
        {/* ==== End Signup ==== */}
        {/* Dashobard UI */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* ===== End Dashboard UI ==== */}
      </Routes>
    </>
  );
}

export default App;
