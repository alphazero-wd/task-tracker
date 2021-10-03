import moment from 'moment';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../reducers/tasks';
const Task = ({
  _id,
  name,
  isCompleted,
  isImportant,
  date,
  editName,
  setAlert,
}) => {
  const dispatch = useDispatch();

  const toggleImportant = () => {
    dispatch(updateTask({ _id, isImportant: !isImportant }));
  };

  const toggleComplete = () => {
    dispatch(updateTask({ _id, isCompleted: !isCompleted }));
  };

  return (
    <>
      <li
        className={`list-group-item d-flex justify-content-between align-items-center text-secondary bg-${
          isCompleted ? 'primary bg-opacity-10' : 'white'
        }`}
      >
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            checked={isCompleted}
            className="form-check-input"
            onChange={() => toggleComplete()}
          />
          <div className="ms-3">{name}</div>
        </div>
        <div className="text-center d-none d-md-block">
          {moment(date).format('ddd, MMM D YYYY, h:mm a')}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn me-2 text-secondary"
            onClick={() => toggleImportant()}
          >
            <i className={`bi bi-star${isImportant ? '-fill' : ''}`}></i>
          </button>
          <button
            className="btn me-2 text-secondary"
            data-bs-target="#deleteModal"
            data-bs-toggle="modal"
          >
            <i className="bi bi-trash"></i>
          </button>
          <button
            className="btn me-2 text-secondary"
            onClick={() => editName(_id)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
      </li>
      <Modal id={_id} setAlert={setAlert} />
    </>
  );
};

export default Task;
