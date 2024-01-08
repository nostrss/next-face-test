'use client';
import React, { SyntheticEvent, useRef, useState } from 'react';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/face_mesh';
import Webcam from 'react-webcam';
import { runDetector } from '@/util/detector';

const inputResolution = {
  width: 1080,
  height: 720,
};
const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: 'user',
};
function App() {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleVideoLoad = (
    videoNode: SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    if (!videoNode) return;
    const video = videoNode.target as HTMLVideoElement;
    if (video.readyState !== 4) return;
    if (loaded) return;
    runDetector(video, canvasRef.current);
    setLoaded(true);
  };

  return (
    <div>
      <Webcam
        width={inputResolution.width}
        height={inputResolution.height}
        style={{
          position: 'absolute',
          margin: 'auto',
          textAlign: 'center',
          top: 0,
          left: 0,
          right: 0,
        }}
        videoConstraints={videoConstraints}
        onLoadedData={handleVideoLoad}
      />
      <canvas
        ref={canvasRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={{
          position: 'absolute',
          margin: 'auto',
          textAlign: 'center',
          top: 0,
          left: 0,
          right: 0,
        }}
      />
      {loaded ? <></> : <header>Loading...</header>}
    </div>
  );
}

export default App;
