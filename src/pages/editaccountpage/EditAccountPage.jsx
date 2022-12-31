import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import countries from "countries-list";
import {
  selectUser, selectUserStatus, selectUserStatusMessage, updateUserThunk, setUser, setAuthToken
} from '../../states/user-slice/user-slice';

const theme = createTheme();

const EditAccountPage = () => {
  const dispatch = useDispatch();
  const text1 = 'Account Details: ';
  const user = useSelector(selectUser);
  // console.log(user);
  const status = useSelector(selectUserStatus);
  const message = useSelector(selectUserStatusMessage);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userName, setuserName] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [gender, setGender] = useState(user.gender);
  const [nationality, setNationality] = useState(user.nationality);
  const [birthdate, setBirthDate] = useState(user.brithdate);
  const countryCodes = Object.keys(countries.countries);
  const countryNames = countryCodes.map(code => countries.countries[code].name);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');
    if(authToken) {
        dispatch(setAuthToken(authToken))
    }
    if (loggedInUser) {
        dispatch(setUser(loggedInUser));
    }
    else
        window.location = '/';
}, [])
  return (
    <ThemeProvider theme={theme}>
    <Container
      sx={{ width: 550 }}
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
        <Container style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', margin: 20 }}>
          <Box style={{ padding: 5, margin: 5, backgroundColor: "#E923F4", borderRadius: 5}}>
            <FormGroup>
              <FormControlLabel control={<Switch value={editMode} onChange={(e) => { setEditMode(e.target.checked); }} />} label="Edit Data" />
            </FormGroup>
          </Box>
        { editMode ? (<Container>
        { status === "fulfilled" && message === '' && <Container>
                <Box style={{ backgroundColor: "#5600F4", padding: 30, margin: 20, borderRadius: 5 }}>
                <Typography fontWeight={"bold"} color={'#FFFFFF'}>
                    Account Modification Successful!
                </Typography>
                </Box>
            </Container>}
            <form
                id="editaccountform"
                style={{ backgroundColor: "#5600F4", padding: 20, margin: 20, borderRadius: 5 }}
                onSubmit={(e) => {
                e.preventDefault();
                      dispatch(updateUserThunk({token: user.access_token, query: {
                        password: password,
                        firstname: firstName,
                        lastname: lastName,
                        gender: gender,
                        nationality: nationality,
                        brithdate: birthdate
                      }}));
                }}
            >
                <Typography sx={{m: 1}} component="h1" color="white" fontSize="2rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
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
                <Box fullWidth sx={{ mb: 1 }}>
                    <TextField
                        id="email"
                        type="email"
                        value={email}
                        variant="outlined"
                        fullWidth
                        autoComplete="email"
                        style={{
                        backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none'
                        }}
                        disabled
                        inputProps={{ style: { padding: '11px 13px' } }}
                    />
                </Box>
                <Box fullWidth sx={{ mb: 1 }}>
                    <TextField
                        id="password"
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => {
                        setPassword(e.target.value);
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
                        disabled
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
                <Button
                    disableRipple
                    variant="contained"
                    size="large"
                    type='submit'
                    fontFamily="Arial"
                    style={{ display: "inline-block",
                            backgroundColor: "#E923F4",
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            marginRight: "15px"
                    }}
                    
                >
                    Save
                </Button>
            </form>
        </Container>): (<Container>
            <Box
                style={{ backgroundColor: "#5600F4", padding: 20, margin: 20, borderRadius: 5 }}>
                <Typography sx={{m: 1}} component="h1" color="white" fontSize="2rem" font='"Favorit", "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;'>
                {text1}
                </Typography>
                <Box fullWidth sx={{ mb: 1 }}>
                    <Typography
                        fullWidth
                        style={{
                        // backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none',
                        padding: '11px 13px',
                        color: "#FFFFFF"
                        }}
                    >Email:{email}</Typography>
                </Box>
                <Box fullWidth sx={{ mb: 1 }}>
                    <Typography
                        fullWidth
                        style={{
                        // backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none',
                        padding: '11px 13px',
                        color: "#FFFFFF"
                        }}
                    >Password: *******</Typography>
                </Box>
                <Box fullWidth sx={{ mb: 1 }}>
                    <Typography
                        fullWidth
                        style={{
                        // backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none',
                        padding: '11px 13px',
                        color: "#FFFFFF"
                        }}
                    >Username: {userName}</Typography>
                </Box>
                <Box style={{ display: 'flex'}}>
                <Box fullWidth sx={{ mb: 1 }}>
                    <Typography
                        fullWidth
                        style={{
                        // backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none',
                        padding: '11px 13px',
                        color: "#FFFFFF"
                        }}
                    >Firstname: {firstName}</Typography>
                </Box>
                <Box fullWidth sx={{ mb: 1 }}>
                    <Typography
                        fullWidth
                        style={{
                        // backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none',
                        padding: '11px 13px',
                        color: "#FFFFFF"
                        }}
                    >LastName: {lastName}</Typography>
                </Box>
                </Box>
                <Box style={{ display: 'flex'}}>
                <Box fullWidth sx={{ mb: 1 }}>
                    <Typography
                        fullWidth
                        style={{
                        // backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none',
                        padding: '11px 13px',
                        color: "#FFFFFF"
                        }}
                    >Country: {countryNames[nationality]}</Typography>
                </Box>
                <Box fullWidth sx={{ mb: 1 }}>
                    <Typography
                        fullWidth
                        style={{
                        // backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none',
                        padding: '11px 13px',
                        color: "#FFFFFF"
                        }}
                    >Gender: {gender===1?"Female":"Male"}</Typography>
                </Box>
                <Box fullWidth sx={{ mb: 1 }}>
                    <Typography
                        fullWidth
                        style={{
                        // backgroundColor: '#FFFFFF', // '#E8F0FE',
                        borderRadius: 3,
                        fontSize: '1rem',
                        border: 'none',
                        padding: '11px 13px',
                        color: "#FFFFFF"
                        }}
                    >Birthdate: {birthdate}</Typography>
                </Box>
                </Box>
            </Box>
        </Container>)
        }
        </Container>
    </Container>
  </ThemeProvider>
  );
};

export default EditAccountPage;
