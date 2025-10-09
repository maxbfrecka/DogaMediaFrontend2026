import React, { Component, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BsFillPlayFill as Play } from "react-icons/bs"
import { MdPlaylistAddCircle as AddToPlaylist } from "react-icons/md"

import {
  setNowPlayingTrack,
  addToPlaylist,
} from "../../../store/slices/playerSlice"

import styles from "./Tracklist.module.scss"

export default function TrackCard({ track }) {
  const dispatch = useDispatch()

  function randomHex() {
    return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
  }

  function playTrack() {
    dispatch(setNowPlayingTrack(track))
  }
  function addTrackToPlaylist() {
    dispatch(addToPlaylist(track))
  }

  return (
    <div
      className={styles.trackCard}
      style={{ color: randomHex(), backgroundColor: randomHex() }}
    >
      <Play
        className={styles.playTrack}
        style={{ color: randomHex() }}
        onClick={() => playTrack(track)}
      />
      <AddToPlaylist
        className={styles.addTrackToPlaylist}
        style={{ color: randomHex() }}
        onClick={() => addTrackToPlaylist(track)}
      />
      <div className={styles.trackCardNumber}>{track.track_number}</div>
      <div className={styles.trackCardTitle}>{track.title}</div>
      <div
        className={styles.trackCardTime}
        style={{ color: randomHex(), backgroundColor: randomHex() }}
      >
        {track.length}
      </div>
    </div>
  )
}
