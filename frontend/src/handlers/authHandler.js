import axios from 'axios'

export const signup = async (data) => {
  return await axios.post('http://localhost:3001/api/v1/signup', data)
}

export const login = async (data) => {
  return await axios.post(`http://localhost:3001/api/v1/login/`, data)
}

export const updateLogin = async (username, data) => {
  return await axios.patch(
    `http://localhost:3001/api/v1/login/${username}`,
    data
  )
}
