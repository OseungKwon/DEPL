import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import Axios from "axios";
import { accessToken } from "__mocks__/userID";
// ----------------------------------------------------------------------
const API_URL =
  "https://6mstom4jod.execute-api.ap-northeast-2.amazonaws.com/dev/v1";
const initialState = {
  isLoading: false,
  error: false,
  commentList: [],
  comment: null,
  index: 0,
  step: 11
};

const slice = createSlice({
  name: "commentSample",
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

    // GET comment list
    getCommentListSuccess(state, action) {
      state.isLoading = false;
      state.commentList = action.payload;
    },

    // ADD comment
    addCommentSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.comment = action.payload;
      // state.comment = action.payload;
    },
    // EDIT comment
    editCommentSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.comment = action.payload;
      // state.comment = action.payload;
    },
    removeCommentSuccess(state, action) {
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getMoreComments } = slice.actions;

// ----------------------------------------------------------------------

export function addComment(comment) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin":
            "https://6mstom4jod.execute-api.ap-northeast-2.amazonaws.com",
          Authorization: accessToken
        }
      };
      const response = await Axios.post(
        `${API_URL}/qnas/comments`,
        comment,
        axiosConfig
      );

      console.log(response.status);
      if (response.status === 200) {
        dispatch(slice.actions.addCommentSuccess(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function removeComment(qnaId, commentId) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin":
            "https://6mstom4jod.execute-api.ap-northeast-2.amazonaws.com",
          Authorization: accessToken
        }
      };
      const response = await Axios.delete(
        `${API_URL}/qnas/${qnaId}/comments/${commentId}/hard`,
        axiosConfig
      );

      console.log(response.status);
      if (response.status === 200) {
        console.log(response);
        dispatch(slice.actions.removeCommentSuccess(response.data.data));
        // return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editComment(qnaId, commentId, data) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin":
            "https://6mstom4jod.execute-api.ap-northeast-2.amazonaws.com",
          Authorization: accessToken
        }
      };
      const response = await Axios.put(
        `${API_URL}/qnas/${qnaId}/comments/${commentId}`,
        data,
        axiosConfig
      );

      console.log(response.status);
      if (response.status === 200) {
        console.log(response);
        dispatch(slice.actions.editCommentSuccess(response.data.data));
        // return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
