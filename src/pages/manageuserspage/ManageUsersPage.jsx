import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { setUser, selectAllUsers, selectUserAuthToken, getUsersThunk, deleteUserThunk, approveUserThunk } from '../../states/user-slice/user-slice';

const theme = createTheme();

function ManageUsersPage() {
    const dispatch = useDispatch();
    const authToken = useSelector(selectUserAuthToken);
    const users = useSelector(selectAllUsers);
    const [loadedUsers, setLoadedUsers] = useState(false);
    const [deletedAUser, setDeletedAUser] = useState(false);
    const [unapprovedOnly, setUnapprovedOnly] = useState(true);
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            dispatch(setUser(loggedInUser));
        }
    }, [])
    useEffect(() => {
        if(!loadedUsers){
            dispatch(getUsersThunk({token: authToken}));
        }
        setDeletedAUser(false);
    }, [authToken, deletedAUser])
    console.log(users);

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
          <Container style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', margin: 20 }}>
          <Box style={{ padding: 5, margin: 5, backgroundColor: "#E923F4", borderRadius: 5}}>
            <FormGroup>
              <FormControlLabel control={<Switch value={unapprovedOnly} onChange={(e) => { setUnapprovedOnly(e.target.checked); }} defaultChecked />} label="Show Unapproved Only!" />
            </FormGroup>
          </Box>
          { users.map((user, index) => {
            if (user.admin === 1 || (unapprovedOnly && user.approved === 1))
                return (<Box />)
            return (<Container key={user.id} style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', textAlign: "left" }}>
            <Box key={user.id} style={{ display: "flex",flexDirection: 'row', backgroundColor: "#9156ff", width: "90%", padding: 20, borderRadius: 5, marginTop: 20, marginRight: 10, color: "white" }}>
                <Box key={user.id} style={{ width: "95%" }}>
                    <Typography fontSize={"20px"} >
                            Id: {user.id}, 
                            Username: {user.username},
                            Role: {user.role}
                    </Typography>
                    <Typography fontSize={"15px"} display={'inline'} sx={{ mr: 2 }}>
                        Email: {user.email}, 
                    </Typography>
                    <Typography fontSize={"15px"} display={'inline'} sx={{ mr: 2 }}>
                        First Name: {user.firstname}
                    </Typography>
                    <Typography fontSize={"15px"} display={'inline'} sx={{ mr: 2 }}>
                        Last Name: {user.lastname}
                    </Typography>
                    <Typography fontSize={"15px"} display={'inline'} sx={{ mr: 2 }}>
                        Birth Date: {user.brithdate}
                    </Typography>
                    <Typography fontSize={"15px"} display={'inline'} sx={{ mr: 2 }}>
                        Gender: {user.gender === 0  ? "Female" : "Male"}
                    </Typography>
                </Box>
                <DeleteIcon style={{ color: "#FF0000", cursor: "pointer"}} 
                onClick={ (e) => { e.preventDefault(); 
                dispatch(deleteUserThunk({query: {username: user.username}, token: authToken})); setDeletedAUser(true); users.splice(index) }}/>
                { user.approved === 1 ? (
                    <CheckCircleOutlinedIcon  style={{ color: "#00FF00"}} />
                ) : (
                  <CheckIcon  style={{ color: "#0000FF", cursor: "pointer"}} 
                  onClick={ (e) => { e.preventDefault(); 
                  dispatch(approveUserThunk({query: {username: user.username}, token: authToken})); setDeletedAUser(true);}}/>
                ) }
            </Box>
            </Container>)
          }) }
          </Container>
        </Container>
      </ThemeProvider>
    );
}
export default ManageUsersPage;
    