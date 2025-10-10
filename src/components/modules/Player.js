import React, { lazy, Suspense, useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

import Waveform from "./Waveform"
import Playlist from "./Playlist"

import {
  setNowPlayingTrack,
  reducePlaylist,
  addToPlaylist,
} from "../../store/slices/playerSlice"

import * as Icons from "../../icons"

import "../../css/Player.scss"

//ICONS
import { BsFillPlayFill as Play } from "react-icons/bs"
import { BsFillPauseFill as Pause } from "react-icons/bs"
import { IoIosArrowDroprightCircle as Right } from "react-icons/io"
import { IoIosArrowDropleftCircle as Left } from "react-icons/io"

export default function Player() {
  const playerRef = useRef()
  const dispatch = useDispatch()
  const playlist = useSelector((state) => state.player.playlist)
  const nowPlayingTrack = useSelector((state) => state.player.nowPlayingTrack)

  //gpt said this would fix the mobile playback issue. i dont understand it
  useEffect(() => {
    // for iOS / mobile browsers that block audio
    const unlockAudio = () => {
      const audio = playerRef.current?.audio?.current
      if (audio) {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("Play prevented until user interaction:", err)
          })
        }
      }
      // remove listeners after first tap
      window.removeEventListener("touchstart", unlockAudio)
      window.removeEventListener("click", unlockAudio)
    }

    window.addEventListener("touchstart", unlockAudio)
    window.addEventListener("click", unlockAudio)

    return () => {
      window.removeEventListener("touchstart", unlockAudio)
      window.removeEventListener("click", unlockAudio)
    }
  }, [])

  //on ending, goes to playlist object and pops track
  const getNextTrack = () => {
    const audio = playerRef.current?.audio?.current
    dispatch(setNowPlayingTrack(null))
    if (playlist.length > 0) {
      dispatch(setNowPlayingTrack(playlist[0]))
      dispatch(reducePlaylist()) // shifts 1 off the front
    } else {
      if (audio) {
        audio.currentTime = 0
        //"audio.stop is not a function"
        //audio.stop()
      }
      dispatch(setNowPlayingTrack(null)) // optional fallback
    }
  }

  const handleClickBack = () => {
    const audio = playerRef.current?.audio?.current
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
  }

  return (
    <>
      <div className="playerTop"></div>
      <div className="player">
        {/* playertop difference thing in other file */}
        <img
          className="nowPlayingCoverArt"
          src={nowPlayingTrack?.cover_image || null}
        />
        <div className="nowPlayingTitle">{nowPlayingTrack?.title || null}</div>
        <AudioPlayer
          className="audioPlayer"
          ref={playerRef}
          autoPlay
          src={nowPlayingTrack?.audio_url || ""}
          onPlay={(e) => console.log("onPlay")}
          onEnded={getNextTrack}
          onClickNext={getNextTrack}
          onClickPrevious={handleClickBack}
          showSkipControls={true}
          showJumpControls={false}
          customIcons={{
            play: <Icons.Play className="playButton" />,
            pause: <Pause className="pauseButton" />,
            loopOff: <Icons.Play className="hiddenIcon" />,
            loop: <Icons.Play className="hiddenIcon" />,
            next: <Right className="nextTrack" />,
            previous: <Left className="lastTrack" />,
            // pause: <Pause size={24} color="#fff700" />,
            // volume: <Volume2 size={20} color="#fff700" />,
            // volumeMute: <VolumeX size={20} color="#fff700" />,
          }}
          // other props here
        />
        {/* {nowPlayingTrack?.audio_file && (
        <Waveform audioUrl={nowPlayingTrack?.audio_file} />
      )} */}
        {/* {nowPlayingTrack?.audio_file && (
        <Waveform audioUrl={nowPlayingTrack?.audio_file} />
      )}

        {/* <div className="playerNowPlaying">
          <div>{nowPlayingTrack?.title || null}</div>
          <img
            className="nowPlayingCoverArt"
            src={nowPlayingTrack?.cover_image || null}
          />
        </div> */}
      </div>
    </>
  )
}
