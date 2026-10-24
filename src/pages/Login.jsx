import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import "./Login.css";
import { useAuth } from "../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setMessage("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validate()) return;

    setLoading(true);

    try {
      login(form.email.trim().toLowerCase(), form.password);

      setMessage("Login successful! Welcome back to LuxeCart.");


      setTimeout(() => {
        const normalizedEmail = form.email.trim().toLowerCase();

        const destination =
          normalizedEmail === "admin@luxecart.com"
            ? "/admin"
            : location.state?.from?.pathname || "/";

        navigate(destination, {
          replace: true,
          state: {
            authMessage: "Login successful! Welcome back to LuxeCart.",
          },
        });
      }, 1200);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-visual-content">
          <Link to="/" className="auth-brand">
            Luxe<span>Cart</span>
          </Link>

          <div className="auth-visual-copy">
            <span className="auth-eyebrow">THE ART OF LIVING WELL</span>
            <h1>Discover a more personal kind of luxury.</h1>
            <p>
              Thoughtfully selected essentials, timeless style, and
              a shopping experience made just for you.
            </p>
          </div>

          <span className="auth-visual-footer">
            ELEVATE YOUR EVERYDAY.
          </span>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-wrap">
          <Link to="/" className="auth-mobile-brand">
            Luxe<span>Cart</span>
          </Link>

          <span className="auth-eyebrow">WELCOME BACK</span>
          <h2>Sign in to LuxeCart</h2>
          <p className="auth-subtitle">
            Your next favorite find is waiting for you.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <div className={`auth-input-wrap ${errors.email ? "has-error" : ""}`}>
                <FaEnvelope aria-hidden="true" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                />
              </div>
              {errors.email && (
                <small className="auth-error">{errors.email}</small>
              )}
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="login-password">Password</label>
                <Link to="/forgot-password" className="auth-text-link">
                  Forgot password?
                </Link>
              </div>

              <div className={`auth-input-wrap ${errors.password ? "has-error" : ""}`}>
                <FaLock aria-hidden="true" />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                />
                <button
                  className="auth-password-toggle"
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <small className="auth-error">{errors.password}</small>
              )}
            </div>

            {message && (
              <p className="auth-message" role="status">{message}</p>
            )}

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            New to LuxeCart? <Link to="/signup">Create an account</Link>
          </p>

          <Link to="/" className="auth-back-link">
            ← Continue shopping
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
