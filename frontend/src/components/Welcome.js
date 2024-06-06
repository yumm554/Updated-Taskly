import { Link } from 'react-router-dom';
import '../assets/css/welcome.css';
import { ReactComponent as ChevronRight } from '../assets/images/chevron-right.svg';
import { useGlobalContext } from '../features/TaskContext';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className="welcome-div">
      <div className="body-main">
        <div className="body-content">
          <h1 className="body-main-heading">
            {user ? `Hello ${user?.username}!` : 'Manage Tasks Using Taskly'}
          </h1>
          <p className="body-main-para">
            A Task management app for real time users with CRUD operations and
            login signup features.
          </p>
        </div>
        <div className="body-main-buttons">
          <button
            className="body-main-button"
            onClick={() => navigate(user ? '/tasks/new' : '/login')}
          >
            {user ? 'Create Task' : 'Get Started'} <ChevronRight />
          </button>
          <Link to="https://github.com/yumm554/Taskly-MERN-App" target="_blank">
            <button className="transparent-btn">Learn more</button>
          </Link>
        </div>
        <div className="body-main-image"></div>
      </div>
    </div>
  );
}
export default Welcome;
