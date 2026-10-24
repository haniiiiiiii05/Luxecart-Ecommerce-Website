
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaLock,
    FaEnvelope,
    FaUser,
} from "react-icons/fa";
import "./Signup.css";
import { useAuth } from "../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { signup } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));

        setMessage("");
    };

    const validate = () => {
        const nextErrors = {};

        if (form.name.trim().length < 2) {
            nextErrors.name = "Enter your name (at least 2 characters).";
        }

        if (!EMAIL_REGEX.test(form.email.trim())) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (form.password.length < 8) {
            nextErrors.password = "Password must be at least 8 characters.";
        }

        if (form.confirmPassword !== form.password) {
            nextErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("");

        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            signup(form.name, form.email, form.password);

            setMessage("Account created successfully! Welcome to LuxeCart.");

            setTimeout(() => {
                navigate("/", {
                    state: {
                        authMessage: "Account created successfully! Welcome to LuxeCart.",
                    },
                });
            }, 1200);
        } catch (err) {
            setMessage(err.message || "Unable to create your account.");
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
                        <span className="auth-eyebrow">
                            A WORLD OF YOUR OWN
                        </span>

                        <h1>Good taste starts with the details.</h1>

                        <p>
                            Create your account for a more personal shopping
                            experience, with your favorites and orders in one place.
                        </p>
                    </div>

                    <span className="auth-visual-footer">
                        YOUR STYLE. YOUR STORY.
                    </span>
                </div>
            </section>

            <section className="auth-form-section">
                <div className="auth-form-wrap">
                    <Link to="/" className="auth-mobile-brand">
                        Luxe<span>Cart</span>
                    </Link>

                    <span className="auth-eyebrow">JOIN LUXECART</span>

                    <h2>Create your account</h2>

                    <p className="auth-subtitle">
                        A few details to make your experience yours.
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="auth-field">
                            <label htmlFor="signup-name">Full name</label>

                            <div className={`auth-input-wrap ${errors.name ? "has-error" : ""}`}>
                                <FaUser aria-hidden="true" />

                                <input
                                    id="signup-name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    aria-invalid={Boolean(errors.name)}
                                />
                            </div>

                            {errors.name && (
                                <small className="auth-error">{errors.name}</small>
                            )}
                        </div>

                        <div className="auth-field">
                            <label htmlFor="signup-email">Email address</label>

                            <div className={`auth-input-wrap ${errors.email ? "has-error" : ""}`}>
                                <FaEnvelope aria-hidden="true" />

                                <input
                                    id="signup-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
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
                            <label htmlFor="signup-password">Password</label>

                            <div className={`auth-input-wrap ${errors.password ? "has-error" : ""}`}>
                                <FaLock aria-hidden="true" />

                                <input
                                    id="signup-password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="At least 8 characters"
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

                        <div className="auth-field">
                            <label htmlFor="signup-confirm-password">
                                Confirm password
                            </label>

                            <div className={`auth-input-wrap ${errors.confirmPassword ? "has-error" : ""}`}>
                                <FaLock aria-hidden="true" />

                                <input
                                    id="signup-confirm-password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Re-enter your password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    aria-invalid={Boolean(errors.confirmPassword)}
                                />

                                <button
                                    className="auth-password-toggle"
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((previous) => !previous)
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {errors.confirmPassword && (
                                <small className="auth-error">
                                    {errors.confirmPassword}
                                </small>
                            )}
                        </div>

                        {message && (
                            <p className="auth-message" role="alert">
                                {message}
                            </p>
                        )}

                        <button
                            className="auth-submit"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>

                    <Link to="/" className="auth-back-link">
                        ← Continue shopping
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Signup;
