import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils/api";
import { toast } from "react-toastify";

// Helper function to get user from localStorage
const getUserFromStorage = () => {
    try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return null;
    }
};

const initialState = {
    loading: false,
    error: null,
    user: getUserFromStorage(),
    isAuthenticated: !!localStorage.getItem("token")
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        // console.log(data);
        const res = await axios.post(`${BASE_URL}/auth/login`, data);
        // console.log(res);
        localStorage.setItem("token",res.data.token);  
        localStorage.setItem("user",JSON.stringify(res.data.user));
        return res.data;
    } catch (error) {
        // console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        // console.log(data);
        const res = await axios.post(`${BASE_URL}/auth/register`, data);
        // console.log(res);
        localStorage.setItem("token",res.data.token);  
        localStorage.setItem("user",JSON.stringify(res.data.user));
        return res.data;
    } catch (error) {
        // console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const googleSignup = createAsyncThunk("auth/googleSignup", async (response, thunkAPI) => {
    try {
        // console.log(response);
        const res = await axios.post(`${BASE_URL}/auth/google-signup`, response);
        // console.log(res);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const verifyEmail = createAsyncThunk("auth/verifyEmail", async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/verify-email`, data);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getUser = createAsyncThunk(
    "auth/getUser", 
    async (id, thunkAPI) => {
        try {
            // console.log(id);    
            const res = await axios.get(`${BASE_URL}/auth/getUser/${id}`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },  
            });
            return res.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
                toast.success(action.payload.message);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                toast.error(action.payload.message);
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
                toast.success(action.payload.message);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                toast.error(action.payload.message);
            })

            .addCase(googleSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
                toast.success(action.payload.message);
            })
            .addCase(googleSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                toast.error(action.payload.message);
            })

            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                toast.success(action.payload.message);
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload.message);
            })

            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.user = null;
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
