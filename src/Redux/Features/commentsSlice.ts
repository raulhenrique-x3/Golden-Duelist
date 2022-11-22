import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userComments } from "../../const/userComments";

interface CommentState {
  comment: string;
  commentsQuantity: number;
  likeComment: number;
  id: number;
  text: string[];
  comments: any;
}

const initialState = {
  comments: userComments,
  commentsQuantity: 0,
  likeComment: 0,
} as CommentState;

const commentSlice = createSlice({
  name: "Comments",
  initialState,
  reducers: {
    addComment(state, action) {
      const userComment = {
        userID: Math.floor(1000 + Math.random() * 9999),
        userComment: action.payload,
        likeComment: 0,
      };
      state.comments.push(userComment);
      state.commentsQuantity += 1;
    },
    editComment(state, action) {},
    removeComment(state, action) {},
    likeComment(state, action) {},
  },
});

export const { addComment } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
