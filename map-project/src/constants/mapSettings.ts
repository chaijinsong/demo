import * as Cesium from 'cesium';

// Camera settings
export const DEFAULT_CAMERA_POSITION = {
  destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 1000),
  orientation: {
    heading: 0.0,
    pitch: -Cesium.Math.PI_OVER_SIX,
    roll: 0.0,
  },
};

// Viewer settings
export const VIEWER_CONFIG = {
  animation: false,
  timeline: false,
  scene3DOnly: true,
  terrainProvider: new Cesium.CesiumTerrainProvider({
    url: Cesium.IonResource.fromAssetId(1)
  }),
};

// Sphere settings
export const SPHERE_CONFIG = {
  position: {
    longitude: 116.4074,
    latitude: 39.9042,
    height: 0,
  },
  style: {
    radius: 30.0,
    color: Cesium.Color.ORANGE.withAlpha(0.8),
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2.0,
  },
  animation: {
    maxHeight: 500,
    speed: 0.8,
  },
};