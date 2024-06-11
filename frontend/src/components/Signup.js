import React from 'react';
import { useEffect, useState } from 'react';
import { signup } from '../handlers/authHandler';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../features/TaskContext';

import '../assets/css/signup.css';

function Signup() {
  const { user, loginBtn, setLoginBtn } = useGlobalContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayError, setDisplayError] = useState('An error has occurred');
  const [isSuccess, setIsSuccess] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState('Success');

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    setLoginBtn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    if (password === confirmPassword) {
      signup({ username, email, password })
        .then((resp) => {
          setIsSuccess(true);
          setDisplaySuccess(resp.data);
          setTimeout(() => {
            setIsLoading(false);
            navigate('/login');
          }, 3000);
        })
        .catch((err) => {
          console.log({ err });
          setDisplayError(err.response?.data);
          setIsLoading(false);
          setIsError(true);
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        });
    } else {
      setDisplayError('Password does not mach');
      setIsError(true);
      setIsLoading(false);
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="signup-user-main-container">
      <div className="signup-main-container">
        <div className="signup-form-container">
          <div className="signup-form-wrapper">
            <h1 className="signup-main-heading">Signup</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="username">username</label>
              <br />
              <input
                className="signup-input name"
                id="username"
                name="username"
                type="text"
                pattern="\w{2,10}"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <p className="validation-error">
                Username must be between 2-10 characters, can contain
                alphanumeric and underscore only.
              </p>
              <label htmlFor="email">email</label>
              <br />
              <input
                className="signup-input name"
                id="email"
                name="email"
                type="email"
                placeholder="email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />

              <label htmlFor="password">password</label>
              <br />
              <input
                className="signup-input password"
                id="password"
                // name="password"
                type="password"
                placeholder="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                // autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="validation-error">
                must contain 8 or more characters that are of at least one
                number, and one uppercase and lowercase letter
              </p>
              <label htmlFor="confirm-password">confirm password</label>
              <br />
              <input
                className="signup-input password"
                id="confirm-password"
                // name="confirm-password"
                type="password"
                placeholder="confirm password"
                // autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <br />
              <div className="signup-loading-error-div">
                <button className="signup-button" type="submit">
                  Create Account
                </button>
                {isLoading && <div className="loader"></div>}
                {isError && (
                  <p className="error">
                    {displayError || 'An error has occurred'}
                  </p>
                )}
                {isSuccess && <p className="success-added">{displaySuccess}</p>}
              </div>
            </form>
            <div className="no-account-container">
              <p className="no-account-para">
                Already have an account:
                <Link to="/login">
                  <span className="login-reflink">Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="signup-banner-container">
          <h3 className="signup-banner-content">
            A simple and user-friendly task management tool!
          </h3>
          <p className="signup-banner-para">
            Monitor and organize your tasks, mark them as completed, remove
            tasks, and make updates to existing tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
