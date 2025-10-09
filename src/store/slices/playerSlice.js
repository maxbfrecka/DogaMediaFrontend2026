import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { domain } from "../../globalVariables.js"

const playerSlice = createSlice({
  name: "player",
  initialState: {
    nowPlayingTrack: null,
    //we cache them in there so no extra API calls:
    playlist: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setNowPlayingTrack: (state, action) => {
      state.nowPlayingTrack = action.payload
    },
    addToPlaylist: (state, action) => {
      const nothingPlaying = state.nowPlayingTrack === null
      const wasEmpty = state.playlist.length === 0

      state.playlist.push(action.payload)
      console.log(state.playlist)
      if (nothingPlaying) {
        state.nowPlayingTrack = action.payload
        state.playlist.shift() // remove the item we just assigned to nowPlaying
      }
    },
    reducePlaylist: (state, action) => {
      state.playlist.shift()
    },
    //takes index as action.payload to tell which item to remove
    removeTrackFromPlaylist: (state, action) => {
      console.log(action.payload)
      state.playlist.splice(action.payload, 1)
    },
    clearPlaylist: (state, action) => {
      state.playlist = []
    },
  },
})

export const {
  setNowPlayingTrack,
  addToPlaylist,
  reducePlaylist,
  removeTrackFromPlaylist,
  clearPlaylist,
} = playerSlice.actions

export default playerSlice.reducer
