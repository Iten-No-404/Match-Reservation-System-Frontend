import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
};

  export const addStadium = createAsyncThunk(
    'addStadium',
    async ({query, token}) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add_staduim`, query, {
                headers: {
                  Authorization: 'Bearer ' + token,
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

  export const getStadiums = createAsyncThunk(
    'getStadiums',
    async ({token}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_staduims_info`, {
                headers: {
                  Authorization: 'Bearer ' + token,
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

  export const getStadium = createAsyncThunk(
    'getStadiums',
    async ({token, id}) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_staduim_info/${id}`, {
                headers: {
                  Authorization: 'Bearer ' + token,
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

  const stadium = createSlice({
    name: 'stadium',
    initialState: {
        stadium: {
            staduim_name: "",
            n_seats: 0,
            address: "",
            shape: 0,
            location: ""
          },
        stadiums: [],
        status: 'idle',
        statusMessage: ''
    },
    reducers: {
},
extraReducers: {
  [addStadium.pending]: (state) => {
    console.log('Add Stadium in Progress');
    const s = state; 
    s.status = 'pending';
  },
  [addStadium.fulfilled]: (state, { payload }) => {
    const s = state; 
    try {
      s.stadium = payload.response;
      s.status = 'fulfilled';
    } catch (e) {
      s.status = 'failed';
      s.statusMessage = payload.status;
    }
  },
  [addStadium.rejected]: (state) => {
    console.log('Add new stadium Failed!!!!');
    const s = state; 
    s.status = 'rejected';
  },
  [getStadiums.pending]: (state) => {
    console.log('Get Stadiums in Progress');
    const s = state; 
    s.status = 'pending';
  },
  [getStadiums.fulfilled]: (state, { payload }) => {
    const s = state; 
    try {
      s.stadiums = payload.response.stadiums;
      s.status = 'fulfilled';
    } catch (e) {
      s.status = 'failed';
      s.statusMessage = payload.status;
    }
  },
  [getStadiums.rejected]: (state) => {
    console.log('Get Stadiums Failed!!!!');
    const s = state; 
    s.status = 'rejected';
  },
  [getStadium.pending]: (state) => {
    console.log('Get Stadiums in Progress');
    const s = state; 
    s.status = 'pending';
  },
  [getStadium.fulfilled]: (state, { payload }) => {
    const s = state; 
    try {
      s.stadium = payload.response;
      s.status = 'fulfilled';
    } catch (e) {
      s.status = 'failed';
      s.statusMessage = payload.status;
    }
  },
  [getStadium.rejected]: (state) => {
    console.log('Get Stadiums Failed!!!!');
    const s = state; 
    s.status = 'rejected';
  }
}
})

export const selectStadium = (state) => state.stadium.stadium;
export const selectStadiums = (state) => state.stadium.stadiums;
export const selectStadiumStatus = (state) => state.stadium.status;
export const selectStadiumStatusMessage = (state) => state.stadium.statusMessage;
export default stadium.reducer;
