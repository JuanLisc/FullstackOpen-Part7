import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const User = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div className='user_list'>
      <Typography
        variant='h5'
        component='h2'
        style={{ marginTop: 15, marginBottom: 15 }}
      >
        {user.username}
      </Typography>
      {user.blogs.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>BLOGS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.blogs.map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {user.blogs.length === 0 && (
        <Typography variant='body2'>
          <em>No blogs added yet.</em>
        </Typography>
      )}
      <br />
      <Button
        variant='outlined'
        color='primary'
        onClick={() => navigate('/users')}
      >
        Go Back
      </Button>
    </div>
  );
};

const UserList = () => {
  const users = useSelector(state => state.users);
  return (
    <>
      <Typography
        variant='h5'
        component='h2'
        style={{ marginTop: 15, marginBottom: 15 }}
      >
        List of users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link> has {user.blogs.length} blogs created.
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { UserList, User };