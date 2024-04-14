import React, { useEffect, useState, useRef } from 'react';
import { Page } from './Page';
import ThreeContainer from '../components/ThreeContainer';
import WebCam from '../components/WebCam';
import Detector from '../components/Detector';

function PageContent() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [isWebCamLoaded, setIsWebCamLoaded] = useState(false);
  const detectorRef = useRef(null);

  useEffect(() => {
    async function init() {
      Detector.getInstance().then((rtn) => {
        detectorRef.current = rtn;
        detectorRef.current.bindVideo(videoRef.current);
      });
    }
    if (isWebCamLoaded) {
      init();
    }
  }, [isWebCamLoaded]);

  return (
    <div
      style={{
        position: 'relative',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
      }}
    >
      <ThreeContainer
        id="background"
        videoHeight={window.innerHeight}
        videoWidth={window.innerWidth}
        detectorRef={detectorRef}
      />
      <div
        id="UI"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
        }}
      >
        <WebCam
          isShowCanvas={false}
          canvasHeight={480}
          canvasWidth={640}
          stream={stream}
          setStream={setStream}
          videoRef={videoRef}
          isLoaded={isWebCamLoaded}
          setLoaded={setIsWebCamLoaded}
        />
      </div>
    </div>
  );
}

export function App() {
  return (
    <Page>
      <PageContent />
    </Page>
  );
}
export default App;
