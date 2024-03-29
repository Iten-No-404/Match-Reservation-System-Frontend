import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const SignUpButton = ({ handleClick, worksAsLink, again }) => (
  <Box
    sx={{ spacing: 8, marginX: "5px" }}
  >
    { worksAsLink ? (
      <Link to="/register" style={{ textDecoration: 'none' }}>
        <Button
          fullWidth
          disableRipple
          variant="contained"
          size="large"
          font="'Favorit', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, sans-serif;"
          style={{
            backgroundColor: '#E923F4', color: again ? '#FFFFFF' : '#FFFFFF', fontWeight: 'bold', textTransform: 'none',
          }}
          type="submit"
          onClick={() => handleClick()}
        >
          { again ? 'Sign up again' : 'Sign up'}
        </Button>
      </Link>
    ) : (
      <Button
        fullWidth
        disableRipple
        variant="contained"
        size="large"
        font="'Favorit', 'Helvetica Neue', 'HelveticaNeue', Helvetica, Arial, sans-serif;"
        style={{
          backgroundColor: '#E923F4', color: '#FFFFFF', fontWeight: 'bold', textTransform: 'none',
        }}
        sx={{
          spacing: 8
        }}
        type="submit"
        onClick={() => handleClick()}
      >
        Sign up
      </Button>
    )}
  </Box>
);

SignUpButton.propTypes = {
  handleClick: PropTypes.func,
  worksAsLink: PropTypes.bool,
  again: PropTypes.bool,
};

SignUpButton.defaultProps = {
  handleClick: () => {},
  worksAsLink: true,
  again: false,
};

export default SignUpButton;
