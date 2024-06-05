import '../assets/css/signup.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../handlers/authHandler'
import { useGlobalContext } from '../features/TaskContext'

function Signup() {
  const { user, setUser, loginBtn, setLoginBtn } = useGlobalContext()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [displayError, setDisplayError] = useState('An error has occurred')
  const [isSuccess, setIsSuccess] = useState(false)
  const [displaySuccess, setDisplaySuccess] = useState('Success')

  const navigate = useNavigate()
  useEffect(() => {
    if (!loginBtn) setLoginBtn(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (password === confirmPassword) {
      signup({ username: name, email, password })
        .then((resp) => {
          setIsSuccess(true)
          setDisplaySuccess(resp.data)
          setTimeout(() => {
            setIsLoading(false)
            navigate('/login')
          }, 3000)
        })
        .catch((err) => {
          setDisplayError(err.response?.data)
          setIsLoading(false)
          setIsError(true)
          setName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
        })
    } else {
      setDisplayError('Password does not mach')
      setIsLoading(false)
      setPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <div>
      {user ? (
        navigate('/')
      ) : (
        <div className="signup-main-container">
          <div className="signup-form-container">
            <h1 className="signup-main-heading">Signup</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Username -</label>
              <br />
              <input
                className="signup-input name"
                id="name"
                name="name"
                type="text"
                placeholder="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <label htmlFor="email">Email -</label>
              <br />
              <input
                className="signup-input name"
                id="email"
                name="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <label htmlFor="password">Password -</label>
              <br />
              <input
                className="signup-input password"
                id="password"
                name="password"
                type="password"
                placeholder="create password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <label htmlFor="confirm-password">Confirm password -</label>
              <br />
              <input
                className="signup-input password"
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="confirm password"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <br />
              <div className="signup-loading-error-div">
                <button className="signup-button" type="submit">
                  Signup
                </button>
                {isLoading && <div className="loader"></div>}
                {isError && <p className="error">{displayError}</p>}
                {isSuccess && <p className="success-added">{displaySuccess}</p>}
              </div>
            </form>
            <div className="no-account-container">
              <p className="no-account-para">
                Already have an account:
                <Link to="/login">
                  {setLoginBtn(true)}
                  <div className="login-reflink">Login</div>
                </Link>
              </p>
            </div>
          </div>
          <div className="signup-banner-container">
            <h3 className="signup-banner-content">
              A simple and user-friendly task management tool!
            </h3>
            <p className="signup-banner-para">
              Monitor and organize your tasks, mark them as completed, remove
              tasks, and make updates to existing tasks.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default Signup
