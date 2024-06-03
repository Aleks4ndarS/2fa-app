import { createSlice } from '@reduxjs/toolkit';
import { resetAppState } from '../actions/actions';
import { hashPassword } from '../utils/crypto';

const initialProfileState = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    telephone: '',
    language: '',
    role: '',
};

const initialState = {
    isAuthenticated: false,
    is2FAVerified: false,
    error: null,
    loggedInUsername: null,
    users: [
        {
            username: 'test',
            password: hashPassword('test'),
            profile: { ...initialProfileState }
        }
    ]
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { username, password } = action.payload;
            const user = state.users.find(user => user.username === username);
            if (user && user.password === password) {
                state.isAuthenticated = true;
                state.loggedInUsername = username;
                state.error = null;
            } else {
                state.error = 'Invalid credentials';
            }
        },
        update2FA() {
            const new2faCode = Math.floor(100000 + Math.random() * 900000);
            localStorage.setItem('2faCode', new2faCode);
        },
        verify2FA(state) {
            state.is2FAVerified = true;
        },
        remove2FA(state) {
            state.is2FAVerified = false
            localStorage.removeItem('2faCode');
        },
        logout() {
            //resetAppState extraReducer returns the initial state
            localStorage.removeItem('2faCode');
        },
        addUser(state, action) {
            const { username, password } = action.payload;
            state.users.push({
                username,
                password: hashPassword(password),
                profile: { ...initialProfileState }
            });
            state.error = null
        },
        updateProfile(state, action) {
            const profile = action.payload;
            const user = state.users.find(user => user.username === state.loggedInUsername);
            if (user) {
                user.profile = { ...user.profile, ...profile };
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(resetAppState, () => initialState);
    },
});

export const { login, update2FA, verify2FA, remove2FA, logout, addUser, updateProfile } = authSlice.actions;
export default authSlice.reducer;