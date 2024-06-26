import '../assets/css/addTask.css';
import { useState } from 'react';
import { createTask } from '../handlers/tasksHandler';
import { useGlobalContext } from '../features/TaskContext';
import { ReactComponent as Blocks } from '../assets/images/add-task-blocks.svg';

function Form() {
  const [isSuccess, setIsSucces] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user } = useGlobalContext();
  return (
    <div className="addtask-main">
      {!user ? (
        <p>This page can't access without login</p>
      ) : (
        <div className="addtask-form-container">
          <h1 className="add-task-heading">Add new task</h1>
          <form
            className="addtask-form"
            onSubmit={(e) => {
              e.preventDefault();
              setIsError(false);
              setIsSucces(false);
              setIsLoading(true);
              createTask({ name: name, username: user.username })
                .then((resp) => {
                  setIsSucces(true);
                  setIsLoading(false);
                })
                .catch((err) => {
                  setIsError(true);
                  setIsLoading(false);
                });
              setName('');
            }}
          >
            <div className="task-name-input-container">
              <label htmlFor="task-name">- title </label>
              <br />
              <input
                className="task-name-input"
                id="task-name"
                name="task-name"
                type="text"
                placeholder="Enter task name"
                value={name}
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
              {isSuccess && <p className="succes-added">Added, succesfullly</p>}
              {isError && <p className="error">An error has occured</p>}
            </div>
          </form>
          <div className="add-task-blocks main">
            <Blocks />
          </div>
        </div>
      )}
    </div>
  );
}
export default Form;
