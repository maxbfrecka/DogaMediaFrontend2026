import React, { Component, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ReleaseCardBanner = ({ release, id, className }) => {
  const navigate = useNavigate()

  const handleClick = (releaseId) => {
    navigate("/" + releaseId)
  }

  return (
    <div className={`releaseCardBanner ${className || ""}`} id={id}>
      <img
        className="releaseCardBannerImage"
        src={release.cover_thumbnail_url}
        alt={release.title}
        onClick={() => handleClick(release.id)}
        loading="lazy"
      />
    </div>
  )
}

export default ReleaseCardBanner
