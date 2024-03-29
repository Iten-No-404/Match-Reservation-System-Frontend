import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

  export const logInThunk = createAsyncThunk(
    'login',
    async (query) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, query, {
                headers: {
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
  
  export const signUpThunk = createAsyncThunk(
    'signUp',
    async (query) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, query, {
                headers: {
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

  export const updateUserThunk = createAsyncThunk(
    'updateUser',
    async ({query, token}) =>{
      try{
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/change_user_info`, query, {
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

  export const logOutThunk = createAsyncThunk(
    'logOut',
    async ({token}) =>{
      try{
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Logout_user`, {
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

  export const approveUserThunk = createAsyncThunk(
    'approveUser',
    async ({query, token}) =>{
      try{
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/approve_user`,query, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                }
              });
            return response;
        }catch (err){
          console.log(err);
          return err.response.data;
        }
    }
  );

  export const deleteUserThunk = createAsyncThunk(
    'deleteUser',
    async ({query, token}) =>{
      try{
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_user`, {
                headers: {
                  Authorization: 'Bearer ' + token,
                  ...headers
                },
                data: query
              });
            return response;
        }catch (err){
          console.log(err);
          return err.response.data;
        }
    }
  );

  export const getUsersThunk = createAsyncThunk(
    'getUsers',
    async ({token}) =>{
      try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/all_users_admin`, {
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
            gender: 0,
            access_token: "",
            nationality: "",
            email: "",
            role:"",
            approved: 0,
            admin: 0
        },
        users: [],
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
              s.authToken = s.user.access_token;
              localStorage.clear();
              localStorage.setItem('user', JSON.stringify(state.user));
              localStorage.setItem('authToken', s.user.access_token);
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
        * This function sets the email of the User in the User State
        * @method
        * @param {object} state The object that stores the User's email, password, age and other info
        * @param {object} action The object containing the User's email to be added to the state
        */
        setEmail: (state, action) => {
          state.user.email = action.payload;
        },
        /**
        * This function sets the password of the User in the User State
        * @method
        * @param {object} state The object that stores the User's email, password, age and other info
        * @param {object} action The object containing the User's password to be added to the state
        */
        setPassword: (state, action) => {
          state.user.password = action.payload;
        },
        /**
        * This function sets the Username of the User in the User State
        * @method
        * @param {object} state The object that stores the User's email, password, age and other info
        * @param {object} action The object containing the User's UserName to be added to the state
        */
        setUsername: (state, action) => {
          state.user.username = action.payload;
        },
        /**
        * This function sets the authentication token of the User in the User State
        * @method
        * @param {object} state The object that stores the User's auth token
        * @param {object} action The object containing the User's UserName to be added to the state
        */
        setAuthToken: (state, action) => {
          state.user.authToken = action.payload;
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
        },
        /**
        * This function resets the status message state
        * @method
        * @param {object} state The object that stores the current Status Message
        */
        setStatusMessage: (state) => {
          state.statusMessage = '';
        },
        /**
        * This function resets the status state
        * @method
        * @param {object} state The object that stores the current Status number
        */
        setStatus: (state) => {
          state.status = null;
        },
      },
      extraReducers: {
        [logInThunk.pending]: (state) => {
          console.log('Login in Progress');
          const s = state; 
          s.status = 'pending';
        },
        [logInThunk.fulfilled]: (state, {payload} ) => {
          const s = state; 
          // console.log(payload);
          try {
            if(payload.meta.status === "200"){
              s.user = payload.response; 
              // console.log(payload);
              s.authToken = payload.response.access_token;
              localStorage.setItem('user', JSON.stringify(s.user));
              localStorage.setItem('authToken', s.authToken);
              s.status = 'fulfilled';
              s.statusMessage = '';
            } else {
              s.status = 'failed';
              s.statusMessage = payload.meta.msg;
            }
          } catch (e) {
            console.log("WRONG !!!!!!!!!!");
            // console.log(payload);
            s.status = 'failed';
            s.statusMessage = payload.meta.msg;
          }
        },
        [logInThunk.rejected]: (state) => {
          console.log('Login Failed!!!!');
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
            // console.log(payload);
            if(payload.meta.status === "200"){
              s.user = payload.response; 
              s.authToken = payload.response.access_token;
              // localStorage.setItem('user', JSON.stringify(s.user));
              // localStorage.setItem('authToken', s.authToken);
              s.status = 'fulfilled';
              s.statusMessage = '';
            } else {
              s.status = 'failed';
              s.statusMessage = payload.meta.msg;
            }
          } catch (e) {
            s.status = 'failed';
            // s.statusMessage = payload.meta.msg;
          }
        },
        [signUpThunk.rejected]: (state) => {
          console.log('SignUp Failed!!!!');
          const s = state; 
          s.status = 'rejected';
        },
        [updateUserThunk.pending]: () => {
          console.log('Update User in Progress');
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
          const s = state;
          try {
            // console.log(payload);
            if(payload.meta.status === "200"){
              s.user = payload.response; 
              s.user.access_token = s.authToken;
              localStorage.setItem('user', JSON.stringify(s.user));
              s.status = 'fulfilled';
              s.statusMessage = '';
            } else {
              s.status = 'failed';
              s.statusMessage = payload.meta.msg;
            }
          } catch (e) {
            s.status = 'failed';
            // s.statusMessage = payload.meta.msg;
          }
        },
        [updateUserThunk.rejected]: () => {
          console.log('Update User Failed!!!!');
        },
        [logOutThunk.pending]: () => {
          console.log('LogOut in Progress');
        },
        [logOutThunk.fulfilled]: (state, { payload }) => {
          // console.log(payload);
          state.authToken =  "";
          state.users = [];
          state.status = 'idle';
          state.statusMessage = '';
          state.user = {
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
          localStorage.clear();
          window.location = '/';
        },
        [logOutThunk.rejected]: () => {
          console.log('LogOut Failed!!!!');
        },
        [approveUserThunk.pending]: () => {
          console.log('Approve User in Progress');
        },
        [approveUserThunk.fulfilled]: (state, { payload }) => {
          // console.log(payload);
          // state.users = payload.response.users;
          // state.user = payload;
        },
        [approveUserThunk.rejected]: () => {
          console.log('Approve User Failed!!!!');
        },
        [deleteUserThunk.pending]: () => {
          console.log('Delete User in Progress');
        },
        [deleteUserThunk.fulfilled]: (state, { payload }) => {
          // console.log(payload);
          // state.user = payload;
        },
        [deleteUserThunk.rejected]: () => {
          console.log('Delete User Failed!!!!');
        },
        [getUsersThunk.pending]: () => {
          console.log('Get Users in Progress');
        },
        [getUsersThunk.fulfilled]: (state, { payload }) => {
          // console.log(payload);
          state.users = payload.response.users;
        },
        [getUsersThunk.rejected]: () => {
          console.log('Get Users Failed!!!!');
        }
        },
})

export const selectUser = (state) => state.user.user;
export const selectAllUsers = (state) => state.user.users;
export const selectUserAuthToken = (state) => state.user.user.access_token;
export const selectUserStatus = (state) => state.user.status;
export const selectUserStatusMessage = (state) => state.user.statusMessage;
export const { setUser, setEmail, setPassword, setUsername, logOut, setStatusMessage, setStatus, setAuthToken } = user.actions;
export default user.reducer;
