import React from "react"

export default function ThePlayer({ src, audioRef }) {
  return (
    <audio
      key={src} // forces remount when src changes
      ref={audioRef}
      crossOrigin="anonymous"
      src={src}
      controls
      autoPlay
    />
  )
}
