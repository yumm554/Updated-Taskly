import { useEffect, useState } from 'react';
import { User } from '../assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { getLogin } from '../handlers/loginHandler';
import { useGlobalContext } from '../features/TaskContext';

function Login() {
  const { user, setUser, loginBtn, setLoginBtn } = useGlobalContext();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayError, setDisplayError] = useState('An error has occured');

  const navigate = useNavigate();
  useEffect(() => {
    if (!loginBtn) setLoginBtn(true);
  }, []);
  return (
    <div>
      {user ? (
        <p>You are already logged in</p>
      ) : (
        <div>
          <h1 className="login-main-heading">Login</h1>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              setIsError(false);
              setIsLoading(true);
              getLogin({ username: name, password: password })
                .then((resp) => {
                  localStorage.setItem('user', JSON.stringify(resp?.data));
                  setUser(resp?.data);
                  navigate(`/tasks`);
                })
                .catch((err) => {
                  setDisplayError(err?.response?.data);
                  setIsLoading(false);
                  setIsError(true);
                });

              setName('');
              setPassword('');
            }}
          >
            <label htmlFor="name"> Username -</label>
            <br />
            <input
              className="login-input name"
              id="name"
              name="name"
              type="text"
              placeholder="username"
              value={name}
              autoComplete="username"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password">Password -</label>
            <br />
            <input
              className="login-input name"
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
            <div className="signup-loading-error-div">
              <button className="login-button" type="submit">
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
          <div>
            <p>
              Not have an account:
              <button
                className="signup-reflink"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </button>
            </p>
          </div>
          <div>
            <User />
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;
