
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------
const API_URL = "http://localhost:8080";
// http://localhost:8080/login/github
const initialState = {
  isLoading: false,
  error: false,
  login: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

     // REGISTER
    registerSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.posts.push(action.payload)
      // state.post = action.payload;
    },
   
  },
});

// Reducer
export default slice.reducer;

export function login({ loginType, email, password }){
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(`${API_URL}/login/${loginType}`, {
                email,
                password
            });
            console.log(response.data.data.url);
            //window.location.href(response.data.data.url);
            window.open(response.data.data.url);
            dispatch(slice.actions.loginSuccess(response.data.data));
        } catch (error) {
            console.error(error);
            dispatch(slice.actions.hasError(error));
        }   
    };
};