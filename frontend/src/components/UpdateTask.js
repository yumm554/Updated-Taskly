import React from 'react';
import '../assets/css/updateTask.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../handlers/tasksHandler';
import { useGlobalContext } from '../features/TaskContext';
import { UpdateTaskSvg } from '../assets/icons/icons';
import { useParams } from 'react-router-dom';

function UpdateTask() {
  const { task, setTask, user } = useGlobalContext();
  const [name, setName] = useState(task?.name);
  const [completed, setCompleted] = useState(task?.completed);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    getTask(id)
      .then((resp) => {
        setTask(resp?.data);
        setName(resp?.data?.name);
        setCompleted(resp?.data?.completed);
      })
      .catch((err) => {
        console.log(err);
        setMsg(err?.response?.data);
        setIsError(true);
      });
  }, []);

  return (
    <div className="updatetask-main">
      <div className="updatetask-form-container">
        <h2 className="update-task-heading">Task</h2>
        <div>
          <form
            className="updatetask-form"
            onSubmit={(e) => {
              e.preventDefault();
              setIsError(false);
              setIsSuccess(false);
              setIsLoading(true);
              updateTask(id, { name: name, completed: completed })
                .then((resp) => {
                  setMsg(resp?.data);
                  setIsSuccess(true);
                  setIsLoading(false);
                })
                .catch((err) => {
                  setMsg(err?.response?.data);
                  setIsError(true);
                  setIsLoading(false);
                });
            }}
          >
            <label htmlFor="id">id</label>
            <br />
            <input
              className="task-id-input"
              name="id"
              id="id"
              value={id}
              disabled
            />
            <br />
            <label htmlFor="task-name">
              title <span className="red-star">*</span>
            </label>
            <br />
            <textarea
              className="task-name-input"
              required
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
            <div className="input-container">
              <input
                className="task-completed-input"
                id="task-completed"
                name="task-completed"
                type="checkbox"
                checked={completed}
                onChange={(e) => {
                  setCompleted(!completed);
                }}
              />
              <label htmlFor="task-completed">completed</label>
            </div>
            <div className="update-new-button-div form">
              <button className="update-new-button form" type="submit">
                Save
              </button>
              {isLoading && <div className="loader"></div>}
              {isSuccess && <p className="success-added">Saved, succesfully</p>}
              {isError && (
                <p className="error">{msg || 'An error has occurred'} </p>
              )}
            </div>
          </form>
          <div className="update-task-blocks main">
            <UpdateTaskSvg />
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateTask;
