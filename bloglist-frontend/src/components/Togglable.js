import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '', marginTop: 10 };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
      visible,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant='contained'
          id="show-button"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          variant='outlined'
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
