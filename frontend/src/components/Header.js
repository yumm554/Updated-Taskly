import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../assets/icons/icons';
import { useEffect } from 'react';
import Menu from './Menu';
import { useGlobalContext } from '../features/TaskContext';
function Header({ currentUser }) {
  const { welcome, setWelcome, menu, setMenu, loginBtn, setLoginBtn } =
    useGlobalContext();

  const navigate = useNavigate();
  useEffect(() => {
    setWelcome(false);
    setLoginBtn(false);
  }, [navigate]);

  return (
    <div>
      <header className="task-manager-header">
        <div className="header-main">
          <Link to="/">
            <h1 className="header-main-heading">Taskly</h1>
          </Link>
          {currentUser ? (
            <div className="user-details-div">
              {welcome ? (
                ''
              ) : (
                <button
                  className="header-login-button"
                  onClick={() => navigate(`/tasks`)}
                >
                  Tasks
                </button>
              )}

              <button
                className="transparent-btn"
                onClick={() => setMenu(!menu)}
              >
                <Avatar />
              </button>
              {menu && <Menu />}
            </div>
          ) : (
            <div>
              {loginBtn ? (
                ''
              ) : (
                <button className="" onClick={() => navigate('/login')}>
                  User Login
                </button>
              )}
            </div>
          )}
        </div>
        {currentUser ? (
          <div>
            <h2>Hello, {currentUser?.username}</h2>
          </div>
        ) : (
          ''
        )}
      </header>
    </div>
  );
}
export default Header;
