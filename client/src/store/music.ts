/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IMusic } from "model/IMusic";

const defaultInitialState: { musics: IMusic[]; status: string } = {
  musics: [],
  status: "",
};

export const GetMusic = createAsyncThunk("getMusic", async () => {
  const options = {
    method: "GET",
    url: "https://genius.p.rapidapi.com/artists/16775/songs",
    params: { page: "1", per_page: "50" },
    headers: {
      "X-RapidAPI-Key": "1e179558f1msh80c1752370047b5p122929jsn2b38906dbeda",
      "X-RapidAPI-Host": "genius.p.rapidapi.com",
    },
  };

  const data: { response: { songs: any[] } } = (await axios.request(options))
    .data;

  return data?.response?.songs;
});

export const musicSlice = createSlice({
  name: "music",
  initialState: defaultInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetMusic.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(GetMusic.fulfilled, (state, action) => {
        state.status = "success";
        state.musics = action.payload;
      })
      .addCase(GetMusic.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default musicSlice.reducer;
