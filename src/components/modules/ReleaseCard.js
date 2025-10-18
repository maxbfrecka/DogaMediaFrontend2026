import React, { Component, useState, useEffect } from "react"
//import { useSelector, useDispatch } from "react-redux"
import "../../css/ReleaseCard.scss"
import { useNavigate } from "react-router-dom"

const ReleaseCard = ({ release }) => {
  const navigate = useNavigate()

  function randomHex() {
    return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
  }

  const handleClick = (catalogNumber) => {
    navigate("/" + catalogNumber)
  }

  return (
    <div className={`releaseCard ${release && release.highlight ? "releaseCard--highlight" : ""}`}>
      <img
        className="releaseCardImage"
        src={release.cover_thumbnail_url}
        alt={release.title}
        loading="lazy"
        onClick={() => handleClick(release.id)}
      />
      <div className="releaseCardTitle" onClick={() => handleClick(release.id)}>
        {release.title}
      </div>
      <div
        className="releaseCardCatalogNumber"
        onClick={() => handleClick(release.id)}
      >
        {release.catalog_number}
      </div>
      <div className="releaseCardDate" onClick={() => handleClick(release.id)}>
        {release.release_date}
      </div>
    </div>
  )
}

export default ReleaseCard
