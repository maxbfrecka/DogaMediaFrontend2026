import React from "react"
import TrackCard from "./TrackCard"

import styles from "./Tracklist.module.scss"

export default function Tracklist({ tracks }) {
  function tracklist(tracks) {
    console.log(tracks)
    return (
      <>
        {tracks.map((track, index) => (
          <TrackCard key={index} track={track} />
        ))}
      </>
    )
  }
  return (
    <>
      {tracks && (
        <div className={styles.tracklistContainer}>{tracklist(tracks)}</div>
      )}
    </>
  )
}
