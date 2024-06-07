import { useState, createContext, useContext, useEffect } from 'react'

const GlobalContext = createContext()
export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
const TaskContext = ({ children }) => {
  const [task, setTask] = useState(null)
  const [user, setUser] = useState(null)
  const [getAgain, setGetAgain] = useState(null)
  const [welcome, setWelcome] = useState(null) //to not show task button in tasks page
  const [menu, setMenu] = useState(false)
  const [loginBtn, setLoginBtn] = useState(null) //to not show login button in login page

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    setUser(currentUser)
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        task: task,
        setTask: (task) => setTask(task),
        user: user,
        setUser: (user) => setUser(user),
        getAgain: getAgain,
        setGetAgain: (getAgain) => setGetAgain(getAgain),
        welcome: welcome,
        setWelcome: setWelcome,
        menu: menu,
        setMenu: (menu) => setMenu(menu),
        loginBtn: loginBtn,
        setLoginBtn: (loginBtn) => setLoginBtn(loginBtn),
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default TaskContext
