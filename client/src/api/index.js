import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((req) => {
  if (JSON.parse(localStorage.getItem('user'))) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }
  return req;
});

export const getTasks = () => api.get('/tasks');
export const addTask = (newTask) => api.post('/tasks', newTask);
export const updateTask = (task) => api.put(`/tasks/${task._id}`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const signin = (formValue) => api.post('/user/signin', formValue);
export const signup = (formValue) => api.post('/user/signup', formValue);
