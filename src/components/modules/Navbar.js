import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6"

import { useDispatch, useSelector } from "react-redux"

import { setHighlights } from "../../store/slices/releasesSlice"

import Playlist from "./Playlist"

import "../../css/Navbar.scss"
import "../../css/Player.scss"

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const highlightsOnly = useSelector((state) => state.releases.highlights)

  const setHighlightsBox = () => {
    dispatch(setHighlights())
  }

  return (
    <div>
      <div className="navBarPadding"></div>
      <div className="Navbar">
        <div className="linkGroup">
          <Link to="/">
            <FaHome className="homeIcon" />
          </Link>
          <FaArrowLeftLong className="back" onClick={() => navigate(-1)} />
          <FaArrowRight className="forward" onClick={() => navigate(1)} />
        </div>
        <form className="highlightsBox">
          Highlights only
          <input
            className="highlightsCheckbox"
            type="checkbox"
            defaultChecked={highlightsOnly}
            onChange={setHighlightsBox}
          />
        </form>{" "}
        {/* highlights only checkbox */}
      </div>
      <div className="navBarBottom"></div>
    </div>
  )
}
