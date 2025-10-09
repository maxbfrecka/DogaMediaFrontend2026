import React, { Component, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "../../css/ReleaseCardBanner.scss"

const ReleaseCardBanner = ({ release }) => {
  const navigate = useNavigate()

  const handleClick = (releaseId) => {
    navigate("/" + releaseId)
  }

  return (
    <div className="releaseCardBanner">
      <img
        className="releaseCardBannerImage"
        src={release.cover_url}
        alt={release.title}
        onClick={() => handleClick(release.id)}
      />
      {/* <div
        className="releaseCardTitle"
        onClick={() => handleClick(release.catalog_number)}
      >
        {release.title}
      </div>
      <div
        className="releaseCardCatalogNumber"
        onClick={() => handleClick(release.catalog_number)}
      >
        {release.catalog_number}
      </div>
      <div
        className="releaseCardDate"
        onClick={() => handleClick(release.catalog_number)}
      >
        {release.release_date}
      </div> */}
    </div>
  )
}

export default ReleaseCardBanner
