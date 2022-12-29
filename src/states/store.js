import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice/user-slice';
import stadiumReducer from './stadium-slice/stadium-slice';
import matchReducer from './match-slice/match-slice';
import ticketReducer from './ticket-slice/ticket-slice';

const store = configureStore({
    /**
     * configure the store with all needed slices
     */
    reducer: {
        match: matchReducer,
        stadium: stadiumReducer,
        ticket: ticketReducer,
        user: userReducer
    },
});

export default store;