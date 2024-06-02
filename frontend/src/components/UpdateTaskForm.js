import { useEffect, useState } from 'react';
import { getTask, updateTask } from '../handlers/tasksHandler';
import { useGlobalContext } from '../features/TaskContext';

function UpdateTaskForm() {
  const { task, user } = useGlobalContext();
  const [name, setName] = useState(task?.name);
  const [completed, setCompleted] = useState(task?.completed);
  const [isSuccess, setIsSucces] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTask().catch((err) => setIsError(true));
  }, [isError]);

  return (
    <div>
      {!user ? (
        <p>This page can't access without login</p>
      ) : (
        <div>
          <h1 className="add-task-heading">Task</h1>
          {isError ? (
            <p className="error">An error has occured</p>
          ) : (
            <div>
              <form
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
                <label htmlFor="id">id - </label>
                <br />
                <input
                  className="task-id-input"
                  name="id"
                  id="id"
                  value={task?._id}
                  disabled
                />
                <br />
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
                <label htmlFor="task-completed">Completed -</label>
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
                <div className="add-new-button-div form">
                  <button className="add-new-button form" type="submit">
                    Save
                  </button>
                  {isLoading && <div className="loader"></div>}
                  {isSuccess && (
                    <p className="succes-added">Saved, succesfullly</p>
                  )}
                  {isError && <p className="error">An error has occured</p>}
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default UpdateTaskForm;
