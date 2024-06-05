import { Outlet, Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import TaskList from './components/TaskList'
import UpdateTaskForm from './components/UpdateTaskForm'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import NotFound from './components/NotFound'
import UpdateProfile from './components/UpdateProfile'
import Layout from './components/Layout'
import { useGlobalContext } from './features/TaskContext'
import('./index.css')

function App() {
  const { user, task } = useGlobalContext()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route index element={<Welcome />} />
        <Route path="tasks" element={<Outlet />}>
          <Route index element={<TaskList />} />
          <Route path={task?._id} element={<UpdateTaskForm />} />
          <Route path="new" element={<Form />} />
        </Route>
        <Route path={user?.username} element={<UpdateProfile />} />
      </Route>
    </Routes>
  )
}

export default App
