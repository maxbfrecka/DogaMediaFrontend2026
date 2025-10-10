import React, { Component, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"

import WebFont from "webfontloader"

import { fetchReleases } from "../store/slices/releasesSlice"

import Releases from "./modules/Releases"
import Release from "./modules/Release"
import Navbar from "./modules/Navbar"
import Player from "./modules/Player"
import DogaAudioPlayer from "./modules/DogaAudioPlayer/DogaAudioPlayer"

import "../css/DogaMedia.css"

export default function DogaMedia() {
  const dispatch = useDispatch()

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
