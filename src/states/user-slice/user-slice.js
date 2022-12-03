import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
};

  export const logInThunk = createAsyncThunk(
    'login',
    async ({query, token}) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, query, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            return response;
        }catch (err){
            console.log(err);
            return undefined;
        }
    }
  );

  export const signUpThunk = createAsyncThunk(
    'signUp',
    async ({query, token}) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, query, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            return response;
        }catch (err){
            console.log(err);
            return undefined;
        }
    }
  );

  export const updateUserThunk = createAsyncThunk(
    'updateUser',
    async ({query, token}) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/update`, query, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            return response;
        }catch (err){
            console.log(err);
            return undefined;
        }
    }
  );

  const user = createSlice({
    name: 'user',
    initialState: {
        authToken: "",
        user: {
            uid: null,
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            birthDate: "0000-00-00",
            gender: false,
            nationality: "",
            email: "",
            role:"",
            approved: false,
            admin: false,
        },
        status: 'idle',
        statusMessage: ''
    },
    reducers: {
        /**
         * This function retrives the user's data from local storage.
         * @method
         * @param {object} state The object that stores the current user's data.
         */
        setUser: (state) => {
            const s = state;
            const loggedInUser = localStorage.getItem('user');
            if (loggedInUser) {
              const foundUser = JSON.parse(loggedInUser);
              s.user = foundUser;
              localStorage.clear();
              localStorage.setItem('user', JSON.stringify(state.user));
            }
            else {
              s.user = {
                uid: null,
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                birthDate: "0000-00-00",
                gender: false,
                nationality: "",
                email: "",
                role:"",
                approved: false,
                admin: false,
            };
            }
        },
        /**
         * This function empties the user data.
         * @method
         * @param {object} state The object that stores the current user data.
         */
        logOut: (state) => {
            const s = state;
            s.user = {
                uid: null,
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                birthDate: "0000-00-00",
                gender: false,
                nationality: "",
                email: "",
                role:"",
                approved: false,
                admin: false,
            };
            s.authToken = '';
            localStorage.clear();
            window.location.replace('/');
        }
      },
      extraReducers: {
        [logInThunk.pending]: (state) => {
          console.log('Login in Progress');
          const s = state; 
          s.status = 'pending';
        },
        [logInThunk.fulfilled]: (state, { payload }) => {
          const s = state; 
          try {
            // const resJSON = JSON.parse(payload);
            const resJSON = payload.data;
            s.authToken = resJSON.token;
            s.uuid = resJSON.uuid;
            localStorage.setItem('authToken', s.authToken);
            localStorage.setItem('uuid', s.uuid);
            s.status = 'fulfilled';
          } catch (e) {
            s.status = 'failed';
            s.statusMessage = payload.status;
           }
        },
        [logInThunk.rejected]: (state) => {
          console.log('Login in Failed!!!!');
          const s = state; 
          s.status = 'rejected';
        },
        [signUpThunk.pending]: (state) => {
          console.log('SignUp in Progress');
          const s = state; 
          s.status = 'pending';
        },
        [signUpThunk.fulfilled]: (state, { payload }) => {
          const s = state;
          try {
            // const resJSON = JSON.parse(payload);
            const resJSON = payload.data;
            s.authToken = resJSON.token;
            s.uuid = resJSON.uuid;
            localStorage.setItem('authToken', s.authToken);
            localStorage.setItem('uuid', s.uuid);
            s.status = 'fulfilled';

          } catch (e) {
            s.status = 'failed';
            s.statusMessage = payload;
           }
        },
        [signUpThunk.rejected]: (state) => {
          console.log('SignUp in Failed!!!!');
          const s = state; 
          s.status = 'rejected';
        },
        [updateUserThunk.pending]: () => {
          console.log('UpdateUser in Progress');
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
          state.user = payload.data;
        },
        [updateUserThunk.rejected]: () => {
          console.log('UpdateUser in Failed!!!!');
        }
        },
})

export const selectUser = (state) => state.user.user;
export const selectUserAuthToken = (state) => state.user.authToken;
export const selectUserStatus = (state) => state.user.status;
export const selectUserStatusMessage = (state) => state.user.statusMessage;
export const { setUser, logOut } = user.actions;
export default user.reducer;
