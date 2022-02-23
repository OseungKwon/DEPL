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
  qnaList: [],
  qna: null,
  recentQnas: [],
  hasMore: true,
  index: 0,
  step: 11
};

const slice = createSlice({
  name: "qna",
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
    getQnasSuccess(state, action) {
      state.isLoading = false;
      state.qnaList = action.payload;
    },

    // GET qna INFINITE
    getQnasInitial(state, action) {
      state.isLoading = false;
      state.qnaList = action.payload;
    },
    getQnaSuccess(state, action) {
      state.isLoading = false;
      state.qna = action.payload;
    },
    addQnaSuccess(state, action) {
      state.isLoading = false;
    },

    removeQnaSuccess(state) {
      state.isLoading = false;
    },
    toggleLikeSuccess(state) {
      state.isLoading = false;
    },
    viewCountSuccess(state) {
      state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getMoreqnas } = slice.actions;

// ----------------------------------------------------------------------
export function getQnasInitial() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await Axios.get(`${API_URL}/qnas`);
      console.log(response.data.data);

      dispatch(slice.actions.getQnasInitial(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getQna(qnaId) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await Axios.get(`${API_URL}/qnas/${qnaId}`);
      await dispatch(slice.actions.getQnaSuccess(response.data.data));
      console.log(response.data.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addQna(data) {
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
      const response = await Axios.post(`${API_URL}/qnas`, data, axiosConfig);
      dispatch(slice.actions.addQnaSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editQna(qnaId, data) {
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
        `${API_URL}/qnas/${qnaId}`,
        data,
        axiosConfig
      );
      dispatch(slice.actions.editQnaSuccess(response.data.data));
      console.log(response.data.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function removeQna(qnaId, user) {
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
        `${API_URL}/qnas/${qnaId}`,
        axiosConfig
      );
      dispatch(slice.actions.removeQnaSuccess(response.data.data));
      console.log(response.data.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function toggleLike(qnaId, like) {
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
      if (like === false) {
        const response = await Axios.post(
          `${API_URL}/qnas/likes`,
          { qna_id: qnaId },
          axiosConfig
        );
        dispatch(slice.actions.toggleLikeSuccess(response.data.data));
        console.log(response.data.data);
      } else {
        const response = await Axios.delete(
          `${API_URL}/qnas/${qnaId}/likes`,
          axiosConfig
        );
        dispatch(slice.actions.toggleLikeSuccess(response.data.data));
        console.log(response.data.data);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function viewQnaCount(qnaId) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await Axios.put(`${API_URL}/qnas/${qnaId}/views`);
      dispatch(slice.actions.viewCountSuccess(response.data.data));
      console.log(response.data.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
