import * as Cesium from 'cesium';

export const createCartesian3FromDegrees = (
  longitude: number,
  latitude: number,
  height: number = 0
): Cesium.Cartesian3 => {
  return Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
};

export const createClockViewModel = (): Cesium.ClockViewModel => {
  return new Cesium.ClockViewModel(
    new Cesium.Clock({
      shouldAnimate: true,
    })
  );
};