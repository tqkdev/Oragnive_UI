import { createSlice } from '@reduxjs/toolkit';
import { loginAdmin, logoutAdmin } from './adminApiRequest1';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        login: {
            currentAdmin: null,
            isFetching: false,
            error: false,
        },
        logout: {
            isFetching: false,
            error: false,
        },
    },
    extraReducers: (builder) => {
        builder
            //login
            .addCase(loginAdmin.pending, (state) => {
                state.login.isFetching = true;
                state.login.error = false;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.login.isFetching = false;
                state.login.currentAdmin = action.payload;
                state.login.error = false;
            })
            .addCase(loginAdmin.rejected, (state) => {
                state.login.isFetching = false;
                state.login.error = true;
            })
            //logout
            .addCase(logoutAdmin.pending, (state) => {
                state.logout.isFetching = true;
                state.logout.error = false;
            })
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.logout.isFetching = false;
                state.login.currentAdmin = null;
                state.logout.error = false;
            })
            .addCase(logoutAdmin.rejected, (state) => {
                state.logout.isFetching = false;
                state.logout.error = true;
            });
    },
});

export default adminSlice.extraReducers;
