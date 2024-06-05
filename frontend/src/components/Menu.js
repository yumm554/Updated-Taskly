import '../assets/css/menu.css';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../features/TaskContext';
import { ReactComponent as Settings } from '../assets/images/settings.svg';
import { ReactComponent as Logout } from '../assets/images/logout.svg';

function Menu() {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <div className="menu">
      <ul>
        <h5 className="menu-heading">Menu</h5>
        <hr />
        <li>
          <a
            onClick={() => {
              navigate(`/${user?.username}`);
            }}
            className="header-nav-link"
          >
            <Settings /> Profile Settings
          </a>
        </li>
        <hr />
        <li>
          <a
            onClick={() => {
              localStorage.clear();
              setUser(null);
              navigate('/login');
            }}
            className="header-nav-link"
          >
            <Logout /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Menu;
