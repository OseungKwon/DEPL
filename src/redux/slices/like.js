import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------
const API_URL = "http://localhost:8080";
const initialState = {
  isLoading: false,
  error: false,
  commentList: [],
  comment: null,
  index: 0,
  step: 11,
};

const slice = createSlice({
  name: 'like',
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

     // like
    editLikesSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.like += action.payload;
      // state.comment = action.payload;
    },
   
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getMoreComments } = slice.actions;


// ----------------------------------------------------------------------

export function getLikesCount(contentId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/comment/view?commentId=${commentId}`, {
        params: { commentId : commentId },
      });
      console.log(response, "response");
      dispatch(slice.actions.getcommentSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function editLikes(requsetBody, contentType) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`${API_URL}/${contentType}/editLikes`,
        requsetBody, {
        params: {
          contentType: contentType,  
          email: "korea4127@gmail.com",
          token: "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"
        }
      });
     
      if (response.data.status === 200) {
        dispatch(slice.actions.editLikesSuccess(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};

// ----------------------------------------------------------------------
