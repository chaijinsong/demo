import { Viewer } from 'resium';
import * as Cesium from 'cesium';
import React from 'react';
interface GlobeProps {
  className?: string;
  autoRotate?: boolean;
  onMount?: (viewer: Cesium.Viewer) => void;
  children?: React.ReactNode;
}

const CesiumGlobe = ({ className = '', autoRotate = true, onMount, children }: GlobeProps) => {
  let viewer: Cesium.Viewer | null = null;

  console.log('CesiumGlobe re-rendered');

  const initViewer = (viewer: Cesium.Viewer) => {
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.atmosphereBrightnessShift = 0.1;
    
    // if (autoRotate) {
    //   viewer.clock.onTick.addEventListener(() => {
    //     viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.0015);
    //   });
    // }

    onMount && onMount(viewer);
  }

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