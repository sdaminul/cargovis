import React, { useState } from 'react';
import './Login.css';
import { Container } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login successful:', formData);
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
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
              <i className="ri-ship-line"></i>
            </div>
          </div>

          <div className="login-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper has-icon">
                <span className="input-icon"><i className="ri-mail-line"></i></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  autoComplete="email"
                  className={`${errors.email ? 'error' : ''} form-control py-2`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="form-options mt-0">
                <label htmlFor="password" className="mb-0">Password</label>
                <a href="forgot-password" className="forgot-password">Forgot password?</a>
              </div>
              <div className="input-wrapper has-icon">
                <span className="input-icon"><i className="ri-lock-2-line"></i></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`${errors.password ? 'error' : ''} form-control py-2`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">
                  <span className="spinner"></span>
                  Signing in...
                </span>
              ) : (
                <>Sign in <i className="ri-arrow-right-line ms-1"></i></>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <a href="signup">Create one</a></p>
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

export default Login;
