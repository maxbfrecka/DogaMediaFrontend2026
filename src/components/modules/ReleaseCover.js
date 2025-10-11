import { useState } from "react"

import "../../css/Release.scss"

//THIS LOADS IN THE IMAGE PROGRESSIVELY

export default function ReleaseCover({ thumb, full }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="progressiveImageWrapper">
      Low-res thumbnail
      <img src={thumb} className={`thumb ${loaded ? "thumb--hidden" : ""}`} />
      Full-res cover
      <img
        src={full}
        className={`full ${loaded ? "full--visible" : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
