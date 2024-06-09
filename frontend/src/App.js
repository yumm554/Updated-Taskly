import { Outlet, Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import UpdateTask from './components/UpdateTask'
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
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route index element={<Welcome />} />
        <Route path="tasks" element={<Outlet />}>
          <Route index element={<TaskList />} />
          <Route path=":id" element={<UpdateTask />} />
          <Route path="new" element={<AddTask />} />
        </Route>
        <Route path={user?.username} element={<UpdateProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
