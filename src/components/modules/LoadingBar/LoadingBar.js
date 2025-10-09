import React, { Component } from "react"
import styles from "./LoadingBar.module.scss"
import "./LoadingBar.scss"

export default function LoadingBar() {
  return (
    <>
      <div className={styles.loadbarContainer}>
        <div className={styles.loadwaveContainer}>
          <div className={styles.loadwave}></div>
          <div className={styles.loadwave}>L</div>
          <div className={styles.loadwave}>o</div>
          <div className={styles.loadwave}>a</div>
          <div className={styles.loadwave}>d</div>
          <div className={styles.loadwave}>i</div>
          <div className={styles.loadwave}>n</div>
          <div className={styles.loadwave}>g</div>
          <div className={styles.loadwave}>.</div>
          <div className={styles.loadwave}>.</div>
          <div className={styles.loadwave}>.</div>
        </div>
      </div>

      {/* <div className="loadbarContainer">
        <div className="loadwaveContainer">
          <div className="loadwave"></div>
          <div className="wave">L</div>
          <div className="wave">o</div>
          <div className="wave">a</div>
          <div className="wave">d</div>
          <div className="wave">i</div>
          <div className="wave">n</div>
          <div className="wave">g</div>
          <div className="wave">.</div>
          <div className="wave">.</div>
          <div className="wave">.</div>
        </div>
      </div> */}
    </>
  )
}
