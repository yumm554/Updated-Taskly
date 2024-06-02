import { Outlet, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import TaskList from './components/TaskList';
import UpdateTaskForm from './components/UpdateTaskForm';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import UpdateLogin from './components/UpdateLogin';
import Layout from './components/Layout';
import { useGlobalContext } from './features/TaskContext';
import('./index.css');

function App() {
  const { user, task } = useGlobalContext();
  const username = user?.username;
  const taskId = task?._id;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route index element={<Welcome />} />
        <Route path="tasks" element={<Outlet />}>
          <Route index element={<TaskList />} />
          <Route path={taskId} element={<UpdateTaskForm />} />
          <Route path="new" element={<Form />} />
        </Route>
        <Route path={username} element={<UpdateLogin />} />
      </Route>
    </Routes>
  );
}

export default App;
