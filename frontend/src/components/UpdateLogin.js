import { useEffect, useState } from 'react';
import { updateLogin } from '../handlers/loginHandler';
import { useGlobalContext } from '../features/TaskContext';

function UpdateLogin() {
  const { user, setUser } = useGlobalContext();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayError, setDisplayError] = useState('An error has occured');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user?.username || '');
      setPassword(user?.password || '');
    }
  }, [user]);

  return (
    <div>
      {!user ? (
        <p>This page can't access without login</p>
      ) : (
        <div>
          <h1 className="login-main-heading">Profile</h1>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              setIsError(false);
              setIsSuccess(false);
              setIsLoading(true);
              updateLogin(user?.username, {
                username: name,
                password: password,
              })
                .then((resp) => {
                  localStorage.setItem('user', JSON.stringify(resp?.data));
                  setUser(resp?.data);
                  setIsSuccess(true);
                  setIsLoading(false);
                })
                .catch((err) => {
                  console.log('err: ', err);
                  setDisplayError(err?.response?.data);
                  setIsLoading(false);
                  setIsError(true);
                });
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
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="password">Password -</label>
            <br />
            <input
              className="login-input name"
              id="password"
              name="password"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="signup-loading-error-div">
              <button className="login-button" type="submit">
                Update
              </button>
              {isLoading && <div className="loader"></div>}
              {isSuccess && <p className="succes-added">Added, succesfullly</p>}
              {isError && (
                <p className="error">
                  {displayError || 'An error has occured'}
                </p>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default UpdateLogin;
