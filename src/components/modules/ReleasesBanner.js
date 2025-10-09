import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ReleaseCardBanner from "./ReleaseCardBanner";
import LoadingBar from ".//LoadingBar/LoadingBar";
import LoadingBar2 from "./LoadingBar2";
import "../../css/ReleasesBanner.css";

export default function ReleasesBanner() {
  const releases = useSelector((state) => state.releases.releases);
  const status = useSelector((state) => state.releases.status);

  function releasesList(releases) {
    console.log(releases);
    return (
      <>
        {releases.map((release, index) => (
          <ReleaseCardBanner key={index} release={release} />
        ))}
      </>
    );
  }

  if (status === "loading") {
    return <LoadingBar />;
  }

  return (
    <>
      {releases && (
        <div className="releasesBannerContainer">{releasesList(releases)}</div>
      )}
    </>
  );
}
