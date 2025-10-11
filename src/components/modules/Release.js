import React, { Component, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { fetchRelease } from "../../store/slices/releaseSlice"
import {
  setNowPlayingTrack,
  addToPlaylist,
  clearPlaylist,
} from "../../store/slices/playerSlice"

import LoadingBar from "./LoadingBar/LoadingBar"
import Tracklist from "./Tracklist/Tracklist"
import ReleasesBanner from "./ReleasesBanner"
import ReleaseCover from "./ReleaseCover"
import SketchDisplay from "../processing/SketchDisplay"

import { MdPlaylistAddCircle } from "react-icons/md"
import { BsFillPlayFill as Play } from "react-icons/bs"
import "../../css/Release.scss"

export default function Release() {
  const [showModal, setShowModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  //get the releaseID from the URL/browser-router navigation
  const { releaseId } = useParams()
  const dispatch = useDispatch()
  //const release = useSelector((state) => state.release.release)
  const release = useSelector(
    (state) => state.release.releasesByIdNumber[releaseId]
  )
  const status = useSelector((state) => state.release.status)

  useEffect(() => {
    console.log("release_id number: " + releaseId)
    dispatch(fetchRelease(releaseId))
  }, [dispatch, releaseId])

  if (status === "loading") return <LoadingBar />
  if (status === "failed") return <h1>it fricking failed!</h1>
  if (!release) {
    console.log(release)
    return <p>Release is not yet found</p>
  }

  function playRelease(tracks) {
    //play first track
    dispatch(setNowPlayingTrack(tracks[0]))
    //clear playlist
    dispatch(clearPlaylist())
    //add other tracks to playlist
    if (tracks.length > 1) {
      tracks.slice(1).forEach((track) => {
        console.log(track)
        dispatch(addToPlaylist(track))
      })
    }
  }
  function addReleaseToPlaylist(tracks) {
    tracks.forEach((track) => {
      console.log(track)
      dispatch(addToPlaylist(track))
    })
  }

  return (
    <>
      {/* <div className="releasesBannerOuterContainer">
        <ReleasesBanner />
      </div> */}
      <div releasePageContainer class="releasePageContainer">
        <div releaseContainer>
          {/* <SketchDisplay /> */}
          <div className="release-detail">
            <>
              {release && (
                <div className="releaseContainer">
                  {/* <div className="coverWrapper">
                    {!loaded && <div className="coverLoading">Loading…</div>}
                    <img
                      src={release.cover_url}
                      alt="cover"
                      className={`coverImage ${loaded ? "loaded" : "hidden"}`}
                      onLoad={() => setLoaded(true)}
                      loading="lazy"
                    />
                  </div> */}

                  {/* attempting progressive loading, not working */}

                  {/* <div className="coverWrapper">
                    <ReleaseCover
                      thumb={release.cover_thumbnail_url}
                      full={release.cover_url}
                      style={{ cursor: "zoom-in" }}
                      onClick={() => setShowModal(true)}
                    />
                    {showModal && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0,0,0,0.8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 9999,
                        }}
                        onClick={() => setShowModal(false)}
                      >
                        <img
                          src={release.cover_url}
                          alt="artwork zoomed"
                          style={{
                            maxWidth: "77vw",
                            maxHeight: "77vh",
                            boxShadow: "0 0 20px #ff0000ff",
                          }}
                        />
                      </div>
                    )}
                  </div> */}

                  <div className="releaseCoverContainer">
                    <img
                      className="releasePageCover"
                      src={release.cover_url}
                      onLoad={() => setLoaded(true)}
                      alt="Album cover"
                      style={{ cursor: "zoom-in" }}
                      onClick={() => setShowModal(true)}
                    />
                    {showModal && (
                      <div
                        style={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          background: "rgba(0,0,0,0.8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 9999,
                        }}
                        onClick={() => setShowModal(false)}
                      >
                        <img
                          src={release.cover_url}
                          alt="artwork zoomed"
                          style={{
                            maxWidth: "77vw",
                            maxHeight: "77vh",
                            boxShadow: "0 0 20px #ff0000ff",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="releaseInformationAndTracks">
                    <div className="releaseTitle">{release.title}</div>
                    <div className="releaseDetailContainer">
                      {/* <div className="releaseCatalogNumber">
                  {release.catalog_number}
                </div> */}
                      <div className="releaseReleaseDate">
                        {release.release_date}
                      </div>
                    </div>
                    <div className="releaseControls">
                      <Play
                        className="playRelease"
                        onClick={() => playRelease(release.tracks)}
                      />
                      <MdPlaylistAddCircle
                        className="addReleaseToPlaylist"
                        onClick={() => addReleaseToPlaylist(release.tracks)}
                      />
                    </div>
                    <Tracklist tracks={release.tracks} />

                    <pre className="releaseNotes">{release.about}</pre>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  )
}
