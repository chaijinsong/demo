import { useEffect, useRef, useState } from 'react';
import { Viewer, Entity, CesiumComponentRef } from 'resium';
import * as Cesium from 'cesium';
import anime from 'animejs';
import { Play } from 'lucide-react';

const DESTINATION_COORDS = {
  longitude: 116.3912757, // Beijing coordinates
  latitude: 39.906217,
  height: 1000000
};

export default function Globe() {
  const viewerRef = useRef<CesiumComponentRef<Cesium.Viewer>>(null);
  const [showResume, setShowResume] = useState(false);

  const flyToDestination = () => {
    if (!viewerRef.current?.cesiumElement) return;
    
    const viewer = viewerRef.current.cesiumElement;
    
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        DESTINATION_COORDS.longitude,
        DESTINATION_COORDS.latitude,
        DESTINATION_COORDS.height
      ),
      duration: 2,
      complete: () => setShowResume(true)
    });
  };

  useEffect(() => {
    if (!viewerRef.current?.cesiumElement) return;
    
    const viewer = viewerRef.current.cesiumElement;
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.atmosphereBrightnessShift = 0.2;
    
    // Start automatic rotation
    viewer.clock.onTick.addEventListener(() => {
      viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.002);
    });
  }, []);

  return (
    <div className="w-full h-screen relative">
      <Viewer
        ref={viewerRef}
        full
        timeline={false}
        animation={false}
        baseLayerPicker={false}
        navigationHelpButton={false}
        homeButton={false}
        geocoder={false}
        sceneModePicker={false}
      >
        {showResume && (
          <Entity
            position={Cesium.Cartesian3.fromDegrees(
              DESTINATION_COORDS.longitude,
              DESTINATION_COORDS.latitude,
              0
            )}
            cylinder={{
              length: 10000,
              topRadius: 0,
              bottomRadius: 5000,
              material: Cesium.Color.RED.withAlpha(0.6),
            }}
          />
        )}
      </Viewer>
      
      {!showResume && (
        <button
          onClick={flyToDestination}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        >
          <Play size={24} />
        </button>
      )}
      
      {showResume && (
        <div
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-80"
          id="resumeCard"
        >
          <h2 className="text-2xl font-bold mb-4">个人简历</h2>
          <div className="space-y-3">
            <p><strong>姓名:</strong> 李白</p>
            <p><strong>职位:</strong> 全栈开发工程师</p>
            <p><strong>技能:</strong> React, Node.js, Python</p>
            <p><strong>邮箱:</strong> example@email.com</p>
            <p><strong>地点:</strong> 北京</p>
          </div>
        </div>
      )}
    </div>
  );
}