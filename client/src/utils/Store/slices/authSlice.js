import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isAuthenticated = false;
        }
    }
});

export const {
    setUser,
    logout,
    setError
} = authSlice.actions;

export default authSlice.reducer; 