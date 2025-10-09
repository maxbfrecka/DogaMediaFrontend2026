import React from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  setNowPlayingTrack,
  reducePlaylist,
  addToPlaylist,
} from "../../store/slices/playerSlice"

import "../../css/Playlist.css"

export default function Playlist() {
  const dispatch = useDispatch()
  const tracks = useSelector((state) => state.player.playlist)

  function playlist(tracks) {
    console.log(tracks)
    return (
      <>
        {tracks.map((track, index) => (
          <div className="playlistTrack" key={index}>
            <img className="playlistCoverImage" src={track.cover_image} />
            <div className="playlistTrackTitle">{track.title}</div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {tracks.length > 0 && (
        <div className="playlistOuter">
          NXT:
          <div className="playlist">{playlist(tracks)}</div>
        </div>
      )}
    </>
  )
}
