import axios from 'axios';

export const accessAllTasks = async (id) => {
  const allTasks = await axios.get(
    `http://localhost:3001/api/v1/tasks/all/${id}`
  );
  return allTasks.data;
};

export const createTask = async (data) => {
  return await axios.post('http://localhost:3001/api/v1/tasks/', data);
};

export const getTask = async (id) => {
  return await axios.get(`http://localhost:3001/api/v1/tasks/${id}`);
};

export const updateTask = async (id, data) => {
  const allTasks = await axios.patch(
    `http://localhost:3001/api/v1/tasks/${id}`,
    data
  );
  return allTasks.data;
};

export const deleteTask = async (id) => {
  return await axios.delete(`http://localhost:3001/api/v1/tasks/${id}`);
};
