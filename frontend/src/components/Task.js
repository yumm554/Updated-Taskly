import { useGlobalContext } from '../features/TaskContext';
import { deleteTask } from '../handlers/tasksHandler';
import { Completed, Delete, Edit } from '../assets/icons/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Task(props) {
  const navigate = useNavigate();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const { setTask, getAgain, setGetAgain } = useGlobalContext();
  const { _id: taskId, name, completed } = props;
  return (
    <div className="lists">
      {completed ? (
        <div className="completed-div">
          <Completed />
          <p className="completed">{name}</p>
        </div>
      ) : (
        <p>{name}</p>
      )}
      <div className="list-icons">
        {(isDeleteLoading && <div className="loader"></div>) ||
          (isDeleteError && <p className="error">error</p>)}
        <div
          className="transparent-btn"
          onClick={() => {
            setIsDeleteLoading(true);
            setTask(props);
            navigate(`${taskId}`);
          }}
        >
          <Edit />
        </div>
        <div
          className="transparent-btn"
          onClick={() => {
            setIsDeleteLoading(true);
            deleteTask(taskId)
              .then((resp) => {
                setIsDeleteLoading(false);
                setGetAgain(!getAgain);
              })
              .catch((err) => {
                setIsDeleteError(true);
                setIsDeleteLoading(false);
              });
          }}
        >
          <Delete />
        </div>
      </div>
    </div>
  );
}
export default Task;
