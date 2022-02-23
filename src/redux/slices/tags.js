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
  tagList: [],
  hasMore: true,
  index: 0,
  step: 11
};

const slice = createSlice({
  name: "tags",
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

    // GET qnaS
    getTagsSuccess(state, action) {
      state.isLoading = false;
      state.qnaList = action.payload;
    },

    // GET qna INFINITE
    getTagsInitialSuccess(state, action) {
      state.isLoading = false;
      state.tagList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getTagsInitial() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await Axios.get(`${API_URL}/tags`);
      console.log(response.data.data);

      dispatch(slice.actions.getTagsInitialSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
