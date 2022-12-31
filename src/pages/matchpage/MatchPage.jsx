import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircle';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getStadium, selectStadium } from '../../states/stadium-slice/stadium-slice';
import { selectAllMatches, getMatches, getMatchWithTickets, getMatchWithTicketsForFan, selectMatch } from '../../states/match-slice/match-slice';
import { setUser, selectUser, selectUserAuthToken, getUsersThunk, deleteUserThunk, approveUserThunk, setAuthToken } from '../../states/user-slice/user-slice';

const theme = createTheme();

function MatchPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const matches = useSelector(selectAllMatches);
    const matchDict = Object.assign({}, ...matches?.map((match) => ({[match.match_id]: match})));
    const match = matchDict?.[id];
    const stadium = useSelector(selectStadium);
    console.log(stadium);
    const user = useSelector(selectUser);
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
    }, []);

    // useEffect(() => {
    //     if(user.access_token !== "")
    //         dispatch(getStadium({token: user.access_token, id: id}));
    // }, [stadium]);

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
          <Container style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', margin: 15 }}>
            <Box key={match.match_id} style={{ backgroundColor: "#9156ff", padding: 20, borderRadius: 5, marginTop: 10, marginRight: 10, color: "white" }}>
                    <Typography fontSize={"55px"} >
                        {match.team1} vs. {match.team2}
                    </Typography>
                    <Typography fontSize={"20px"} >
                        Group: {match.group1.toUpperCase()} Round: {match.round} Group: {match.group2.toUpperCase()}
                    </Typography>
                    <Typography fontSize={"30px"}>
                        Starts on {match.startdate} at {match.staduim_name}
                    </Typography>
                    <Typography fontSize={"30px"}>
                        From {match.starttime} to {match.endtime}
                    </Typography>
                    <Typography fontSize={"30px"}>
                        Main Referee: {match.mainreferee}
                    </Typography>
                    <Typography fontSize={"20px"}>
                        Linesman 1: {match.lineman1} , Linesman 2: {match.lineman2}
                    </Typography>
                    <Typography fontSize={"20px"}>
                        
                    </Typography>
            </Box>
            { user.approved === 1 && user.role === "fan" && (
                <Box key={match.match_id} style={{ backgroundColor: "#9156ff", padding: 20, borderRadius: 5, marginTop: 10, marginRight: 10, color: "white" }}>

                </Box>
            )}
          </Container>
        </Container>
      </ThemeProvider>
    );
}
export default MatchPage;
    