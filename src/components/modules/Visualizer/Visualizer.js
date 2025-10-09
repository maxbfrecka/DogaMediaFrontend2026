import { useEffect, useRef } from "react"

export default function Visualizer({ audioRef }) {
  const canvasRef = useRef(null)
  const audioContextRef = useRef(null)
  const sourceRef = useRef(null)
  const analyserRef = useRef(null)
  const animationIdRef = useRef(null)
  const previousSrcRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    const canvas = canvasRef.current
    if (!audio || !canvas) return

    const currentSrc = audio.src
    if (previousSrcRef.current === currentSrc) return
    previousSrcRef.current = currentSrc

    // Cleanup
    if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }

    // Setup audio graph
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audio)

    source.connect(analyser)
    analyser.connect(audioContext.destination)

    audioContextRef.current = audioContext
    sourceRef.current = source
    analyserRef.current = analyser

    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const ctx = canvas.getContext("2d")

    const draw = () => {
      analyser.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i]
        ctx.fillStyle = `rgb(${barHeight + 50}, 50, 100)`
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight * 0.75)
        x += barWidth
      }

      animationIdRef.current = requestAnimationFrame(draw)
    }

    draw()

    const resumeOnPlay = () => {
      if (audioContext.state === "suspended") {
        audioContext.resume()
      }
    }

    audio.addEventListener("play", resumeOnPlay)
    return () => {
      audio.removeEventListener("play", resumeOnPlay)
      cancelAnimationFrame(animationIdRef.current)
    }
  }, [audioRef.current?.src])

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={90}
      style={{ display: "block" }}
    />
  )
}
