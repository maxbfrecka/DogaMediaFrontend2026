import React, { Component, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import ReleaseCard from "./ReleaseCard"
import LoadingBar from "./LoadingBar/LoadingBar"
import LoadingBar2 from "./LoadingBar2"
import "../../css/Releases.css"

export default function Releases() {
  const releases = useSelector((state) => state.releases.releases)
  const status = useSelector((state) => state.releases.status)

  function releasesList(releases) {
    console.log(releases)
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
      {releases && (
        <div className="releasesContainer">{releasesList(releases)}</div>
      )}
    </>
  )
}
