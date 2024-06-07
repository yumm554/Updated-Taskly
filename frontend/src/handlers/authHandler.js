import axios from 'axios';

export const signup = async (data) => {
  return await axios.post('http://localhost:3001/api/v1/signup', data);
};

export const login = async (data) => {
  return await axios.post(`http://localhost:3001/api/v1/login/`, data);
};

export const updateProfile = async (id, data) => {
  return await axios.patch(
    `http://localhost:3001/api/v1/updateProfile/${id}`,
    data
  );
};

export const deleteProfile = async (id) => {
  return await axios.delete(`http://localhost:3001/api/v1/deleteProfile/${id}`);
};
