import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6"

import Playlist from "./Playlist"

import "../../css/Navbar.css"

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="navBarPadding"></div>
      <div className="Navbar">
        <Link to="/">
          <FaHome className="homeIcon" />
        </Link>
        <FaArrowLeftLong className="back" onClick={() => navigate(-1)} />
        <FaArrowRight className="forward" onClick={() => navigate(1)} />
      </div>
    </div>
  )
}
