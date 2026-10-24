import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Frontend demonstration only.
        setMessage(
            "Your email address has been validated successfully! This demo does not send a real password reset email."
        );
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-card">
                <Link to="/login" className="forgot-back-link">
                    <FaArrowLeft /> Back to Login
                </Link>

                <div className="forgot-icon">
                    <FaEnvelope />
                </div>

                <p className="forgot-eyebrow">ACCOUNT RECOVERY</p>
                <h1>Forgot Password?</h1>

                <p className="forgot-description">
                    Don't worry. Enter your registered email address and we'll help
                    you get back into your LuxeCart account.
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="reset-email">Email Address</label>

                    <input
                        id="reset-email"
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                            setMessage("");
                        }}
                        autoComplete="email"
                    />

                    {error && <p className="forgot-error">{error}</p>}
                    {message && <p className="forgot-success">{message}</p>}

                    <button type="submit" className="forgot-submit-btn">
                        Send Reset Link
                    </button>
                </form>

                <p className="forgot-login-text">
                    Remember your password? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;