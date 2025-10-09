import React, { useEffect, useRef } from "react"
import WaveSurfer from "wavesurfer.js"

export default function Waveform({ audioUrl }) {
  const containerRef = useRef()
  const waveSurferRef = useRef()

  useEffect(() => {
    if (!containerRef.current) return

    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#ccc",
      progressColor: "#4a90e2",
      height: 80,
      responsive: true,
    })

    waveSurferRef.current.load(audioUrl)

    return () => {
      try {
        waveSurferRef.current?.destroy()
      } catch (err) {
        console.warn("WaveSurfer destroy error:", err)
      }
    }
  }, [audioUrl])

  return <div className="waveform" ref={containerRef}></div>
}
