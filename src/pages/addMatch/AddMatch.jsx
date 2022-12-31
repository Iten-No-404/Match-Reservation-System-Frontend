import './AddMatch.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getStadiums, selectStadiums } from "../../states/stadium-slice/stadium-slice";
import { selectUserAuthToken, setAuthToken, setUser } from '../../states/user-slice/user-slice';
import { addMatch, editMatch, getMatches, selectAllMatches, selectMatchStatus, selectMatchStatusMessage } from '../../states/match-slice/match-slice';

const theme = createTheme();

function AddMatch() {
  // info for a match
  /*
    {
      "team1": "Germaun",
      "team2": "USd",
      "startdate": "2000-03-21",
      "starttime": "03:10",
      "endtime": "04:50",
      "staduim_name": "cairol",
      "lineman2": "lls",
      "group1": "c",
      "group2": "d",
      "lineman1": "lls",
      "mainreferee": "lls",
      "round": 5,
      "baseprice": 3.5
    } 
  */
    const dispatch = useDispatch();
    const authToken = useSelector(selectUserAuthToken);
    const stadiums = useSelector(selectStadiums);
    const matches = useSelector(selectAllMatches);
    const matchNames = matches?.map(match => [match.startdate + " " + match.team1 + " vs. "+ match.team2, match.match_id]);
    const matchDict = Object.assign({}, ...matches?.map((match) => ({[match.match_id]: match})));
    const stadiumNames = stadiums?.map(stadium => stadium.staduim_name);

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [startdate, setStartDate] = useState("");
    const [starttime, setStartTime] = useState("");
    const [endtime, setEndTime] = useState("");
    const [stadium_name, setStadiumName] = useState("");
    const [lineman1, setLineman1] = useState("");
    const [lineman2, setLineman2] = useState("");
    const [group1, setGroup1] = useState("");
    const [group2, setGroup2] = useState("");
    const [mainreferee, setMainReferee] = useState("");
    const [round, setRound] = useState("");
    const [baseprice, setBasePrice] = useState("");
    const [editedMatchId, setEditedMatchId] = useState(0);


    const status = useSelector(selectMatchStatus);
    const message = useSelector(selectMatchStatusMessage);
    const [editMode, setEditMode] = useState(false);

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

    useEffect(() => {
      if(authToken)
        dispatch(getStadiums({token: authToken}));
        dispatch(getMatches());
    }, [authToken])
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const match = { team1: team1, team2: team2, startdate: startdate, starttime: starttime, endtime: endtime, staduim_name: stadium_name, lineman1: lineman1, lineman2: lineman2, group1: group1, group2: group2, mainreferee: mainreferee, round: round, baseprice: baseprice };
      // console.log(match);
      dispatch(addMatch({query: match, token: authToken}));
    }

    const handleEditSubmit = (e) => {
      e.preventDefault();
      const match = { team1: team1, team2: team2, startdate: startdate, starttime: starttime, endtime: endtime, staduim_name: stadium_name, lineman1: lineman1, lineman2: lineman2, group1: group1, group2: group2, mainreferee: mainreferee, round: round, baseprice: baseprice };
      // console.log(match);
      dispatch(editMatch({query: match, id: editedMatchId, token: authToken}));
    }


  return (
    <ThemeProvider theme={theme}>
    <Container
      sx={{ width: 600 }}
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
      <Container style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', margin: 0, padding: 0 }}>
          <Box style={{ padding: 5, margin: 5, backgroundColor: "#E923F4", borderRadius: 5}}>
            <FormGroup>
              <FormControlLabel control={<Switch value={editMode} onChange={(e) => { setEditMode(e.target.checked); }} />} label="Edit Data" />
            </FormGroup>
          </Box>
      {editMode ? (<Container>
          { status === "fulfilled" && message === '' && <Container>
          <Box style={{ backgroundColor: "#5600F4", padding: 30, margin: 20, borderRadius: 5}}>
          <Typography fontWeight={"bold"} color={'#FFFFFF'}>
              Match Edited Successfully!
          </Typography>
          </Box>
      </Container>}
      <Box style={{ backgroundColor: "#5600F4", padding: 20, margin: 20, marginTop: 5, borderRadius: 5 }}>
      <div className='add-match'>
        <h2>Edit an existing Match</h2>
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
        <form onSubmit={handleEditSubmit} style={{ alignItems: 'center' }}>
        <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel id="stadium-label" style={{ color: "rgb(43, 2, 69)"}}>Existing Match</InputLabel>
              <Select
                  labelId="match-label"
                  id="match-name"
                  label="Match Name"
                  name='match_name'
                  value={editedMatchId}
                  onChange={(e) => {setEditedMatchId(e.target.value);
                    setTeam1(matchDict[e.target.value].team1)
                    setTeam2(matchDict[e.target.value].team2)
                    setStartDate(matchDict[e.target.value].startdate)
                    setStartTime(matchDict[e.target.value].starttime)
                    setEndTime(matchDict[e.target.value].endtime)
                    setStadiumName(matchDict[e.target.value].stadium_name)
                    setLineman1(matchDict[e.target.value].lineman1)
                    setLineman2(matchDict[e.target.value].lineman2)
                    setGroup1(matchDict[e.target.value].group1)
                    setGroup2(matchDict[e.target.value].group2)
                    setMainReferee(matchDict[e.target.value].mainreferee)
                    setRound(matchDict[e.target.value].round)
                    setBasePrice(matchDict[e.target.value].baseprice)
                  }}
                  style={{ backgroundColor: '#FFFFFF'}}
              >
                  { matchNames.map((matchName) => {
                  return <MenuItem key={matchName[1]} value={matchName[1]}>{matchName[0]}</MenuItem>
                  })}
              </Select>
              </FormControl>
        <Box style={{ display: 'flex'}}>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Team 1</label>
            <input type='text' name='team1' onChange={(e) => setTeam1(e.target.value)} value={team1}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Team 2</label>
            <input type='text' name='team2' onChange={(e) => setTeam2(e.target.value)} value={team2}/>
          </Box>
        </Box>
        <Box style={{ display: 'flex'}}>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Start Date</label>
            <input type='date' name='startdate' onChange={(e) => setStartDate(e.target.value)} value={startdate}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Start Time</label>
            <input type='time' name='starttime'onChange={(e) => setStartTime(e.target.value)} value={starttime}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>End Time</label>
            <input type='time' name='endtime' onChange={(e) => setEndTime(e.target.value)} value={endtime}/>
          </Box>
        </Box>
          <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel id="stadium-label" style={{ color: "rgb(43, 2, 69)"}}>Stadium Name</InputLabel>
              <Select
                  labelId="stadium-label"
                  id="stadium-name"
                  label="Stadium Name"
                  name='stadium_name'
                  onChange={(e) => setStadiumName(e.target.value)}
                  style={{ backgroundColor: '#FFFFFF'}}
              >
                  { stadiumNames.map((stadiumName) => {
                  return <MenuItem value={stadiumName}>{stadiumName}</MenuItem>
                  })}
              </Select>
              </FormControl>
          {/* <input type='text' name='stadium_name' onChange={(e) => setStadiumName(e.target.value)} value={stadium_name}/> */}
        <Box style={{ display: 'flex'}}>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Lineman 1</label>
            <input type='text' name='lineman1' onChange={(e) => setLineman1(e.target.value)} value={lineman1}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Lineman 2</label>
            <input type='text' name='lineman2' onChange={(e) => setLineman2(e.target.value)} value={lineman2}/>
          </Box>
        </Box>
        <Box style={{ display: 'flex'}}>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Group 1</label>
            <input type='text' name='group1' onChange={(e) => setGroup1(e.target.value)} value={group1}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Group 2</label>
            <input type='text' name='group2' onChange={(e) => setGroup2(e.target.value)} value={group2}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Round</label>
            <input type='number' name='round' onChange={(e) => setRound(e.target.value)} value={round}/>
          </Box>
        </Box>
          <label>Main Referee</label>
          <input type='text' name='mainreferee' onChange={(e) => setMainReferee(e.target.value)} value={mainreferee} />
          <label>Base Price</label>
          <input type='number' name='baseprice' onChange={(e) => setBasePrice(e.target.value)} value={baseprice} />
          <button type='submit' >Edit Match</button>
        </form>
      </div>
      </Box>
  </Container>) : (<Container>
          { status === "fulfilled" && message === '' && <Container>
          <Box style={{ backgroundColor: "#5600F4", padding: 30, margin: 20, borderRadius: 5}}>
          <Typography fontWeight={"bold"} color={'#FFFFFF'}>
              Match Added Successfully!
          </Typography>
          </Box>
      </Container>}
      <Box style={{ backgroundColor: "#5600F4", padding: 20, margin: 20, marginTop: 5, borderRadius: 5 }}>
      <div className='add-match'>
        <h2>Add a New Match</h2>
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
        <form onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
        <Box style={{ display: 'flex'}}>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Team 1</label>
            <input type='text' name='team1' onChange={(e) => setTeam1(e.target.value)} value={team1}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Team 2</label>
            <input type='text' name='team2' onChange={(e) => setTeam2(e.target.value)} value={team2}/>
          </Box>
        </Box>
        <Box style={{ display: 'flex'}}>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Start Date</label>
            <input type='date' name='startdate' onChange={(e) => setStartDate(e.target.value)} value={startdate}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Start Time</label>
            <input type='time' name='starttime'onChange={(e) => setStartTime(e.target.value)} value={starttime}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>End Time</label>
            <input type='time' name='endtime' onChange={(e) => setEndTime(e.target.value)} value={endtime}/>
          </Box>
        </Box>
          {/* <label>Stadium Name</label> */}
          <FormControl fullWidth sx={{ mb: 1 }}>
              <InputLabel id="stadium-label" style={{ color: "rgb(43, 2, 69)"}}>Stadium Name</InputLabel>
              <Select
                  labelId="stadium-label"
                  id="stadium-name"
                  label="Stadium Name"
                  name='stadium_name'
                  onChange={(e) => setStadiumName(e.target.value)}
                  style={{ backgroundColor: '#FFFFFF'}}
              >
                  { stadiumNames.map((stadiumName) => {
                  return <MenuItem value={stadiumName}>{stadiumName}</MenuItem>
                  })}
              </Select>
              </FormControl>
          {/* <input type='text' name='stadium_name' onChange={(e) => setStadiumName(e.target.value)} value={stadium_name}/> */}
        <Box style={{ display: 'flex'}}>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Lineman 1</label>
            <input type='text' name='lineman1' onChange={(e) => setLineman1(e.target.value)} value={lineman1}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Lineman 2</label>
            <input type='text' name='lineman2' onChange={(e) => setLineman2(e.target.value)} value={lineman2}/>
          </Box>
        </Box>
        <Box style={{ display: 'flex'}}>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Group 1</label>
            <input type='text' name='group1' onChange={(e) => setGroup1(e.target.value)} value={group1}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Group 2</label>
            <input type='text' name='group2' onChange={(e) => setGroup2(e.target.value)} value={group2}/>
          </Box>
          <Box style={{ display: 'flex', flexDirection: "column"}}>
            <label>Round</label>
            <input type='number' name='round' onChange={(e) => setRound(e.target.value)} value={round}/>
          </Box>
        </Box>
          <label>Main Referee</label>
          <input type='text' name='mainreferee' onChange={(e) => setMainReferee(e.target.value)} value={mainreferee} />
          <label>Base Price</label>
          <input type='number' name='baseprice' onChange={(e) => setBasePrice(e.target.value)} value={baseprice} />
          <button type='submit' >Add Match</button>
        </form>
      </div>
      </Box>
        </Container>)}
      </Container>
    </Container>
</ThemeProvider>
  )
}

export default AddMatch