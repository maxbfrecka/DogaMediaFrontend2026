import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { domain } from "../../globalVariables.js"

// async thunk to fetch releases from your API
export const fetchRelease = createAsyncThunk(
  "release/fetchRelease",
  async (releaseId, thunkAPI) => {
    try {
      const res = await fetch(domain + "releases/getone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ releaseId }),
      })

      // Force error if fetch failed (e.g. 500)
      if (!res.ok) {
        const errorData = await res.json()
        console.error("Lambda error response:", errorData)
        throw new Error(errorData.error || "Server error")
      }

      const raw = await res.text() // <-- use .text() to see what you’re actually getting
      console.log("Raw response:", raw)

      try {
        const data = JSON.parse(raw)
        console.log("Parsed response:", data)
        //construct the object that is inserted into the STATE for caching:
        // releasesByCatNumber: {}
        return { releaseId, data: data }
      } catch (err) {
        console.error("Failed to parse JSON:", err)
      }
    } catch (err) {
      console.error("fetchRelease error:", err)
      return thunkAPI.rejectWithValue(err.message)
    }
  },
  //this is how you can check for cached object first
  {
    condition: (releaseId, { getState }) => {
      const state = getState()
      return !state.release.releasesByIdNumber[releaseId]
    },
  }
)

const releaseSlice = createSlice({
  name: "release",
  initialState: {
    release: null,
    //we cache them in there so no extra API calls:
    releasesByIdNumber: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelease.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchRelease.fulfilled, (state, action) => {
        state.status = "succeeded"
        const { releaseId, data } = action.payload
        state.releasesByIdNumber[releaseId] = data
      })
      .addCase(fetchRelease.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default releaseSlice.reducer
