import Task from '../components/Task';

function GetTaskList(props) {
  const { data } = props;
  return (
    <div>
      {data.length < 1 ? (
        <p>There are no tasks in your list</p>
      ) : (
        data.map((task) => {
          return <Task key={task._id} {...task} />;
        })
      )}
    </div>
  );
}
export default GetTaskList;
