import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useGlobalContext } from '../features/TaskContext';

function Layout() {
  const { user, setMenu } = useGlobalContext();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`layout ${isHomePage ? 'layout-front' : 'layout-all'}`}>
      <div className="layout-wrapper">
        <Header />
        <div className="layout-body" onClick={() => setMenu(false)}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
