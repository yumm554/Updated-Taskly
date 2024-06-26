import '../assets/css/tasks.css';
import { Link, useNavigate } from 'react-router-dom';
import { accessAllTasks } from '../handlers/tasksHandler';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../features/TaskContext';
import { ReactComponent as ChevronRight } from '../assets/images/chevron-right.svg';
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
        navigate('/login')
      ) : (
        <div className="main-container">
          <div className="cta-container">
            <Link to="new">
              <button className="task-create-button">
                Create Task <ChevronRight />
              </button>
            </Link>
            <h2 className="task-user-heading">
              {user ? `Hello ${user?.username}!` : ''}
            </h2>
          </div>
          <div className="task-total-main">
            <p className="tasks-todo">
              Todo <span>*</span>
            </p>
            <b className="task-count">
              {counter}/{taskData?.length || 0} tasks
            </b>
          </div>
          <div>
            {isLoading ? (
              <div class="loader"></div>
            ) : isError ? (
              <p className="error">An error has occured!</p>
            ) : (
              <div className="task-list">
                <GetTaskList data={taskData} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
