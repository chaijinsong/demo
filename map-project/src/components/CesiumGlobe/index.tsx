import { Viewer } from 'resium';
import * as Cesium from 'cesium';
import React, { useCallback, useEffect, useRef } from 'react';
interface GlobeProps {
  className?: string;
  autoRotate?: boolean;
  onMount?: (viewer: Cesium.Viewer) => void;
  children?: React.ReactNode;
}

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MzA2MzczYi0yODU0LTQzMDUtYmNkZi0yZWVkZGVjZGRkYWUiLCJpZCI6MjY1NTY5LCJpYXQiOjE3MzU0ODI1MjV9.LrteK5qOXjS5x71s2cCmirvNyar7yXZoMkgPlA3d9pw';

const CesiumGlobe = ({ className = '', autoRotate = true, onMount, children }: GlobeProps) => {
  let viewer: Cesium.Viewer | null = null;
  const rotateCamera = useRef(() => {
    if (viewer) {
      viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0015);
    }
  })

  const initViewer = (viewer: Cesium.Viewer) => {
    viewer.scene.globe.enableLighting = false;
    viewer.scene.globe.atmosphereBrightnessShift = 0;
    if (autoRotate) {
      viewer.clock.onTick.addEventListener(rotateCamera.current);
    } else {
      viewer.clock.onTick.removeEventListener(rotateCamera.current);
    }
    window.cesiumViewer = viewer;
    onMount && onMount(viewer);
  }

  useEffect(() => {
    if (viewer) {
      if (autoRotate) {
        console.log('autoRotate', autoRotate)
        viewer.clock.onTick.addEventListener(rotateCamera.current);
      } else {
        console.log('autoRotate', autoRotate)
        viewer.clock.onTick.removeEventListener(rotateCamera.current);
      }
    }
  }, [autoRotate])

  return (
    <Viewer
      ref={e => {
        if (e && e.cesiumElement) {
          viewer = e.cesiumElement;
          initViewer(viewer);
        }
      }}
      className={className}
      full
      timeline={false}
      animation={false}
      baseLayerPicker={false}
      navigationHelpButton={false}
      homeButton={false}
      geocoder={false}
      sceneModePicker={false}
    >
      {children}
    </Viewer>
  );
}

export default React.memo(CesiumGlobe);