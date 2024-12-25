import { createSlice } from '@reduxjs/toolkit';

const initialState:any = {
  tasks: [],
  filterText: '',
  editTaskId: null,
  userToken: null,
  isAuthenticated: false,
  userDetails: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (state.editTaskId) {
        state.tasks = state.tasks.map(task =>
          task.id === state.editTaskId ? { ...task, ...action.payload } : task
        );
        state.editTaskId = null;
      } else {
        state.tasks.push({ ...action.payload, id: Date.now().toString(), comments: [] });
      }
    },
    editTask: (state, action) => {
      state.editTaskId = action.payload.id;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    resetFields: (state) => {
      state.editTaskId = null;
      state.filterText = '';
    },
    setUser: (state, action) => {
        // console.log("userdetails...",action.payload)
        state.userToken = action.payload.token;
        state.isAuthenticated = true;
        state.userDetails = action.payload.userDetails; // Save user details
      },
      logout: (state) => {
        state.userToken = null;
        state.isAuthenticated = false;
        state.userDetails = null;
      },
  },
});

export const { addTask, editTask, deleteTask, setFilterText, resetFields,setUser, logout } = taskSlice.actions;

export default taskSlice.reducer;
