import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Todo/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer, 
  },
});


