import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
};

  export const addMatch = createAsyncThunk(
    'addMatch',
    async ({query, token}) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add_match`, query, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            return response.data;
        }catch (err){
            console.log(err);
            return err.response.data;
        }
    }
  );

  export const editMatch = createAsyncThunk(
    'editMatch',
    async ({query, id, token}) =>{
        try{
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/edit_match/${id}`, query, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            // console.log(response.data);
            return response.data;
        }catch (err){
            console.log(err);
            return err.response.data;
        }
    }
  );

  export const getMatches = createAsyncThunk(
    'getMatches',
    async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_matches_as_guest`, {
                headers: {
                  ...headers
                }
              });
            return response.data.response;
        }catch (err){
            console.log(err);
            return err.response.data;
        }
    }
  );

  export const getMatchesWithTickets = createAsyncThunk(
    'getMatchesWithTickets',
    async ({token}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_matches_with_tickets_for_manager`, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            return response.data;
        }catch (err){
            console.log(err);
            return err.response.data;
        }
    }
  );

  export const getMatchWithTickets = createAsyncThunk(
    'getMatchWithTickets',
    async ({token, id}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_match_with_tickets_for_manager/${id}`, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            return response.data;
        }catch (err){
            console.log(err);
            return err.response.data;
        }
    }
  );

  export const getMatchWithTicketsForFan = createAsyncThunk(
    'getMatchWithTicketsForFan',
    async ({token, id}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_match_with_ticket_as_fan/${id}`, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            return response.data;
        }catch (err){
            console.log(err);
            return err.response.data;
        }
    }
  );

  const match = createSlice({
    name: 'match',
    initialState: {
        match: {
            team1: "",
            team2: "",
            startdate: "0000-00-00",
            starttime: "00:00",
            endtime: "00:00",
            staduim_name: "",
            lineman2: "",
            group1: "",
            group2: "",
            lineman1: "",
            mainreferee: "",
            round: 0,
            baseprice: 0.0
          },
        allMatches: [],
        status: 'idle',
        statusMessage: ''
    },
    reducers: {

    },
    extraReducers: {
      [addMatch.pending]: (state) => {
        console.log('Add Match in Progress');
        const s = state; 
        s.status = 'pending';
      },
      [addMatch.fulfilled]: (state, { payload }) => {
        const s = state; 
        // console.log(payload);
        try {
          if(payload.meta.status === "200"){
            s.match = payload.response;
            s.status = 'fulfilled';
          } else {
            s.status = 'failed';
            s.statusMessage = payload.meta.msg;
          }
        } catch (e) {
          s.status = 'failed';
          s.statusMessage = payload.meta.msg;
        }
      },
      [addMatch.rejected]: (state) => {
        console.log('Add Match Failed!!!!');
        const s = state; 
        s.status = 'rejected';
      },
      [editMatch.pending]: (state) => {
        console.log('Edit Match in Progress');
        const s = state; 
        s.status = 'pending';
      },
      [editMatch.fulfilled]: (state, { payload }) => {
        const s = state; 
        // console.log(payload);
        try {
          s.match = payload.response;
          s.status = 'fulfilled';
        } catch (e) {
          s.status = 'failed';
          s.statusMessage = payload.meta.msg;
         }
      },
      [editMatch.rejected]: (state) => {
        console.log('Edit Match Failed!!!!');
        const s = state; 
        s.status = 'rejected';
      },
      [getMatches.pending]: (state) => {
        console.log('Get Matches in Progress');
        const s = state; 
        s.status = 'pending';
      },
      [getMatches.fulfilled]: (state, { payload }) => {
        const s = state; 
        try {
          s.allMatches = payload.matches;
          // s.status = 'fulfilled';
        } catch (e) {
          s.status = 'failed';
          s.statusMessage = payload.status;
        }
      },
      [getMatches.rejected]: (state) => {
        console.log('Get Matches Failed!!!!');
        const s = state; 
        s.status = 'rejected';
      },
      [getMatchesWithTickets.pending]: (state) => {
        console.log('Get Matches with Tickets in Progress');
        const s = state; 
        s.status = 'pending';
      },
      [getMatchesWithTickets.fulfilled]: (state, { payload }) => {
        const s = state; 
        try {
          s.allMatches = payload.matches;
          s.status = 'fulfilled';
        } catch (e) {
          s.status = 'failed';
          s.statusMessage = payload.status;
        }
      },
      [getMatchesWithTickets.rejected]: (state) => {
        console.log('Get Matches with Tickets Failed!!!!');
        const s = state; 
        s.status = 'rejected';
      },
      [getMatchWithTickets.pending]: (state) => {
        console.log('Get Match with Tickets in Progress');
        const s = state; 
        s.status = 'pending';
      },
      [getMatchWithTickets.fulfilled]: (state, { payload }) => {
        const s = state; 
        try {
          s.match = payload.response;
          s.status = 'fulfilled';
        } catch (e) {
          s.status = 'failed';
          s.statusMessage = payload.status;
        }
      },
      [getMatchWithTickets.rejected]: (state) => {
        console.log('Get Match with Tickets Failed!!!!');
        const s = state; 
        s.status = 'rejected';
      },
      [getMatchWithTicketsForFan.pending]: (state) => {
        console.log('Get Match with Tickets For Fan in Progress');
        const s = state; 
        s.status = 'pending';
      },
      [getMatchWithTicketsForFan.fulfilled]: (state, { payload }) => {
        const s = state; 
        try {
          s.match = payload.response;
          s.status = 'fulfilled';
        } catch (e) {
          s.status = 'failed';
          s.statusMessage = payload.status;
         }
      },
      [getMatchWithTicketsForFan.rejected]: (state) => {
        console.log('Get Match with Tickets For Fan Failed!!!!');
        const s = state; 
        s.status = 'rejected';
      }
  }
})

export const selectMatch = (state) => state.match.match;
export const selectAllMatches = (state) => state.match.allMatches;
export const selectMatchStatus = (state) => state.match.status;
export const selectMatchStatusMessage = (state) => state.match.statusMessage;
export default match.reducer;
