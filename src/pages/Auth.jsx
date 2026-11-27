import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";

const Auth = () => {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    
    if (mode === "signup") {
      const result = signup(data.email, data.password);
      if (!result.success) {
        setError(result.error);
      } else {
        navigate("/");
      }
    } else {
      const result = login(data.email, data.password);
      if (!result.success) {
        setError(result.error);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-input"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  maxLength: { value: 12, message: "Password must be at most 12 characters" }
                })}
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="button button-primary button-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>Already have an account? <span onClick={() => setMode("login")}>Login</span></p>
            ) : (
              <p>Don't have an account? <span onClick={() => setMode("signup")}>Sign Up</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;