import React, { Component, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { fetchRelease } from "../../store/slices/releaseSlice"
import {
  setNowPlayingTrack,
  addToPlaylist,
  clearPlaylist,
} from "../../store/slices/playerSlice"

import ReleasesBanner from "./ReleasesBanner"
import Release from "./Release"

export default function ReleasePage() {
  //single page to combine banner and page
  return (
    <div releasePageContainer>
      <ReleasesBanner />
      <Release />
    </div>
  )
}
