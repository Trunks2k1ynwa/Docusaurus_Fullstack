import React, {forwardRef,useImperativeHandle,useRef} from 'react'
import video from '/static/video.mp4'
const MyVideo = (props, ref) => {
  const videoRef = useRef(null)
  useImperativeHandle(
    ref,
    () => {

      return {
        play() {
          videoRef.current.play()
        },
        pause() {
          videoRef.current.pause()
        }
      }
    },
    [],
  )
  return (
    <video autoPlay={true} {...props} ref={videoRef} src={video} width="520" controls>Video test
   </video>
  )
}

export default forwardRef(MyVideo)
