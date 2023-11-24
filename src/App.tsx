import { useEffect, useRef, useState } from 'react'

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [screen, setScreen] = useState<{ screenX: number; screenY: number }>({
    screenX: 0,
    screenY: 0
  })

  useEffect(() => {
    const initWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.width = window.screen.availWidth
        videoRef.current.height = window.screen.availHeight
        videoRef.current.play()
      }
    }
    initWebcam()
  }, [])

  useEffect(() => {
    const update = setInterval(() => {
      setScreen({ screenX: window.screenX, screenY: window.screenY })
    }, 1000)

    return () => clearInterval(update)
  }, [])

  return (
    <video
      ref={videoRef}
      style={{
        transform: `translate(-${screen.screenX}px, -${screen.screenY}px)`
      }}
    />
  )
}

export default App
