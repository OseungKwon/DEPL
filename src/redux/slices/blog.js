import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------
const API_URL = "http://localhost:8080";
const initialState = {
  isLoading: false,
  error: false,
  posts: [],
  post: null,
  recentPosts: [],
  hasMore: true,
  index: 0,
  step: 11,
};

const slice = createSlice({
  name: 'blog',
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

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET POST INFINITE
    getPostsInitial(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    getMorePosts(state) {
      const setIndex = state.index + state.step;
      state.index = setIndex;
    },

    noHasMore(state) {
      state.hasMore = false;
    },

    // GET POST
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.post = action.payload;
    },

    // GET RECENT POST
    getRecentPostsSuccess(state, action) {
      state.isLoading = false;
      state.recentPosts = action.payload;
    },

     // ADD POST
    addPostSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.posts.push(action.payload)
      // state.post = action.payload;
    },
    // EDIT POST
    editPostSuccess(state, action) {
      state.isLoading = false;
      //console.log(state, "state");
      //console.log(action, "action");
      state.post = action.payload;
      // state.post = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getMorePosts } = slice.actions;

// ----------------------------------------------------------------------

export function getAllPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/post/list`);
      //const response = await axios.get('/api/blog/posts/all');
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPostsInitial(index, step) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/post/list`, {
        params: { index, step },
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

// ----------------------------------------------------------------------

export function getPost(postId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/post/view?postId=${postId}`, {
        params: { postId : postId },
      });
      console.log(response, "response");
      dispatch(slice.actions.getPostSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addPost(post) {
  post.email = "korea4127@gmail.com";
  post.token = "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu";
  post.category = post.tags.join(",");
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${API_URL}/post/insert`, post, {
        params: {
          email: "korea4127@gmail.com",
          token: "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu"
        }
      });
      //console.log(response);
      // const response = await axios.post(`${API_URL}/post/insert`, null, {
      //   params: post ,
      // });
      if (response.data.status === 200) {
        dispatch(slice.actions.addPostSuccess(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};


export function editPost(post) {
  console.log(post);
  post.email = "korea4127@gmail.com";
  post.token = "ya29.a0ARrdaM_pgXp_BDrQ_jvXiR2-nEE5gNFMudlNFVhE-Reu8ckz7vZvK-dEptDT8DR9MW7mcywcWbjBgLwMZl17D4N3JurOMjVZxexuhcOL1rYVWdfDdRqu5Xz17SWPzaGIfjBy_4mbWlJLJN188Ya-KqFRbXmu";
  post.category = post.tags.join(",");
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`${API_URL}/post/update`, post, {
        params: {
          email: "korea4127@gmail.com",
          token: "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"
        }
      });
      //console.log(response);
      // const response = await axios.post(`${API_URL}/post/insert`, null, {
      //   params: post ,
      // });
      if (response.data.status === 200) {
        dispatch(slice.actions.editPostSuccess(response.data.data));
        return response.data.data;
      }
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};

// ----------------------------------------------------------------------

export function getRecentPosts(title) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title },
      });

      dispatch(slice.actions.getRecentPostsSuccess(response.data.recentPosts));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
