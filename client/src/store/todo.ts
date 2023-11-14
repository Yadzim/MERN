/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { ITodo } from "model/ITodo";
import GenerateID from "utils/generateId";

const defaultInitialState: ITodo[] = [];

export const todoData = createSlice({
  name: "todo_data",
  initialState: { todo: defaultInitialState },
  reducers: {
    setTodo: ({ todo }, action) => {
      todo = action.payload;
    },

    removeTodo: (state, { payload }) => {
      state.todo = state.todo
        .filter((e) => e.id !== payload)
        .sort((a, b) => b.date - a.date);
    },

    addTodo: (state, { payload }) => {
      state.todo = [...state.todo, payload].sort((a, b) => b.date - a.date);
    },

    editTodo: (state, { payload }) => {
      state.todo = state.todo
        .map((e) =>
          e.id === payload.id
            ? (e = {
                ...e,
                text: payload.text,
                date: GenerateID(),
                isDone: false,
              })
            : e
        )
        .sort((a, b) => b.date - a.date);
    },

    doneTodo: (state, { payload }) => {
      state.todo = state.todo
        .map((e) =>
          e.id === payload
            ? (e = { ...e, isDone: !e.isDone, date: GenerateID() })
            : e
        )
        .sort((a, b) => b.date - a.date);
    },
  },
});

export const { setTodo, removeTodo, addTodo, editTodo, doneTodo } =
  todoData.actions;
export default todoData.reducer;
