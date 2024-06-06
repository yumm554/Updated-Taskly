import '../assets/css/notFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found first">
        <div>
          <h1>Oops!</h1>
          <p className="not-found-para">
            The page you are looking for doesn't exist.
          </p>
          <button className="fzf-button" onClick={() => navigate('/')}>
            Go back
          </button>
        </div>
        <div>
          <h1 className="fzf">404</h1>
          <p className="fzf-para">Page not found</p>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
