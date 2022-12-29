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
            return response.data;
        }catch (err){
            console.log(err);
            return undefined;
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
        status: 'idle',
        statusMessage: ''
    },
    reducers: {
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
        }
    }}
})

export const selectStadium = (state) => state.stadium.stadium;
export const selectStatus = (state) => state.stadium.status;
export const selectStatusMessage = (state) => state.stadium.statusMessage;
export default stadium.reducer;
