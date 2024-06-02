import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useGlobalContext } from '../features/TaskContext';

function Layout() {
  const { user, setMenu } = useGlobalContext();

  return (
    <div className="layout">
      <Header currentUser={user} />
      <div onClick={() => setMenu(false)}>
        <Outlet />
      </div>
    </div>
  );
}
export default Layout;
