import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducers/tasks';
import userReducer from './reducers/user';
export default configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
});
