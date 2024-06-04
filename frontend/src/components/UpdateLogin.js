import { useEffect, useState } from 'react'
import { updateProfile } from '../handlers/authHandler'
import { useGlobalContext } from '../features/TaskContext'

function UpdateLogin() {
  const { user, setUser } = useGlobalContext()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [displayError, setDisplayError] = useState('An error has occurred')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user?.username || '')
      setEmail(user?.email || '')
      setPassword('')
    }
  }, [user])

  return (
    <div>
      {!user ? (
        <p>This page can't access without login</p>
      ) : (
        <div>
          <h1 className="login-main-heading">Profile</h1>
          <form
            className="login-form"
            onSubmit={(e) => {
              if (!name && !password) {
                e.preventDefault()
                return
              }
              setIsError(false)
              setIsSuccess(false)
              setIsLoading(true)
              updateProfile(user?.username, {
                username: name,
                password: password,
              })
                .then((resp) => {
                  console.log({ resp })
                  localStorage.setItem('user', JSON.stringify(resp?.data))
                  setUser(resp?.data)
                  setIsSuccess(true)
                  setIsLoading(false)
                })
                .catch((err) => {
                  console.log('err: ', err)
                  setDisplayError(err?.response?.data)
                  setIsLoading(false)
                  setIsError(true)
                })
            }}
          >
            <label htmlFor="name"> Username -</label>
            <br />
            <input
              className="login-input name"
              id="name"
              name="name"
              type="text"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="email"> Email -</label>
            <br />
            <input
              className="login-input name"
              id="email"
              name="email"
              type="email"
              placeholder="email"
              disabled
              value={email}
            />
            <br />
            <label htmlFor="password">Password -</label>
            <br />
            <input
              className="login-input name"
              id="password"
              name="password"
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div className="signup-loading-error-div">
              <button className="login-button" type="submit">
                Update
              </button>
              {isLoading && <div className="loader"></div>}
              {isSuccess && (
                <p className="success-added">Update, successfully</p>
              )}
              {isError && (
                <p className="error">
                  {displayError || 'An error has occurred'}
                </p>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
export default UpdateLogin
