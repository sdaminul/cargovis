import React, { useState } from 'react';
import './Login.css';
import { Container } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Reset link sent to:', email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending reset link:', error);
      alert('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-brand">
            <div className="login-brand-mark">
              <i className={isSubmitted ? 'ri-mail-check-line' : 'ri-key-2-line'}></i>
            </div>
          </div>

          <div className="login-header">
            <h1>{isSubmitted ? 'Check your inbox' : 'Reset your password'}</h1>
            <p>
              {isSubmitted
                ? 'A reset link is on its way.'
                : "Enter your email and we'll send you a secure link to reset your password."}
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <div className="input-wrapper has-icon">
                  <span className="input-icon"><i className="ri-mail-line"></i></span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    autoComplete="email"
                    className={`${error ? 'error' : ''} form-control py-2`}
                    disabled={isLoading}
                  />
                </div>
                {error && <span className="error-message">{error}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary py-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner">
                    <span className="spinner"></span>
                    Sending link...
                  </span>
                ) : (
                  <>Send reset link <i className="ri-send-plane-line ms-1"></i></>
                )}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">
                <i className="ri-checkbox-circle-line"></i>
              </div>
              <h3>Link sent successfully</h3>
              <p>
                We sent a password reset link to <strong>{email}</strong>.
                It expires in 30 minutes.
              </p>
              <button
                className="btn btn-primary py-2"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
              >
                Send to a different email
              </button>
            </div>
          )}

          <div className="login-footer">
            <p>Remember your password? <a href="login">Back to sign in</a></p>
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="cv-footer">
        <Container className="d-flex flex-wrap justify-content-center align-items-center gap-3">
          <div>© {new Date().getFullYear()} 3pl3sixty LLC, Wyoming, 82801. All rights reserved.</div>
        </Container>
      </footer>
    </>
  );
};

export default ForgotPassword;
