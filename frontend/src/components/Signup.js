import { useState } from 'react';
import { User } from '../assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { createLogin } from '../handlers/loginHandler';
import { useGlobalContext } from '../features/TaskContext';

function Signup() {
  const { user } = useGlobalContext();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayError, setDisplayError] = useState('An error has occured');
  const [isSuccess, setIsSuccess] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState('Success');

  const navigate = useNavigate();
  return (
    <div>
      {user ? (
        <p>You are already logged in</p>
      ) : (
        <div>
          <h1 className="login-main-heading">Signup</h1>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              setIsSuccess(false);
              setIsError(false);
              setIsLoading(true);
              if (password === confirmPassword) {
                createLogin({ username: name, password: password })
                  .then((resp) => {
                    setIsLoading(false);
                    setIsSuccess(true);
                    setDisplaySuccess(resp.data);
                  })
                  .catch((err) => {
                    setDisplayError(err.response?.data);
                    setIsLoading(false);
                    setIsError(true);
                  });
              }
              setName('');
              setPassword('');
              setConfirmPassword('');
            }}
          >
            <label htmlFor="name"> Userame -</label>
            <br />
            <input
              className="login-input name"
              id="name"
              name="name"
              type="text"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password">Password -</label>
            <br />
            <input
              className="login-input password"
              id="password"
              name="password"
              type="password"
              placeholder="create password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <label htmlFor="confirm-password">Confirm password -</label>
            <br />
            <input
              className="login-input password"
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="confirm password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <br />
            <div className="signup-loading-error-div">
              <button className="login-button" type="submit">
                Signup
              </button>
              {isLoading && <div className="loader"></div>}
              {isError && <p className="error">{displayError}</p>}
              {isSuccess && <p className="succes-added">{displaySuccess}</p>}
            </div>
          </form>
          <div>
            <p>
              Already have an account:
              <button
                className="signup-reflink"
                onClick={() => navigate('/login')}
              >
                Login
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
export default Signup;
