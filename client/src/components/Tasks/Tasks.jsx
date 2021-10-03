import { useSelector } from 'react-redux';
import Task from './Task';
const Tasks = ({ editName, setAlert }) => {
  const { queriedTasks } = useSelector((state) => state.tasks);

  return (
    <ul className="list-group text-secondary list-group-flush">
      {queriedTasks.map((task) => (
        <Task
          setAlert={setAlert}
          key={task._id}
          {...task}
          editName={editName}
        />
      ))}
    </ul>
  );
};

export default Tasks;
