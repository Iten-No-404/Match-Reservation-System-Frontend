import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogInButton from '../../components/Buttons/LogInButton/LogInButton';
import EmailInputTextField from '../../components/Fields/EmailInputTextField/EmailInputTextField';
import PasswordInputTextField from '../../components/Fields/PasswordInputTextField/PasswordInputTextField';
import {
  selectUser, selectUserStatusMessage, logInThunk, setUserStatusMessage, setUser
} from '../../states/user-slice/user-slice';

const theme = createTheme();

const LogInPage = () => {
  const dispatch = useDispatch();
  const text1 = 'Login';
  const text2 = 'New Here? ';
  const text3 = 'Sign up!';
  const user = useSelector(selectUser);
  console.log(user);
  const message = useSelector(selectUserStatusMessage);
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        dispatch(setUser(loggedInUser));
        window.location = '/';
    }
}, [])
  if (user.approved === 1) {
    window.location = '/';
  }
  return (
    <ThemeProvider theme={theme}>
    <Container
      sx={{ width: 500 }}
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: '#72076E',
            height: '100%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          },
        }}
      />
                <form
            id="loginform"
            style={{ backgroundColor: "#5600F4", padding: 20, margin: 20, borderRadius: 5 }}
            onSubmit={(e) => {
              e.preventDefault();
                dispatch(logInThunk({
                  email: user.email,
                  password: user.password,
                }));
              }}
          >
            <Typography sx={{m: 2}} component="h1" color="white" fontSize="2rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
              {text1}
            </Typography>
            { message === '' ? (<Box />)
              : (
                <Box
                  sx={{
                    borderRadius: 1,
                    marginBottom: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: '#FFFFFF',
                    padding: '14px 15px',
                    backgroundColor: '#00000040',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    font: '"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;',
                  }}
                >
                  <Typography
                    component="h2"
                    fontSize="0.875rem"
                    font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'
                  >
                    {message}
                  </Typography>
                </Box>
              )}
            <EmailInputTextField />
            <PasswordInputTextField />
            <LogInButton worksAsLink={false} />
            <Divider
              variant="fullWidth"
              sx={{
                spacing: 8,
                mt: 1,
                '&.MuiDivider-root': {
                  '&::before': {
                    borderTop: 'thin solid #FFFFFF',
                  },
                  '&::after': {
                    borderTop: 'thin solid #FFFFFF',
                  },
                },
              }}
              style={{
                color: '#FFFFFF',
                textTransform: 'none',
                borderColor: '#FFFFFF',
              }}
            >
              or
            </Divider>
            <Box sx={{
              marginTop: 0.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
              <Typography component="h4" color="white" fontSize="1rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
                {text2}
                <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                  {text3}
                </Link>
              </Typography>
            </Box>
          </form>
    </Container>
  </ThemeProvider>
  );
};

export default LogInPage;
