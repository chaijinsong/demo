import * as Cesium from 'cesium';
import { Location } from '../types';

export const flyToLocation = (
  viewer: Cesium.Viewer,
  location: Location,
  duration = 2
) => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      location.longitude,
      location.latitude,
      location.height / 10 // Closer zoom for better location visibility
    ),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45), // Tilt the camera for better perspective
      roll: 0
    },
    duration
  });
};