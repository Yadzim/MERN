/** @format */

import { configureStore } from "@reduxjs/toolkit";
import music from "./music";
import todo from "./todo";
import ui from "./ui";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    music,
    todo,
    ui,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
