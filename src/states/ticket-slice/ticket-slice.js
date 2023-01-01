import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
};

  export const addTickets = createAsyncThunk(
    'addTickets',
    async ({query, token}) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add_tickets`, query, {
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

  export const deleteTicket = createAsyncThunk(
    'deleteTicket',
    async ({ id, token}) =>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_ticket/${id}`, {
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

  export const getTickets = createAsyncThunk(
    'getTickets',
    async ({ id, token}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_tickets`, {
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

  const ticket = createSlice({
    name: 'ticket',
    initialState: {
        ticket: {
            match_id: 0,
            price: 0.0,
            // n_tickets: 0,
            row: 0,
            seat: 0,
            level: 0
        },
        tickets: [],
        status: 'idle',
        statusMessage: ''
    },
    reducers: {
},
extraReducers: {
  [addTickets.pending]: (state) => {
    console.log('Add Tickets in Progress');
    const s = state; 
    s.status = 'pending';
  },
  [addTickets.fulfilled]: (state, { payload }) => {
    const s = state; 
    console.log("Add Tickets Successful!!");
    try {
      // s.ticket = payload.response;
      s.status = 'fulfilled';
    } catch (e) {
      s.status = 'failed';
      s.statusMessage = payload.status;
     }
  },
  [addTickets.rejected]: (state) => {
    console.log('Add Tickets Failed!!!!');
    const s = state; 
    s.status = 'rejected';
  },
  [deleteTicket.pending]: (state) => {
    console.log('Delete Ticket in Progress');
    const s = state; 
    s.status = 'pending';
  },
  [deleteTicket.fulfilled]: (state, { payload }) => {
    const s = state; 
    console.log("Successful!!");
    console.log(payload);
    try {
      // s.ticket = payload.response;
      s.status = 'fulfilled';
    } catch (e) {
      s.status = 'failed';
      s.statusMessage = payload.status;
     }
  },
  [deleteTicket.rejected]: (state) => {
    console.log('Delete Ticket Failed!!!!');
    const s = state; 
    s.status = 'rejected';
  },
  [getTickets.pending]: (state) => {
    console.log('Get Tickets in Progress');
    const s = state; 
    s.status = 'pending';
  },
  [getTickets.fulfilled]: (state, { payload }) => {
    const s = state; 
    try {
      s.tickets = payload.response.tickets;
      s.status = 'fulfilled';
    } catch (e) {
      s.status = 'failed';
      s.statusMessage = payload.status;
     }
  },
  [getTickets.rejected]: (state) => {
    console.log('Get Tickets Failed!!!!');
    const s = state; 
    s.status = 'rejected';
  }
}
})

export const selectTicket = (state) => state.ticket.ticket;
export const selectTickets = (state) => state.ticket.tickets;
export const selectTicketStatus = (state) => state.ticket.status;
export const selectTicketStatusMessage = (state) => state.ticket.statusMessage;
export default ticket.reducer;
