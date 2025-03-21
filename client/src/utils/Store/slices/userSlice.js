import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    profileImage: null,
    isLoading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload;
            // If there's a picture in the payload, set it as profile image
            if (action.payload?.picture) {
                state.profileImage = action.payload.picture;
            }
        },
        setProfileImage: (state, action) => {
            state.profileImage = action.payload;
        },
        clearUserData: (state) => {
            state.user = null;
            state.profileImage = null;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setUserData, setProfileImage, clearUserData, setError } = userSlice.actions;
export default userSlice.reducer; 