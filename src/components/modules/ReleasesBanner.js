import React, { Component, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useLocation } from "react-router-dom"

import ReleaseCardBanner from "./ReleaseCardBanner"
import LoadingBar from ".//LoadingBar/LoadingBar"
import LoadingBar2 from "./LoadingBar2"
import "../../css/ReleasesBanner.scss"

export default function ReleasesBanner() {
  const releases = useSelector((state) => state.releases.releases)
  const status = useSelector((state) => state.releases.status)
  const { releaseId } = useParams()
  const location = useLocation()

  useEffect(() => {
    if (releases.length && releaseId) {
      const el = document.getElementById(`release-${releaseId}`)
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        })
      }
    }
  }, [releases, releaseId])

  if (status === "loading") {
    return <LoadingBar />
  }

  return (
    <>
      {releases && (
        <div className="releasesBannerInnerContainer">
          {releases.map((release) => (
            <ReleaseCardBanner
              id={`release-${release.id}`}
              className={`releaseItem ${
                String(release.id) === releaseId ? "active" : ""
              }`}
              key={release.id}
              release={release}
            />
          ))}
        </div>
      )}
    </>
  )
}

// function releasesList(releases) {
//   console.log(releases)
//   return (
//     <>
//       {releases.map((release, index) => (
//         <ReleaseCardBanner key={index} release={release} />
//       ))}
//     </>
//   )
// }
