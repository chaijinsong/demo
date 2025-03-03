import * as Cesium from 'cesium';
import { createCartesian3FromDegrees } from './cesium';

export const calculateBouncePosition = (
  longitude: number,
  latitude: number,
  time: Cesium.JulianDate,
  maxHeight: number,
  speed: number
): Cesium.Cartesian3 => {
  const seconds = Cesium.JulianDate.secondsDifference(time, Cesium.JulianDate.now());
  const currentHeight = Math.abs(Math.sin(seconds * speed)) * maxHeight;
  
  return createCartesian3FromDegrees(longitude, latitude, currentHeight);
};