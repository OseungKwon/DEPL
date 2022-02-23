import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// slices
import authReducer from "./slices/auth";
import blogReducer from "./slices/blog";
import userReducer from "./slices/user";
import qnaReducer from "./slices/qna";
import likeReducer from "./slices/like";
import tagReducer from "./slices/tags";
import commentSampleReducer from "./slices/commentSample";

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: []
};

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  qna: qnaReducer,
  user: userReducer,
  like: likeReducer,
  tag: tagReducer,
  //sample(api 연됭되면 qna 사용할 예정)
  commentSample: commentSampleReducer
});

export { rootPersistConfig, rootReducer };
