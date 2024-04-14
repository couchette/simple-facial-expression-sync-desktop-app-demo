import React, { useState, useRef, useEffect } from 'react';
import { Button, Select, Layout } from 'antd';
import Webcam from 'react-webcam';

const { Option } = Select;
const { Content } = Layout;

function WebCam({
  isShowCanvas,
  canvasHeight,
  canvasWidth,
  stream,
  setStream,
  videoRef,
  loaded,
  setLoaded,
}) {
  const [isStartCamButtonLoading, setIsStartCamButtonLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);

  const handleVideoLoad = (videoNode) => {
    const video = videoNode.target;
    videoRef.current = videoNode.target;
    if (video.readyState !== 4) return;
    if (loaded) return;
    setLoaded(true);
    setIsStartCamButtonLoading(false);
    console.log('loaded');
  };

  // 获取可用的视频设备列表
  const getVideoDevices = async () => {
    const devicesInfo = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devicesInfo.filter(
      (device) => device.kind === 'videoinput',
    );
    setDevices(videoDevices);
  };

  // 切换相机设备
  const handleDeviceChange = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  // 开启摄像头
  const startCamera = async () => {
    setIsStartCamButtonLoading(true);
    if (!loaded) {
      const constraints = {
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        },
      };
      const tempStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(tempStream);
    }
  };

  // 停止摄像头
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setSelectedDevice(null);
      setLoaded(false);
    }
  };

  // 获取视频设备列表
  React.useEffect(() => {
    getVideoDevices();
  }, []);

  return (
    <Content
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Select
        placeholder="选择相机"
        style={{ width: '150px', marginBottom: 16 }}
        onChange={handleDeviceChange}
      >
        {devices.map((device) => (
          <Option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </Option>
        ))}
      </Select>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Button onClick={startCamera} loading={isStartCamButtonLoading}>
          启动相机
        </Button>
        <Button onClick={stopCamera} style={{ marginLeft: 8 }}>
          关闭相机
        </Button>
      </div>
      <div
        style={{
          height: String(canvasHeight) + 'px',
          width: String(canvasWidth) + 'px',
          margin: '10px',
          position: 'relative',
        }}
      >
        {stream && (
          <Webcam
            style={{
              visibility: isShowCanvas ? 'visible' : 'hidden',
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
            }}
            width={canvasWidth}
            height={canvasHeight}
            videoConstraints={{
              deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
            }}
            onLoadedData={handleVideoLoad}
          />
        )}
      </div>
    </Content>
  );
}

export default WebCam;
