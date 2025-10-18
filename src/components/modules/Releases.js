import React, { Component, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import ReleaseCard from "./ReleaseCard"
import LoadingBar from "./LoadingBar/LoadingBar"
import LoadingBar2 from "./LoadingBar2"
import "../../css/Releases.scss"

export default function Releases() {
  const releases = useSelector((state) => state.releases.releases)
  const status = useSelector((state) => state.releases.status)
  const highlightsOnly = useSelector((state) => state.releases.highlights)

  function releasesList(releases) {
    console.log(releases)
    if (highlightsOnly) {
      releases = releases.filter((release) => release.highlight === true)
    }
    return (
      <>
        {releases.map((release, index) => (
          <ReleaseCard key={index} release={release} />
        ))}
      </>
    )
  }

  if (status === "loading") {
    return <LoadingBar />
  }

  return (
    <>
      <div className="releasesPage">
        {releases && (
          <div className="releasesContainer">{releasesList(releases)}</div>
        )}
      </div>
    </>
  )
}
