import '../assets/css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Avatar } from '../assets/images/user.svg';
import { useEffect } from 'react';
import Menu from './Menu';
import { useGlobalContext } from '../features/TaskContext';
function Header() {
  const { welcome, setWelcome, menu, setMenu, loginBtn, setLoginBtn, user } =
    useGlobalContext();

  const navigate = useNavigate();
  useEffect(() => {
    setWelcome(false);
    setLoginBtn(false);
  }, [navigate]);

  return (
    <div className={loginBtn ? 'layout-absolute-header' : 'layout-header'}>
      <header className="task-manager-header">
        <div className="header-main">
          <Link to="/">
            <div className="header-container">
              <div className="header-logo-container">t</div>
              <h1 className="header-main-heading">Taskly</h1>
            </div>
          </Link>
          {user ? (
            <div className="user-details-div">
              {welcome ? (
                ''
              ) : (
                <button
                  className="header-button"
                  onClick={() => navigate(`/tasks`)}
                >
                  Tasks
                </button>
              )}

              <nav className="nav-container" onClick={() => setMenu(!menu)}>
                <Avatar />
              </nav>
              {menu && <Menu />}
            </div>
          ) : (
            <div>
              {loginBtn ? (
                <Link
                  to="https://github.com/yumm554/Taskly-MERN-App"
                  target="_blank"
                >
                  <button className="learn-more-button">Learn more</button>
                </Link>
              ) : (
                <button
                  className="header-button"
                  onClick={() => navigate('/login')}
                >
                  User Login
                </button>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
export default Header;
