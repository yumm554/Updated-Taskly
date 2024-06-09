import React from 'react';
import '../assets/css/login.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../handlers/authHandler';
import { useGlobalContext } from '../features/TaskContext';

function Login() {
  const { user, setUser, loginBtn, setLoginBtn } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayError, setDisplayError] = useState('An error has occurred');

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

  return (
    <div className="login-user-main-container">
      <div className="login-main-container">
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h2 className="login-main-heading">Login</h2>
            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                setIsError(false);
                setIsLoading(true);
                login({ email, password })
                  .then((resp) => {
                    localStorage.setItem('user', JSON.stringify(resp?.data));
                    setUser(resp?.data);
                    navigate(`/tasks`);
                  })
                  .catch((err) => {
                    setDisplayError(err?.response?.data);
                    setIsLoading(false);
                    setIsError(true);
                    if (err?.response?.data == 'Incorrect Password!') {
                      setPassword('');
                    } else {
                      setEmail('');
                      setPassword('');
                    }
                  });
              }}
            >
              <label htmlFor="email">email</label>
              <br />
              <input
                className="login-input name"
                data-testid="email-input-field"
                id="email"
                name="email"
                type="email"
                placeholder="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <label htmlFor="password">password </label>
              <br />
              <input
                className="login-input name"
                data-testid="password-input-field"
                id="password"
                name="password"
                type="password"
                placeholder="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <div className="login-loading-error-div">
                <button
                  className="login-button"
                  data-testid="login-submit-button"
                  type="submit"
                >
                  Login
                </button>
                {isLoading && <div className="loader"></div>}
                {isError && (
                  <p className="error">
                    {displayError || 'An error has occured'}
                  </p>
                )}
              </div>
            </form>

            <div className="no-account-container">
              <p className="no-account-para">
                {"Don't have an account?"}
                <Link to="/signup">
                  <span className="signup-reflink">Sign up</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="login-banner-container">
          <h3 className="login-banner-content">
            Task management app to manage your tasks taskly!
          </h3>
          <p className="login-banner-para">
            Monitor and organize your tasks, mark them as completed, remove
            tasks, and make updates to existing tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
