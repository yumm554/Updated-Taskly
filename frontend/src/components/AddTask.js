import React, { useEffect } from 'react';
import '../assets/css/addTask.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../handlers/tasksHandler';
import { useGlobalContext } from '../features/TaskContext';
import { AddTaskSvg } from '../assets/icons/icons';

function AddTask() {
  const [isSuccess, setIsSucces] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState('');
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      navigate('/login');
    }
  }, []);

  const handleSubmit = (e) => {
    const date = new Date();
    const formattedDate = date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
      .replace(/\//g, ' ');

    e.preventDefault();
    setIsError(false);
    setIsSucces(false);
    setIsLoading(true);
    createTask({
      name: name,
      id: user._id,
      dateCreated: formattedDate,
    })
      .then((resp) => {
        setMsg(resp?.data);
        setIsSucces(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setMsg(err?.response?.data);
        setIsError(true);
        setIsLoading(false);
      });
    setName('');
  };

  return (
    <div className="addtask-main">
      <div className="addtask-form-container">
        <h1 className="add-task-heading">Add new task</h1>
        <form className="addtask-form" onSubmit={handleSubmit}>
          <div className="task-name-input-container">
            <label htmlFor="task-name">
              title <span className="red-star">*</span>
            </label>
            <br />
            <textarea
              required
              className="task-name-input"
              id="task-name"
              name="task-name"
              type="text"
              placeholder="Enter task name"
              value={name}
              rows={4}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="add-new-button-div form">
            <button className="add-new-button form" type="submit">
              add
            </button>
            {isLoading && <div className="loader"></div>}
            {isSuccess && <p className="success-added">{msg}</p>}
            {isError && (
              <p className="error">{msg || 'An error has occurred'}</p>
            )}
          </div>
        </form>
        <div className="add-task-blocks main">
          <AddTaskSvg />
        </div>
      </div>
    </div>
  );
}
export default AddTask;
