import axios from 'axios';

export const createLogin = async (data) => {
  return await axios.post('http://localhost:3001/api/v1/login', data);
};

export const getLogin = async (data) => {
  const { username } = data;
  return await axios.post(
    `http://localhost:3001/api/v1/login/${username}`,
    data
  );
};

export const updateLogin = async (username, data) => {
  return await axios.patch(
    `http://localhost:3001/api/v1/login/${username}`,
    data
  );
};
