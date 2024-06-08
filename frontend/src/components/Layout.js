import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useGlobalContext } from '../features/TaskContext';
import { useEffect } from 'react';

function Layout() {
  const { setMenu } = useGlobalContext();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const taskUrl =
    location.pathname === '/tasks' ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

  useEffect(() => {
    window.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-container')) setMenu(false);
    });
  }, []);

  return (
    <div
      className={`layout ${
        isHomePage ? 'layout-front' : `layout-all ${taskUrl ? '' : 'forms'} `
      }`}
    >
      <div className="layout-wrapper">
        <Header />
        <div className="layout-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
