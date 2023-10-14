import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { showNotification } from './notificationReducer';
import { initializeBlogs } from './blogReducer';

const authSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    }
  }
});

export const { setUser, removeUser } = authSlice.actions;

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const login = (userObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: userObject.username,
        password: userObject.password
      });

      dispatch(showNotification({
        message: `Successfully logged in! Welcome back, ${user.username}.`,
        type: 'success'
      }, 5));
      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(initializeBlogs());
      dispatch(setUser(user));
    } catch (error) {
      dispatch(showNotification({
        message: 'Username or password incorrect!',
        type: 'error'
      }, 5));
    }
  };
};

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken(null);
    dispatch(removeUser());
  };
};

export default authSlice.reducer;