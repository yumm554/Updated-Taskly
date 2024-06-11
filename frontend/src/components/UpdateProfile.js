import React from 'react';
import '../assets/css/updateLogin.css';
import { useEffect, useState } from 'react';
import { updateProfile, deleteProfile } from '../handlers/authHandler';
import { useGlobalContext } from '../features/TaskContext';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
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
  }, [navigate]);

  return (
    <div className="update-login-main-container">
      <div className="profile-container">
        <div className="basic-details-container">
          <h2 class="basic-details-heading">Basic Details</h2>
          <form
            className="update-login-form"
            onSubmit={(e) => {
              e.preventDefault();
              setIsDoP(false);
              setIsError(false);
              setIsSuccess(false);
              setIsLoading(true);
              updateProfile(user?._id, {
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
            <label htmlFor="name">
              username <span className="red-star">*</span>
            </label>
            <br />
            <input
              className="update-login-input name"
              required
              id="name"
              name="name"
              type="text"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="email">email </label>
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
            <label htmlFor="password">password</label>
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
                <p className="success-added">Updated, successfully</p>
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
            <p className="delete-login-para">
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
                  deleteProfile(user?._id)
                    .then((resp) => {
                      setIsSuccess(true);
                      localStorage.clear();
                      setUser(null);
                      navigate('/login');
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
                Delete Account
              </button>
              {isDoP && isLoading && <div className="loader"></div>}
              {isDoP && isSuccess && (
                <p className="success-added">Profile Deleted, Successfully</p>
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
    </div>
  );
}
export default UpdateProfile;
