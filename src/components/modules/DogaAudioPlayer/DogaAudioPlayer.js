import React, { lazy, Suspense, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

import ThePlayer from "./ThePlayer"
import Visualizer from "../Visualizer/Visualizer"
import Waveform from "../Waveform"
import Playlist from "../Playlist"

import {
  setNowPlayingTrack,
  reducePlaylist,
  addToPlaylist,
} from "../../../store/slices/playerSlice"

import { HiMiniPlayPause } from "react-icons/hi2"
import { BsSkipForward } from "react-icons/bs"
import { SlMinus as Minus } from "react-icons/sl"
import { BsFillPlayFill as PlayItem } from "react-icons/bs"
import { PiHeartStraightDuotone as Heart } from "react-icons/pi"
import { GoUnmute as Unmuted } from "react-icons/go"
import { GoMute as Muted } from "react-icons/go"
import { FaShuffle as Shuffle } from "react-icons/fa6"

import styles from "./DogaAudioPlayer.module.scss"

export default function DogaAudioPlayer() {
  const playerRef = useRef()
  const dispatch = useDispatch()
  const playlist = useSelector((state) => state.player.playlist)
  const nowPlayingTrack = useSelector((state) => state.player.nowPlayingTrack)
  console.log("crossOrigin =", playerRef.current?.crossOrigin)
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
        audio.stop()
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
      {/* <AudioPlayer
        ref={playerRef}
        autoPlay
        src={nowPlayingTrack?.audio_file || ""}
        onPlay={(e) => console.log("onPlay")}
        onEnded={getNextTrack}
        onClickNext={getNextTrack}
        onClickPrevious={handleClickBack}
        showSkipControls={true}
        showJumpControls={false}
        // other props here
      /> */}

      {nowPlayingTrack?.audio_file && (
        <>
          <ThePlayer src={nowPlayingTrack.audio_file} audioRef={playerRef} />
          <div className={styles.playerComponent}>
            <div className={styles.playerContainer}>
              <div className={styles.player}>
                <>
                  <div className={styles.nowPlayingInfo}>
                    <img
                      className={styles.nowPlayingAlbumArt}
                      src={nowPlayingTrack?.cover_image || null}
                    />

                    <div className={styles.nowPlayingText}>
                      <div className={styles.nowPlayingRelease}>
                        <div className={styles.nowPlayingTrack}>
                          {nowPlayingTrack?.title || null}
                        </div>
                        <div className={styles.nowPlayingArtist}>
                          {nowPlayingTrack?.artist || null}
                        </div>
                        <div className={styles.nowPlayingRelease}>
                          {nowPlayingTrack?.release || null}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <Heart
                    className="addFavoriteTrack"
                    onClick={handleSetFavoriteTrack}
                  /> */}

                  <div className={styles.playerControls}>
                    <div className={styles.playerTimeDisplay}>
                      {timeFormat(34)}{" "}
                      <div className={styles.durationDisplay}>
                        {timeFormat(1234)}
                      </div>
                    </div>

                    <input
                      className={styles.seekControl}
                      type="range"
                      min="0"
                      // max={duration}
                      step="1"
                      // value={currentTime}
                      // onChange={(e) => seek(e)}
                    />
                    <div className={styles.pausePlayControl}>
                      <HiMiniPlayPause />
                    </div>
                    <BsSkipForward className={styles.skipControl} />
                    <div className={styles.muteIcons}>
                      {/* {muted ? (
                        <Muted onClick={toggleMute} />
                      ) : (
                        <Unmuted onClick={toggleMute} />
                      )} */}
                    </div>
                    <input
                      className={styles.volumeControl}
                      type="range"
                      min="0"
                      max="100"
                      step="0.05"
                      // value={currentVolume}
                      // onChange={(e) => setVideoVolume(e)}
                    />
                  </div>

                  <div className={styles.otherControls}>
                    {/* <div onClick={toggleShuffle}>
                      {shuffleOn ? (
                        <Shuffle className="shuffle shuffle-on" />
                      ) : (
                        <Shuffle className="shuffle" />
                      )}
                    </div> */}
                  </div>
                </>
              </div>
              <Visualizer audioRef={playerRef} />
              <div className={styles.skipTrack} onClick={getNextTrack}>
                NEXT
              </div>

              <Playlist />
            </div>
          </div>

          {/* <audio
            key={nowPlayingTrack.audio_file} // force remount on src change
            ref={playerRef}
            src={nowPlayingTrack?.audio_file || ""}
            crossOrigin="anonymous"
            autoPlay
            controls
          /> */}
        </>
      )}

      {/* {nowPlayingTrack?.audio_file && (
        <Waveform audioUrl={nowPlayingTrack?.audio_file} />
      )} */}
    </>
  )

  function timeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600)
    const mins = ~~((duration % 3600) / 60)
    const secs = ~~duration % 60
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = ""
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "")
    ret += "" + secs
    return ret
  }
}
