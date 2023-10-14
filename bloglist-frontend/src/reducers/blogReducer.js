import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { showNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlogs(state, action) {
      const blogVoted = action.payload;
      return state.map(b =>
        b.id !== blogVoted.id ? b : blogVoted);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      const blogDeleted = action.payload;
      return state.filter(b => b.id !== blogDeleted.id);
    }
  }
});

export const { updateBlogs, appendBlog, setBlogs, removeBlog } =
blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content);

      dispatch(appendBlog(newBlog));
      dispatch(initializeBlogs());
      dispatch(showNotification({
        message: `A new blog: "${newBlog.title}" by ${newBlog.author} added!`,
        type: 'success'
      }, 5));
    } catch (error) {
      console.log(error.response.data.error);
      dispatch(showNotification({
        message: error.response.data.error,
        type: 'error'
      }, 5));
    }
  };
};

export const likeBlog = blog => {
  return async dispatch => {
    const blogToLike = await blogService.update(blog.id, blog);
    dispatch(updateBlogs(blogToLike));
    dispatch(initializeBlogs());
  };
};

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const blogToUpdate = await blogService.commentBlog(blog.id, comment);
      dispatch(updateBlogs(blogToUpdate));

      dispatch(initializeBlogs());
      dispatch(showNotification({
        message: 'comment added successfully!',
        type: 'success'
      }, 5));
    } catch (error) {
      dispatch(showNotification({
        message: error.response.data.error,
        type: 'error'
      }, 5));
    }
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog));

      dispatch(initializeBlogs());
      dispatch(showNotification({
        message: `"${blog.title}" blog deleted successfully!`,
        type: 'success'
      }, 5));
    } catch (error) {
      dispatch(showNotification({
        message: error.response.data.error,
        type: 'error'
      }, 5));
    }
  };
};

export default blogSlice.reducer;