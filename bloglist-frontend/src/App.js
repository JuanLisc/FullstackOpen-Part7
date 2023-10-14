import { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import { createBlog, initializeBlogs } from './reducers/blogReducer';
import { BlogList, Blog } from './components/BlogList';
import { initializeUser, login, logout } from './reducers/authReducer';
import { initializeUsers } from './reducers/userReducer';
import { UserList, User } from './components/UserList';
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom';
import { AppBar, Button, Container, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user);
  const users = useSelector(state => state.users);
  const blogs = useSelector(state => state.blogs);

  const blogMatch = useMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null;

  const userMatch = useMatch('/users/:id');
  const userToShow = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addNewBlog} />
    </Togglable>
  );

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(login({
      username,
      password,
    }));

    navigate('/');
  };

  const addNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogObject.user = user;
    dispatch(createBlog(blogObject));
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <Container>
      <div>
        <div style={{ position: 'relative' }}>
          <Typography variant='h2' component='h2'>
            Blogs
          </Typography>
          {user && (
            <Button
              variant='outlined'
              onClick={handleLogout}
              color='error'
              style={{
                marginBottom: 10,
                position: 'absolute',
                right: '5px',
                top: '30px'
              }}
            >
              Log out
            </Button>
          )}
        </div>

        <Notification />
        {!user && loginForm()}
        {user && (
          <div>
            <Divider>
              <Div>{user.name} logged in.</Div>
            </Divider>

            <AppBar position='static'>
              <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                </IconButton>
                <Button color='inherit' component={Link} to='/'>
                  Home
                </Button>
                <Button color='inherit' component={Link} to='/create'>
                  Create Blog
                </Button>
                <Button color='inherit' component={Link} to='/users'>
                  Users
                </Button>
              </Toolbar>
            </AppBar>

            <Routes>
              <Route path='/create' element={blogForm()} />
              <Route path='/' element={<BlogList user={user} />}/>
              <Route path='/blogs/:id' element={<Blog blog={blog} user={user} />} />
              <Route path='/users' element={<UserList />} />
              <Route path='/users/:id' element={<User user={userToShow} />} />
            </Routes>
          </div>
        )}
      </div>
    </Container>
  );
};

export default App;
