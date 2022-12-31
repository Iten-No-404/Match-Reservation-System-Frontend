import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import countries from "countries-list";
import SignUpButton from '../../components/Buttons/SignUpButton/SignUpButton';
import EmailInputTextField from '../../components/Fields/EmailInputTextField/EmailInputTextField';
import PasswordInputTextField from '../../components/Fields/PasswordInputTextField/PasswordInputTextField';
import {
  selectUser, selectUserStatus, selectUserStatusMessage, signUpThunk, setUser, setAuthToken
} from '../../states/user-slice/user-slice';

const theme = createTheme();

const SignUpPage = () => {
  const dispatch = useDispatch();
  const text1 = 'Sign Up as: ';
  const text2 = 'Already have an account? ';
  const text3 = 'Log In!';
  const user = useSelector(selectUser);
  // console.log(user);
  const status = useSelector(selectUserStatus);
  const message = useSelector(selectUserStatusMessage);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userName, setuserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(0);
  const [nationality, setNationality] = useState(1);
  const [birthdate, setBirthDate] = useState(null);
  const [role, setRole] = useState('fan');
  const countryCodes = Object.keys(countries.countries);
  const countryNames = countryCodes.map(code => countries.countries[code].name);
  // console.log(nationality);
  const [step, setStep] = useState(1);
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');
    if(authToken) {
        dispatch(setAuthToken(authToken))
    }
    if (loggedInUser) {
        dispatch(setUser(loggedInUser));
        // window.location = '/';
    }
}, [])
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
      { status === "fulfilled" && message === '' && <Container>
            <Box style={{ backgroundColor: "#5600F4", padding: 30, margin: 20, borderRadius: 5 }}>
              <Typography fontWeight={"bold"} color={'#FFFFFF'}>
                Registeration successful!
                Please wait until the account is approved to login. Try again later.
              </Typography>
            </Box>
          </Container>}
          <form
            id="signupform"
            style={{ backgroundColor: "#5600F4", padding: 20, margin: 20, borderRadius: 5 }}
            onSubmit={(e) => {
              e.preventDefault();
                dispatch(signUpThunk({
                  email: user.email,
                  password: user.password,
                  username: userName,
                  firstname: firstName,
                  lastname: lastName,
                  gender: gender,
                  nationality: nationality,
                  brithdate: birthdate,
                  role: role
                }));
              }}
          >
            <Typography sx={{m: 1}} component="h1" color="white" fontSize="2rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
              {text1}
              <FormControl sx={{ mb: 1}}>
              <InputLabel id="role-label" style={{ color: "rgb(43, 2, 69)"}}>Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                label="Role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                style={{ backgroundColor: '#FFFFFF'}}
              >
                <MenuItem value={"fan"}>Fan</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
              </Select>
            </FormControl>
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
            <Box fullWidth sx={{ mb: 1 }}>
                  <TextField
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm password"
                    value={repeatPassword}
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    autoComplete="password"
                    style={{
                      backgroundColor: '#FFFFFF', // '#E8F0FE',
                      borderRadius: 3,
                      fontSize: '1rem',
                      border: 'none',
                    }}
                    inputProps={{ style: { padding: '11px 13px'   } }}
                  />
            </Box>
            <Box fullWidth sx={{ mb: 1 }}>
                  <TextField
                    id="user-name"
                    type="text"
                    placeholder="User name"
                    value={userName}
                    onChange={(e) => {
                      setuserName(e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    style={{
                      backgroundColor: '#FFFFFF', // '#E8F0FE',
                      borderRadius: 3,
                      fontSize: '1rem',
                      border: 'none',
                    }}
                    inputProps={{ style: { padding: '11px 13px'   } }}
                  />
            </Box>
            <Box style={{ display: 'flex'}}>
            <Box fullWidth sx={{ mb: 1 }}>
                  <TextField
                    id="first-name"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    style={{
                      backgroundColor: '#FFFFFF', // '#E8F0FE',
                      borderRadius: 3,
                      fontSize: '1rem',
                      border: 'none',
                    }}
                    inputProps={{ style: { padding: '11px 13px'   } }}
                  />
            </Box>
            <Box fullWidth sx={{ mb: 1 }}>
                  <TextField
                    id="last-name"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    style={{
                      backgroundColor: '#FFFFFF', // '#E8F0FE',
                      borderRadius: 3,
                      fontSize: '1rem',
                      border: 'none',
                    }}
                    inputProps={{ style: { padding: '11px 13px'   } }}
                  />
            </Box>
            </Box>
            <Box style={{ display: 'flex'}}>
            <FormControl sx={{ mb: 1, width: 150 }}>
              <InputLabel id="nationality-label" style={{ color: "rgb(43, 2, 69)"}}>Nationality</InputLabel>
              <Select
                labelId="nationality-label"
                id="nationality"
                value={nationality}
                label="Nationality"
                onChange={(e) => {
                  setNationality(e.target.value);
                }}
                style={{ backgroundColor: '#FFFFFF'}}
              >
                {countryNames.map((countryName, index) => {
                  return <MenuItem value={index}>{countryName}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ mb: 1, ml: 1}}>
              <InputLabel id="gender-label" style={{ color: "rgb(43, 2, 69)"}}>Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                label="Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                style={{ backgroundColor: '#FFFFFF'}}
              >
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="YYYY-MM-DD"
                label="Birth Date"
                value={birthdate}
                onChange={(e) => {
                  console.log(e);
                  console.log(e.$y+'-'+e.$M+'-'+e.$D);
                  // setBirthDate();
                  setBirthDate(e.$y+'-'+(e.$M+1)+'-'+e.$D);
                }}
                style={{ backgroundColor: "#FFFFFF"}}
                renderInput={(params) => <TextField style={{ backgroundColor: "#FFFFFF"}} {...params} />}
              />
            </LocalizationProvider>
            </Box>
            <SignUpButton worksAsLink={false} />
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
                <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                  {text3}
                </Link>
              </Typography>
            </Box>
          </form>
    </Container>
  </ThemeProvider>
  );
};

export default SignUpPage;
