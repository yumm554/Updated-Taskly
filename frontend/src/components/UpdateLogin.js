import '../assets/css/updateLogin.css';
import { useEffect, useState } from 'react';
import { updateProfile } from '../handlers/authHandler';
import { useGlobalContext } from '../features/TaskContext';
import { useNavigate } from 'react-router-dom';

function UpdateLogin() {
  const { user, setUser } = useGlobalContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [displayError, setDisplayError] = useState('An error has occurred');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDoP, setIsDoP] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user?.username || '');
      setEmail(user?.email || '');
      setPassword('');
    }
  }, [user]);

  return (
    <div>
      {!user ? (
        navigate('/login')
      ) : (
        <div className="profile-container">
          <div className="basic-details-container">
            <h2 class="basic-details-heading">Basic Details</h2>
            <form
              className="update-login-form"
              onSubmit={(e) => {
                // if (!name && !password) {
                //   e.preventDefault();
                //   return;
                // }
                e.preventDefault();
                setIsDoP(false);
                setIsError(false);
                setIsSuccess(false);
                setIsLoading(true);
                updateProfile(user?.email, {
                  username: name,
                  password: password,
                })
                  .then((resp) => {
                    localStorage.setItem('user', JSON.stringify(resp?.data));
                    setUser(resp?.data);
                    setIsSuccess(true);
                    setIsLoading(false);
                    navigate(`/${resp?.data?.username}`);
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
                className="update-login-input name"
                id="name"
                name="name"
                type="text"
                placeholder="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <label htmlFor="email"> Email -</label>
              <br />
              <input
                className="update-login-input name"
                id="email"
                name="email"
                type="email"
                placeholder="email"
                disabled
                value={email}
              />
              <br />
              <label htmlFor="password">Password -</label>
              <br />
              <input
                className="update-login-input name"
                id="password"
                name="password"
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <div className="signup-loading-error-div">
                <button className="update-login-button" type="submit">
                  Update
                </button>
                {!isDoP && isLoading && <div className="loader"></div>}
                {!isDoP && isSuccess && (
                  <p className="success-added">Update, successfully</p>
                )}
                {!isDoP && isError && (
                  <p className="error">
                    {displayError || 'An error has occurred'}
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="delete-profile-container">
            <h2 class="basic-details-heading">Delete Profile</h2>
            <div className="delete-login-button-container">
              <p>
                Delete your profile and all your tasks. This is irreversible.
              </p>
              <div className="signup-loading-error-div">
                <button
                  className="delete-login-button"
                  onClick={(e) => {
                    setIsDoP(true);
                    setIsError(false);
                    setIsSuccess(false);
                    setIsLoading(true);
                    updateProfile(user?.email)
                      .then((resp) => {
                        setIsSuccess(true);
                        setIsLoading(false);
                        localStorage.clear();
                        setUser(null);
                        navigate('/login');
                      })
                      .catch((err) => {
                        console.log('err: ', err);
                        setDisplayError(err?.response?.data);
                        setIsLoading(false);
                        setIsError(true);
                      });
                  }}
                >
                  Deelete Account
                </button>
                {isDoP && isLoading && <div className="loader"></div>}
                {isDoP && isSuccess && (
                  <p className="success-added">Deleted, successfully</p>
                )}
                {isDoP && isError && (
                  <p className="error">
                    {displayError || 'An error has occurred'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default UpdateLogin;
