import React from 'react';
import { useGlobalContext } from '../features/TaskContext';
import { deleteTask } from '../handlers/tasksHandler';
import { Completed, Delete, Edit } from '../assets/icons/icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Task(props) {
  const navigate = useNavigate();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [msg, setMsg] = useState('');
  const { setTask, getAgain, setGetAgain } = useGlobalContext();
  const { _id: taskId, name, completed, dateCreated } = props;
  const paraRef = useRef();

  useEffect(() => {
    if (paraRef.current.scrollHeight > 100)
      paraRef.current.classList.add('dots');
  }, []);
  return (
    <div className="lists">
      <div className="list-task-date">{dateCreated || 'N/A'}</div>
      <div className="list-task-content">
        <div className="list-task-name-wrapper">
          {completed ? (
            <div className="completed-div">
              <Completed />
              <p ref={paraRef} className={`list-name completed `}>
                {name}
              </p>
            </div>
          ) : (
            <p ref={paraRef} className={`list-name `}>
              {name}
            </p>
          )}
        </div>
        <div className="list-icons">
          {(isDeleteLoading && <div className="loader"></div>) ||
            (isDeleteError && <p className="error">{msg}</p>) ||
            (!isDeleteError && <p className="success-added">{msg}</p>)}
          <button
            className="no-btn"
            onClick={() => {
              setIsDeleteLoading(true);
              setTask(props);
              navigate(`${taskId}`);
            }}
            aria-label="edit task"
          >
            <Edit />
          </button>
          <button
            className="no-btn"
            onClick={() => {
              setIsDeleteLoading(true);
              deleteTask(taskId)
                .then((resp) => {
                  setMsg(resp?.data);
                  setIsDeleteLoading(false);
                  setGetAgain(!getAgain);
                })
                .catch((err) => {
                  setMsg(err?.response?.data || 'error');
                  setIsDeleteError(true);
                  setIsDeleteLoading(false);
                });
            }}
            aria-label="delete task"
          >
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Task;
