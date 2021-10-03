import { useSelector } from 'react-redux';

const TaskForm = ({ onChange, onSubmit, value }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <form className="d-flex align-items-center my-4" onSubmit={onSubmit}>
      <button type="submit" className="btn fs-4">
        <i className="bi bi-plus-circle text-secondary"></i>
      </button>
      <input
        type="text"
        name="taskValue"
        onChange={onChange}
        value={value.taskValue}
        className="form-control ms-3"
        disabled={!user ? true : false}
        placeholder={`${
          user ? 'Add a Task' : 'Sign Up or Sign In to Add a Task'
        }`}
      />
    </form>
  );
};
export default TaskForm;
