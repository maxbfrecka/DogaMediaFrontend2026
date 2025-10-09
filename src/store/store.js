import { configureStore } from "@reduxjs/toolkit"
import releasesReducer from "./slices/releasesSlice"
import releaseReducer from "./slices/releaseSlice"
import playerReducer from "./slices/playerSlice"

export const store = configureStore({
  reducer: {
    releases: releasesReducer,
    release: releaseReducer,
    player: playerReducer,
  },
})
