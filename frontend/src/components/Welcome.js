import { Link } from 'react-router-dom';
import '../assets/css/welcome.css';
import { ReactComponent as ChevronRight } from '../assets/images/chevron-right.svg';
import { useGlobalContext } from '../features/TaskContext';

function Welcome() {
  const { user } = useGlobalContext();

  return (
    <div className="welcome-div">
      <div className="body-main">
        <div className="body-content">
          <h1 className="body-main-heading">
            {user ? `Hello ${user?.username}!` : 'Manage Tasks Taskly'}
          </h1>
          <p className="body-main-para">
            A Task management app for real time users with CRUD operations and
            login signup feautures.
          </p>
        </div>
        <div className="body-main-buttons">
          <Link to={user ? '/tasks/new' : '/login'}>
            <button className="body-main-button">
              {user ? 'Create Task' : 'Get Started'} <ChevronRight />
            </button>
          </Link>
          <Link to="https://github.com/yumm554/Taskly-MERN-App" target="_blank">
            <button className="transparent-btn">Learn more</button>
          </Link>
        </div>
        <div className="body-main-image">
          <img src={require('../assets/images/main.png')} />
        </div>
      </div>
    </div>
  );
}
export default Welcome;
