import { useEffect, useState } from 'react';
import { createTask } from '../handlers/tasksHandler';
import { useGlobalContext } from '../features/TaskContext';

function Form() {
  const [isSuccess, setIsSucces] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user } = useGlobalContext();
  return (
    <div>
      {!user ? (
        <p>This page can't access without login</p>
      ) : (
        <div className="form-main-div">
          <h1 className="add-task-heading">Add new task</h1>
          <form
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
            <label htmlFor="task-name">Title -</label>
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
            <div className="add-new-button-div form">
              <button className="add-new-button form" type="submit">
                Add
              </button>
              {isLoading && <div className="loader"></div>}
              {isSuccess && <p className="succes-added">Added, succesfullly</p>}
              {isError && <p className="error">An error has occured</p>}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default Form;
