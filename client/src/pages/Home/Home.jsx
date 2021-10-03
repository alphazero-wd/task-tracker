import DateTime from '../../components/Main/DateTime';
import Options from '../../components/Main/Options';
import Tasks from '../../components/Tasks/Tasks';
import TaskForm from '../../components/Main/TaskForm';
import Empty from '../../components/Extra/Empty';
import Alert from '../../components/Main/Alert';
import Loading from '../../components/Extra/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { createTask, updateTask, getTasks } from '../../reducers/tasks';

const Home = ({ value, setValue, onChange, alert, setAlert }) => {
  const { loading, tasks, queriedTasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({
    isEdit: false,
    editId: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!value.taskValue) {
      setAlert({
        message: 'Task Must Be Provided!',
        color: 'danger',
        isShown: true,
      });
    } else if (value.taskValue && edit.isEdit) {
      dispatch(updateTask({ _id: edit.editId, name: value.taskValue }));
      setAlert({
        message: 'Task Updated!',
        color: 'success',
        isShown: true,
      });
      setEdit({
        editId: '',
        isEdit: false,
      });
      setValue({ ...value, taskValue: '' });
    } else {
      const newTask = {
        name: value.taskValue,
      };
      setAlert({
        message: 'Task Created!',
        color: 'success',
        isShown: true,
      });
      dispatch(createTask({ ...newTask, creator: user?.profile?.name }));
      setValue({ ...value, taskValue: '' });
    }
  };

  const editName = (id) => {
    const task = tasks.find((task) => task._id === id);
    setEdit({
      isEdit: true,
      editId: id,
    });

    setValue({ ...value, taskValue: task.name });
  };

  useEffect(() => dispatch(getTasks()), [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="my-5">
      <div className="container-fluid px-lg-5 px-3">
        <div className="d-md-flex justify-content-between align-items-center">
          <DateTime />
          <Options onChange={onChange} />
        </div>
        {alert.isShown && <Alert alert={alert} />}
        <TaskForm onSubmit={onSubmit} onChange={onChange} value={value} />
        {queriedTasks.length > 0 ? (
          <Tasks editName={editName} setAlert={setAlert} />
        ) : (
          <Empty />
        )}
      </div>
    </main>
  );
};

export default Home;
