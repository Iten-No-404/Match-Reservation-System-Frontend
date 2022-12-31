import "./AddStadium.css";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addStadium, selectStadiumStatus, selectStadiumStatusMessage } from "../../states/stadium-slice/stadium-slice";
import { selectUserAuthToken, setAuthToken, setUser } from '../../states/user-slice/user-slice';

// info for a stadium
/* 
    {
  "staduim_name": "cairol",
  "n_seats": 5,
  "address": "5wadi",
  "shape": 5,
  "location": "cairo"
    }
*/
const theme = createTheme();

const AddStadium = () => {
    const dispatch = useDispatch();
    const authToken = useSelector(selectUserAuthToken);
    const [stadium_name, setStadiumName] = useState("");
    const [seatNum, setSeatNum] = useState("");
    const [address, setAddress] = useState("");
    const [shape, setShape] = useState("");
    const [location, setLocation] = useState("");
    const status = useSelector(selectStadiumStatus);
    const message = useSelector(selectStadiumStatusMessage);
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        const authToken2 = localStorage.getItem('authToken');
        if(authToken2) {
            dispatch(setAuthToken(authToken2))
        }
        if (loggedInUser) {
            dispatch(setUser(loggedInUser));
        }
        else
            window.location = '/';
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const stadium = { staduim_name: stadium_name, n_seats: seatNum, address: address, shape: shape, location: location };
        // console.log(stadium);
        dispatch(addStadium({query: stadium, token: authToken}));
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
        { status === "fulfilled" && message === '' && <Container>
                <Box style={{ backgroundColor: "#5600F4", padding: 30, margin: 20, borderRadius: 5 }}>
                <Typography fontWeight={"bold"} color={'#FFFFFF'}>
                    Stadium Added Successfully!
                </Typography>
                </Box>
            </Container>}
            <Box style={{ backgroundColor: "#5600F4", padding: 20, margin: 20, borderRadius: 5 }}>
                <div className="add-stadium">
                    <h2>Add a new Stadium</h2>
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
                    <form onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input type="text" required value={stadium_name} onChange={(e) => setStadiumName(e.target.value)}/>
                        <label>Number of seats</label>
                        <input type="number" required value={seatNum} onChange={(e) => setSeatNum(e.target.value)}/>
                        <label>Shape</label>
                        <input type="number" required value={shape} onChange={(e) => setShape(e.target.value)}/>
                        <label>Address</label>
                        <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)}/>
                        <label>Location</label>
                        <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <button type='submit'>Add Stadium</button>
                    </form>
                </div> 
            </Box>
        </Container>
    </ThemeProvider>
    );
}

export default AddStadium;