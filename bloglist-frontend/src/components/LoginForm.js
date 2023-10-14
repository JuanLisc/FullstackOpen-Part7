import { Button, Divider, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const style = {
    marginTop: 5
  };

  return (
    <>
      <Divider></Divider>
      <Typography variant='h5' component='h2'>Login</Typography>
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label= 'username'
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            label = 'password'
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={style}
          />
        </div>
        <div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            id='login-button'
            style={{
              marginTop: 20,
              marginBottom: 5
            }}
          >
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
