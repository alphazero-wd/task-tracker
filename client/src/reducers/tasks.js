import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/index';

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  const res = await api.getTasks();
  const { data } = await res.data;
  return data;
});

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (newTask) => {
    const res = await api.addTask(newTask);
    const { data } = await res.data;
    return data;
  }
);

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const res = await api.updateTask(task);
  const { data } = await res.data;
  return data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await api.deleteTask(id);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    loading: false,
    tasks: [],
    queriedTasks: [],
  },
  reducers: {
    queryTasks: (state, action) => {
      let queryResults = [...state.tasks];
      queryResults = queryResults.filter((task) =>
        task.name
          .toLowerCase()
          .includes(action.payload.searchValue.toLowerCase())
      );

      switch (action.payload.filterValue) {
        case '1':
          break;
        case '2':
          queryResults = queryResults.filter((task) => task.isImportant);
          break;
        case '3':
          queryResults = queryResults.filter((task) => task.isCompleted);
          break;
        case '4':
          queryResults = queryResults.filter((task) => !task.isCompleted);
          break;
        default:
          break;
      }
      switch (action.payload.sortValue) {
        case '1':
          queryResults = queryResults.sort((a, b) =>
            a.name < b.name ? -1 : 0
          );
          break;
        case '2':
          queryResults = queryResults.sort((a, b) =>
            b.name < a.name ? -1 : 0
          );
          break;
        case '3':
          queryResults = queryResults.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          break;
        default:
          break;
      }
      state.queriedTasks = queryResults;
    },
  },
  extraReducers: {
    [getTasks.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    [createTask.fulfilled]: (state, action) => {
      state.tasks.push(action.payload);
    },
    [updateTask.fulfilled]: (state, action) => {
      const task = state.tasks.find((task) => task._id === action.payload._id);
      task.name = action.payload.name;
      task.isImportant = action.payload.isImportant;
      task.isCompleted = action.payload.isCompleted;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export const { queryTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
