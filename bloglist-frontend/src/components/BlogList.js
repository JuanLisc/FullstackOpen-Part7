import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { Delete, Send, ThumbUp } from '@mui/icons-material';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const giveLike = (blog) => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    const likedBlog = dispatch(likeBlog(changedBlog));
    likedBlog.user = blog.user;
  };

  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog));
    navigate('/');
  };

  const commentBlog = async (event) => {
    event.preventDefault();
    dispatch(addComment(blog, comment));
    setComment('');
    setOpen(false);
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  if (!blog) {
    return null;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>TITLE</TableCell>
              <TableCell >{blog.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>AUTHOR</TableCell>
              <TableCell >{blog.author}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LIKES</TableCell>
              <TableCell >
                {blog.likes}
              </TableCell>
              <TableCell align='right'>
                <Button
                  id='likeButton'
                  onClick={() => giveLike(blog)}
                  variant='contained'
                  color='primary'
                  endIcon={<ThumbUp />}
                >
                  Give a like!
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell >{blog.url}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <br />
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {blog.user.username === user.username && (
          <Button
            id="deleteButton"
            onClick={() => removeBlog(blog)}
            variant='contained'
            color='error'
            startIcon={<Delete />}
          >
            Delete Blog
          </Button>
        )}
        <Typography
          variant='body2'
          component='p'
          style={{ position: 'absolute', right: '5px' }}
        >
          <em>Blog added by </em>
          <strong>{blog.user.username}</strong>
        </Typography>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">Comments:</Typography>
          <Button variant='contained' onClick={handleClickOpen} style={{ position: 'absolute', right: '5px' }}>
            ADD A COMMENT
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <DialogContentText>
                What are your thoughts about this blog?
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='comment'
                label='Your comment'
                type='text'
                value={comment}
                fullWidth
                onChange={({ target }) => setComment(target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={commentBlog} variant='contained' endIcon={<Send />}>
                SEND
              </Button>
              <Button onClick={handleClose} variant='outlined'>
                CANCEL
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {blog.comments.length === 0 &&
          <Typography variant='body2'>
            <em>This blog does not have any comment yet. Do the first one!</em>
          </Typography>
        }
        {blog.comments.length > 0 && (
          <Demo>
            <List>
              {blog.comments.map((comment, index) =>
                <div key={index}>
                  <ListItem>
                    <ListItemText>{comment}</ListItemText>
                  </ListItem>
                  <Divider
                    variant="middle"
                    component="li"
                    textAlign='right'
                  >
                    Comment N° {index + 1}
                  </Divider>
                </div>
              )}
            </List>
          </Demo>
        )}
      </div>
    </>
  );
};

const BlogList = () => {

  const blogs = useSelector(state => state.blogs);
  const blogsSorted = blogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Typography
        variant='h5'
        component='h2'
        style={{ marginTop: 15, marginBottom: 15 }}
      >
        List of Blogs:
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogsSorted.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { BlogList, Blog };