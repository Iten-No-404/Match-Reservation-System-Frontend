import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { selectAllMatches, getMatches } from '../../states/match-slice/match-slice';
import { setUser, setAuthToken } from '../../states/user-slice/user-slice';

const theme = createTheme();

function HomePage() {
    const dispatch = useDispatch();
    const matches = useSelector(selectAllMatches);
    const [loadedMatches, setLoadedMatches] = useState(false);
    useEffect(() => {
        if(!loadedMatches){
            dispatch(getMatches({}));
        }
        setLoadedMatches(true);
        const loggedInUser = localStorage.getItem('user');
        const authToken = localStorage.getItem('authToken');
        if(authToken) {
            dispatch(setAuthToken(authToken))
        }
        if (loggedInUser) {
            dispatch(setUser(loggedInUser));
        }
    }, [])
    // console.log(matches);

    return (
      <ThemeProvider theme={theme}>
        <Container
          sx={{ width: "90%" }}
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
          <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
          { matches.map((match) => {
            return (<Box key={match.match_id} style={{ backgroundColor: "#9156ff", height: 200, width: 350, padding: 20, borderRadius: 5, marginTop: 20, marginRight: 10, color: "white" }}>
                <Link to={`/match/${match.match_id}`} style={{ textDecoration: 'none',  color: "#2B0245", flex: "1 0 20%" }}>
                    <Typography fontSize={"35px"} >
                        {match.team1} vs. {match.team2}
                    </Typography>
                    {/* <br/> */}
                    <Typography fontSize={"20px"}>
                        Starts on {match.startdate}
                    </Typography>
                    <Typography fontSize={"20px"}>
                        Starts at {match.starttime}
                    </Typography>
                </Link>
            </Box>)
          }) }
          </Container>
        </Container>
      </ThemeProvider>
    );
}
export default HomePage;
    