import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (notiObj, seconds) => {
  return dispatch => {
    const notification = {
      message: notiObj.message,
      type: notiObj.type
    };
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;