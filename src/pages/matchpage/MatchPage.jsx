import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Button, GlobalStyles } from '@mui/material';
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
import { addTickets } from '../../states/ticket-slice/ticket-slice';

const theme = createTheme();

function MatchPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const matches = useSelector(selectAllMatches);
    const matchDict = Object.assign({}, ...matches?.map((match) => ({[match.match_id]: match})));
    const match = matchDict?.[id];
    const stadium = useSelector(selectStadium);
    const matchWithTickets = useSelector(selectMatch);
    var tickets = useRef(null);
    var selectedTickets = useRef(new Set());
    const [changedSelected, setChangedSelected] = useState(false);
    // var tickets = Array.from(Array(stadium?.shape), () => new Array(stadium?.n_seats));
    // let tickets = Array(stadium?.shape).fill().map(() => Array(stadium?.n_seats).fill(0));
    // console.log("Stadium",stadium);
    // console.log("Match",match);
    // console.log("Match With Tickets",matchWithTickets);
    // console.log("Tickets",tickets);
    console.log(selectedTickets);
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



    useEffect(() => {
      if(user.approved === 1){
        dispatch(getStadium({token: user.access_token, id: id}));
        if(user.role === "fan"){
          dispatch(getMatchWithTicketsForFan({token: user.access_token, id: id}));
        }
        else if(user.role === "manager")
          dispatch(getMatchWithTickets({token: user.access_token, id: id}));
      }
    }, [user.approved, id]);
    // 0 --> Unreserved, 1 --> Mine, -1 --> Reserved by someone else, 2 --> Pending.
    useEffect(() => {
      setChangedSelected(false);
      if(user.approved === 1 && matchWithTickets?.length !== 0){
        tickets.current = Array(stadium?.shape).fill().map(() => Array(stadium?.n_seats).fill(0));
        if(user.role === "fan"){
          // console.log("Entered here!!!");
          for(var i = 0; i< matchWithTickets?.mytickets?.length; i++){
            var ticket = matchWithTickets?.mytickets[i];
            tickets.current[ticket.row-1][ticket.seat-1] = 1;
          }
          for(var i = 0; i< matchWithTickets?.resevered_tickets?.length; i++){
            var ticket = matchWithTickets?.resevered_tickets[i];
            tickets.current[ticket.row-1][ticket.seat-1] = -1;
          }
          const selected = Array.from(selectedTickets.current);
          // console.log("Length",selected.length);
          for(var i = 0; i< selected.length; i++){
            // console.log("Entered here!!!");
            var ticket = selected[i];
            if(tickets.current[ticket[0]][ticket[1]] === 0)
              tickets.current[ticket[0]][ticket[1]] = 2;
          }
        }
        else if(user.role === "manager"){
          for(var i = 0; i< matchWithTickets?.tickets?.length; i++){
            var ticket = matchWithTickets?.tickets[i];
            tickets.current[ticket.row-1][ticket.seat-1] = -1;
          }
        }
      }
    }, [user, matchWithTickets?.tickets, matchWithTickets?.resevered_tickets, changedSelected, id]);

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
            <Box key={match?.match_id} style={{ backgroundColor: "#9156ff", padding: 20, borderRadius: 5, marginTop: 10, marginRight: 10, color: "white" }}>
                    <Typography fontSize={"55px"} >
                        {match?.team1} vs. {match?.team2}
                    </Typography>
                    <Typography fontSize={"20px"} >
                        Group: {match?.group1.toUpperCase()} Round: {match?.round} Group: {match?.group2.toUpperCase()}
                    </Typography>
                    <Typography fontSize={"30px"}>
                        Starts on {match?.startdate} at {match?.staduim_name}
                    </Typography>
                    <Typography fontSize={"30px"}>
                        From {match?.starttime} to {match?.endtime}
                    </Typography>
                    <Typography fontSize={"30px"}>
                        Main Referee: {match?.mainreferee}
                    </Typography>
                    <Typography fontSize={"20px"}>
                        Linesman 1: {match?.lineman1} , Linesman 2: {match?.lineman2}
                    </Typography>
                    <Typography fontSize={"20px"}>
                        
                    </Typography>
            </Box>
            { user.approved === 1 && user.role === "fan" && tickets.current !== null && (
              // <Box style={{ backgroundColor: "#9156ff", width: "100%", display: "grid", gridTemplateColumn: "repeat(4, 1fr)",
              //  gridTemplateRows: "repeat(auto-fill, 120px)", color: "white" }}>
              <Box style={{ backgroundColor: "#9156ff", padding: 20, borderRadius: 5, color: "white" }}>
                              <Button
                                disableRipple
                                variant="contained"
                                size="large"
                                fontFamily="Arial"
                                style={{ display: "inline-block",
                                        backgroundColor: "#E923F4",
                                        color: '#FFFFFF',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        marginRight: "15px"
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  // const selected = Array.from(selectedTickets.current);
                                  selectedTickets.current.forEach (function(value) {
                                    const ticket = {
                                      match_id: match.match_id,
                                      price: 3.5,
                                      n_tickets: 1,
                                      row: value[0]+1,
                                      seat: value[1]+1,
                                      level: 1
                                    };
                                    console.log("Sent Ticket", ticket);
                                    dispatch(addTickets({query: ticket, token: user.access_token}));
                                  })
                                  selectedTickets.current.clear();
                                  if(user.role === "fan"){
                                    dispatch(getMatchWithTicketsForFan({token: user.access_token, id: id}));
                                  }
                                  else if(user.role === "manager")
                                    dispatch(getMatchWithTickets({token: user.access_token, id: id}));
                                  }}
                            >
                                Reserve Selected Tickets
                            </Button>
                {/* {selectedTickets.current.size !===} */}
              { tickets.current && tickets.current.map((ticket,row) => { 
                  // console.log(ticket);
                  return (<Box style={{ padding: 5, marginBottom: 2, display: 'block'}}> 
                    {
                      ticket.map((seat, seatNum) => { 
                        // console.log(seat);
                        if(seat === 1)
                          return (<Box style={{ padding: 15, marginInline: 3, marginTop: 1, marginBottom: 1, backgroundColor: "#07726E", display: 'inline-block', borderRadius: 5}}></Box> )
                        if(seat === -1)
                          return (<Box style={{ padding: 15, marginInline: 3, marginTop: 1, marginBottom: 1, backgroundColor: "#111111", display: 'inline-block', borderRadius: 5}}></Box> )
                        if(seat === 2)
                          return (<Box style={{ cursor: "pointer", padding: 15, marginInline: 3, marginTop: 1, marginBottom: 1, backgroundColor: "#EEEE00", display: 'inline-block', borderRadius: 5}}
                          onClick={ () => { 
                            // console.log(selectedTickets.current.has([row,seatNum]));
                            var selected = Array.from(selectedTickets.current);
                            var delIndex = 0;
                            for(var i = 0; i<selected.length; i++)
                            {
                              if(selected[i][0] === row &&  selected[i][1] === seatNum)
                                {
                                  delIndex = i;
                                  break;
                                }
                            }
                            selected.splice(delIndex,1);
                            selectedTickets.current = new Set(selected);
                            setChangedSelected(true);
                          }}
                          ></Box> )
                        return (<Box style={{ cursor: "pointer", padding: 15, marginInline: 3, marginTop: 1, marginBottom: 1, backgroundColor: "#72076E", display: 'inline-block', borderRadius: 5}}
                        onClick={ () => { selectedTickets.current.add([row,seatNum]);
                          setChangedSelected(true);  
                        }}></Box> )
                      })
                    }
                  </Box>
                  )
                })}
                </Box>
            )}
            { user.approved === 1 && user.role === "manager" && (
              // <Box style={{ backgroundColor: "#9156ff", width: "100%", display: "grid", gridTemplateColumn: "repeat(4, 1fr)",
              //  gridTemplateRows: "repeat(auto-fill, 120px)", color: "white" }}>
              <Box style={{ backgroundColor: "#9156ff", padding: 20, borderRadius: 5, color: "white" }}>
              { tickets.current && tickets.current.map((ticket,row) => { 
                  // console.log(ticket);
                  return (<Box style={{ padding: 5, marginBottom: 2, display: 'block'}}> 
                    {
                      ticket.map((seat, seatNum) => { 
                        // console.log(seat);
                        // if(seat === 1)
                          // return (<Box style={{ padding: 15, marginInline: 3, marginTop: 1, marginBottom: 1, backgroundColor: "#07726E", display: 'inline-block', borderRadius: 5}}></Box> )
                        if(seat === -1)
                          return (<Box style={{ padding: 15, marginInline: 3, marginTop: 1, marginBottom: 1, backgroundColor: "#111111", display: 'inline-block', borderRadius: 5}}></Box> )
                        // if(seat === 2)
                        return (<Box style={{ padding: 15, marginInline: 3, marginTop: 1, marginBottom: 1, backgroundColor: "#72076E", display: 'inline-block', borderRadius: 5}}
                        // onClick={ () => { selectedTickets.current.add([row,seatNum]);
                        //   setChangedSelected(true);  
                        //}}
                        ></Box> )
                      })
                    }
                  </Box>
                  )
                })}
                </Box>
            )}
          </Container>
        </Container>
      </ThemeProvider>
    );
}
export default MatchPage;
    