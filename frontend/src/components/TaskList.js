import { useNavigate } from 'react-router-dom';
import { Plus } from '../assets/icons/icons';
import { accessAllTasks } from '../handlers/tasksHandler';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../features/TaskContext';
import GetTaskList from './GetTaskList';

function TaskList() {
  const { user, getAgain, setGetAgain, welcome, setWelcome } =
    useGlobalContext();

  useEffect(() => {
    if (!welcome) setWelcome(true);
    setGetAgain(!getAgain);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [taskData, setTaskData] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (user)
      accessAllTasks(user?.username)
        .then((resp) => {
          setTaskData(resp?.sort((a, b) => a.completed - b.completed));
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
        });
  }, [getAgain]);

  useEffect(() => {
    setCounter(taskData?.filter((task) => task.completed)?.length || 0);
  }, [taskData]);

  const navigate = useNavigate();

  return (
    <div>
      {!user ? (
        <p>This page can't access without login</p>
      ) : (
        <div className="main-container">
          <div className="task-total-main">
            <p>Today</p>
            <h2>
              {counter}/{taskData?.length || 0} tasks
            </h2>
          </div>
          <div>
            <h2 className="task-list-heading">TaskList</h2>
            {isLoading ? (
              <div class="loader"></div>
            ) : isError ? (
              <p className="error">An error has occured!</p>
            ) : (
              <div className="task-list">
                <GetTaskList data={taskData} />
              </div>
            )}

            <div className="add-new-button-div new-task">
              <button
                className="add-new-button"
                onClick={() => {
                  navigate('new');
                }}
              >
                <Plus />
                New task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
