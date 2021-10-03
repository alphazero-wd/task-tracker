import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Navbar from './components/Header/Navbar';
import Home from './pages/Home/Home';
import { queryTasks } from './reducers/tasks';
const App = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    searchValue: '',
    filterValue: '1',
    sortValue: '1',
    taskValue: '',
  });
  const [alert, setAlert] = useState({
    message: '',
    color: '',
    isShown: false,
  });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const hideAlert = setTimeout(
      () =>
        setAlert({
          message: '',
          color: '',
          isShown: false,
        }),
      3000
    );
    return () => clearTimeout(hideAlert);
  }, [alert]);
  useEffect(() => {
    dispatch(queryTasks(value));
  }, [value, tasks, dispatch]);

  return (
    <Router>
      <Navbar onChange={onChange} />
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            user ? (
              <Home
                onChange={onChange}
                alert={alert}
                value={value}
                setValue={setValue}
                setAlert={setAlert}
              />
            ) : (
              <Redirect to="/auth" />
            )
          }
        />
        <Route
          path="/auth"
          exact
          render={() =>
            user ? (
              <Redirect to="/" />
            ) : (
              <Auth alert={alert} setAlert={setAlert} />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
