import { lazy, Suspense } from "react";
// React Router Dom
import { Routes, Route } from "react-router-dom";
// components
const StudentsGrade = lazy(()=> import("./pages/StudentsGrade"));
const Login = lazy(()=> import("./pages/Login"));
const Signup = lazy(()=> import("./pages/Signup"));
const Dashboard = lazy(()=>import("./pages/Dashboard"));
// import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

function App() {
  return (
    <>
      {/* Routes */}
        <Suspense fallback={<Loading/>}>
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
        </Suspense>

    </>
  );
}

export default App;
