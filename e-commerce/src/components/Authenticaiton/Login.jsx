import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.config";
function Login() {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);

  // Login Page here...
  const navigate = useNavigate();
  const location = useLocation();
//   const [prevuser] = useAuthState();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    navigate(from, { replace: true });
  };

  return (
    <div className="container mt-5 text-center">
      <button className="btn btn-primary" onClick={handleGoogleSignIn}>
        {user ? "You have logged" : "Login with GOOGLE"}
      </button>
    </div>
  );
}

export default Login;
