import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../features/TaskContext';

function Menu() {
  const { user: currentUser, setUser } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <div className="menu">
      <ul>
        <li>
          <button
            onClick={() => {
              navigate(`/${currentUser.username}`);
            }}
            className="transparent-btn"
          >
            Profile Settings
          </button>
        </li>
        <hr />
        <li>
          <button
            onClick={() => {
              localStorage.clear();
              setUser(null);
              navigate('/login');
            }}
            className="transparent-btn"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
export default Menu;
