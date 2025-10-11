import React, { Component, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route, useLocation, useParams } from "react-router-dom"

import WebFont from "webfontloader"

import { fetchReleases } from "../store/slices/releasesSlice"

import Releases from "./modules/Releases"
import Release from "./modules/Release"
import Navbar from "./modules/Navbar"
import Player from "./modules/Player"
import DogaAudioPlayer from "./modules/DogaAudioPlayer/DogaAudioPlayer"
import ReleasesBanner from "./modules/ReleasesBanner"

import "../css/DogaMedia.css"
import "../css/ReleasesBanner.css"

export default function DogaMedia() {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  const isReleasePage = /^\/\d+/.test(location.pathname)

  const match = location.pathname.match(/^\/([^/]+)/)
  const releaseId = match ? match[1] : null

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Droid Sans",
          "Tilt Neon",
          "Gloria Hallelujah",
          "Varela Round",
          "Russo One",
          "Concert One",
          "Play",
          "Libre Barcode 39 Extended Text",
          "Nabla",
          "Foldit",
          "Foldit:wght@800",
          "Sarina",
        ],
      },
    })
  }, [])

  useEffect(() => {
    console.log("FETCHING")
    dispatch(fetchReleases())
  }, [dispatch])

  return (
    <>
      <div className="dogamedia">
        <Navbar />
        {isReleasePage && (
          <div className="releasesBannerOuterContainer">
            <ReleasesBanner releaseId={releaseId} />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Releases />} />
          <Route path="/:releaseId" element={<Release />} />
        </Routes>
        {/* <DogaAudioPlayer /> */}
        <Player />
      </div>
    </>
  )
}
