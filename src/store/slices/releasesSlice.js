import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { domain } from "../../globalVariables.js"

// async thunk to fetch releases from your API
export const fetchReleases = createAsyncThunk(
  "releases/fetchReleases",
  async () => {
    const response = await fetch(domain + "releases/getall")
    if (!response.ok) throw new Error("Failed to fetch releases")
    return await response.json() // assuming it returns a JSON array
  }
)

const releasesSlice = createSlice({
  name: "releases",
  initialState: {
    releases: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    highlights: true,
  },
  reducers: {
    setHighlights: (state, action) => {
      state.highlights = !state.highlights
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReleases.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchReleases.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.releases = action.payload
      })
      .addCase(fetchReleases.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { setHighlights } = releasesSlice.actions

export default releasesSlice.reducer
