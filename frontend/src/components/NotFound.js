import { FZF } from '../assets/icons/icons';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found first">
      <div>
        <h1>Oops!</h1>
        <p className="not-found-para">
          The page you are looking for doesn't exist.
        </p>
        <button onClick={navigate('/')}>Go back</button>
      </div>
      <div>
        <h1 className="fzf">404</h1>
        <p className="fzf-para">Page not found</p>
        <FZF />
      </div>
    </div>
  );
}
export default NotFound;
