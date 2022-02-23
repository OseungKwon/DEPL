import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------
const API_URL = "http://localhost:8080";
const initialState = {
  isLoading: false,
  error: false,
  commentList: [],
  comment: null,
  index: 0,
  step: 11
};

const slice = createSlice({
  name: "comment",
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
      state.Comments.push(action.payload);
      // state.comment = action.payload;
    },
    // EDIT comment
    editCommentSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.comment = action.payload;
      // state.comment = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getMoreComments } = slice.actions;

// ----------------------------------------------------------------------

export function getcommentList(index, step) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/comment/list`, {
        params: { index, step }
      });
      //console.log(response.data.data)
      // const response = await axios.get('/api/blog/posts', {
      //   params: { index, step },
      // });
      const results = response.data.data.length;
      const { maxLength } = response.data;

      dispatch(slice.actions.getPostsInitial(response.data.data));
      if (results >= maxLength) {
        dispatch(slice.actions.noHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getcomment(commentId) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${API_URL}/comment/view?commentId=${commentId}`,
        {
          params: { commentId: commentId }
        }
      );
      console.log(response, "response");
      dispatch(slice.actions.getcommentSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addcomment(comment) {
  comment.email = "korea4127@gmail.com";
  comment.token =
    "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu";
  comment.category = comment.tags.join(",");
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.comment(
        `${API_URL}/comment/insert`,
        comment,
        {
          params: {
            email: "korea4127@gmail.com",
            token:
              "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu"
          }
        }
      );
      //console.log(response);
      // const response = await axios.comment(`${API_URL}/comment/insert`, null, {
      //   params: comment ,
      // });
      if (response.data.status === 200) {
        dispatch(slice.actions.addcommentSuccess(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editcomment(comment) {
  console.log(comment);
  comment.email = "korea4127@gmail.com";
  comment.token =
    "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu";
  comment.category = comment.tags.join(",");
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.comment(
        `${API_URL}/comment/update`,
        comment,
        {
          params: {
            email: "korea4127@gmail.com",
            token: "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"
          }
        }
      );
      //console.log(response);
      // const response = await axios.comment(`${API_URL}/comment/insert`, null, {
      //   params: comment ,
      // });
      if (response.data.status === 200) {
        dispatch(slice.actions.editcommentSuccess(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
