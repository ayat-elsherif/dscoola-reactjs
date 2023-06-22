import { css } from '@emotion/css'
import { Progress } from 'antd'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'

const ProgressContext = createContext({})
export const useProgress = () => {
  const { percent, setPercent, setIsDone, setWait, uploadConfig } =
    useContext(ProgressContext)

  return { percent, setPercent, setIsDone, uploadConfig, setWait }
}

function OwnProgress({ children }) {
  const [wait, setWait] = useState(1500)
  const [percent, setPercent] = useState(0)
  const [isDone, setIsDone] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const OwnProgressStyles = css`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1999;
    transform: scale(${isVisible ? 1 : 0}) translate(-50%, -75%);
    background-color: #fff;
    box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.15);
    padding: 2rem;
    width: 35rem;
    height: 35rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .title {
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    }
  `

  useEffect(() => {
    if (isDone) {
      setTimeout(() => {
        setIsVisible(false)
      }, wait)
    } else {
      setIsVisible(true)
    }
  }, [isDone, wait, setIsVisible])

  const uploadConfig = {
    onUploadProgress: prgEve => {
      const percentage = Math.round((prgEve.loaded * 100) / prgEve.total)
      setPercent(percentage)
      setIsDone(false)
      if (percentage === 100) setIsDone(true)
    },
  }

  return (
    <ProgressContext.Provider
      value={{ percent, setPercent, setIsDone, setWait, uploadConfig }}
    >
      <div className={OwnProgressStyles}>
        <Progress
          type="circle"
          percent={percent}
          format={percent => {
            return percent === 100 ? 'Done' : percent.toFixed()
          }}
        />
        <div className="title">
          {isDone ? 'Upload complete!' : 'Uploading file/s'}
        </div>
      </div>

      {children}
    </ProgressContext.Provider>
  )
}

export default OwnProgress
