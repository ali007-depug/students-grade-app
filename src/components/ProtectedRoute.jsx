/**
 * This componetn is used to when user refresh the dashboard to stop take him to the login page
 */
// hooks
import { useEffect, useState } from "react";
// react router
import { Navigate } from "react-router-dom";
// firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(""); 
  const [checking, setChecking] = useState(true);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });

    // cleanup
    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
        <div className="[direction:rtl] px-2 grid place-items-center h-[100dvh] bg-bg-color text-white font-extrabold">
        <div className="flex items-center gap-2">
          <span className="block size-5 border-2 border-white border-b-transparent rounded-full animate-spin  "></span>
        <h1>جار التحقق من تسجيل الدخول...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}
