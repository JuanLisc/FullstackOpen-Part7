import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const navigate = useNavigate();

  const style = {
    marginBottom: 5
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });

    setNewBlog({ title: '', author: '', url: '' });
    navigate('/');
  };

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  return (
    <>
      <Typography variant='h4' component='h2'>Create a new Blog:</Typography>
      <form onSubmit={addBlog} className="formSelector">
        <div>
          <TextField
            label='Title'
            value={newBlog.title}
            onChange={handleTitleChange}
            id="title-input"
            style={style}
          />
        </div>
        <div>
          <TextField
            label='Author'
            value={newBlog.author}
            onChange={handleAuthorChange}
            id="author-input"
            style={style}
          />
        </div>
        <div>
          <TextField
            label='URL'
            value={newBlog.url}
            onChange={handleUrlChange}
            id="url-input"
            style={style}
          />
        </div>
        <Button
          id="create-button"
          type="submit"
          variant='contained'
          style={style}
        >
          Create
        </Button>
      </form>
    </>
  );
};

export default BlogForm;
