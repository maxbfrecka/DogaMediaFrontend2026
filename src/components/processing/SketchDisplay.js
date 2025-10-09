import React from "react"
import Sketch from "react-p5"

function SketchDisplay() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 100).parent(canvasParentRef)
  }

  const draw = (p5) => {
    p5.background(220)
    p5.ellipse(p5.width / 2, p5.height / 2, 50)
  }

  return <Sketch setup={setup} draw={draw} />
}

export default SketchDisplay
