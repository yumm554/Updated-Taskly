import '../assets/css/updateTask.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../handlers/tasksHandler';
import { useGlobalContext } from '../features/TaskContext';
import { ReactComponent as Blocks } from '../assets/images/update-task-blocks.svg';

function UpdateTaskForm() {
  const { task, user } = useGlobalContext();
  const [name, setName] = useState(task?.name);
  const [completed, setCompleted] = useState(task?.completed);
  const [isSuccess, setIsSucces] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTask().catch((err) => setIsError(true));
  }, [isError]);

  return (
    <div className="updatetask-main">
      {!user ? (
        navigate('/login')
      ) : (
        <div className="updatetask-form-container">
          <h1 className="update-task-heading">Task</h1>
          {isError ? (
            <p className="error">An error has occured</p>
          ) : (
            <div>
              <form
                className="updatetask-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsError(false);
                  setIsSucces(false);
                  setIsLoading(true);
                  updateTask(task?._id, { name: name, completed: completed })
                    .then((resp) => {
                      setIsSucces(true);
                      setIsLoading(false);
                    })
                    .catch((err) => {
                      setIsError(true);
                      setIsLoading(false);
                    });
                }}
              >
                <label htmlFor="id">- id</label>
                <br />
                <input
                  className="task-id-input"
                  name="id"
                  id="id"
                  value={task?._id}
                  disabled
                />
                <br />
                <label htmlFor="task-name">- title</label>
                <br />
                <textarea
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
                  <label htmlFor="task-completed">Completed -</label>
                </div>
                <div className="update-new-button-div form">
                  <button className="update-new-button form" type="submit">
                    Save
                  </button>
                  {isLoading && <div className="loader"></div>}
                  {isSuccess && (
                    <p className="succes-added">Saved, succesfullly</p>
                  )}
                  {isError && <p className="error">An error has occured</p>}
                </div>
              </form>
              <div className="update-task-blocks main">
                <Blocks />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default UpdateTaskForm;
