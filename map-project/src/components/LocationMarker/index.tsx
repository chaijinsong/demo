import React, { useEffect, useMemo, useRef } from 'react';
import { Entity } from 'resium';
import { Cartesian3, SampledPositionProperty, JulianDate, HeadingPitchRoll, Math as CesiumMath, CallbackProperty } from 'cesium';
import { SPHERE_CONFIG } from '../../constants/mapSettings';
import { calculateBouncePosition } from '../../utils/animation';

const LocationMarker = ({ longitude, latitude, heightAmplitude = 1000, period = 2, modelUri='public/models/girl.glb', viewer }: { longitude: number, latitude: number, heightAmplitude?: number, period?: number, modelUri?: string, viewer: Cesium.Viewer }) => {
  // 创建位置动画轨迹（上下跳动）

  const { position, style, animation } = SPHERE_CONFIG;

  const positionProperty = useRef(
    new CallbackProperty((time) => {
      return calculateBouncePosition(
        position.longitude,
        position.latitude,
        time,
        animation.maxHeight,
        animation.speed
      );
    }, false)
  );

  return (
    <Entity
      name="Jumping Marker"
      // position={Cartesian3.fromDegrees(longitude, latitude, 10)}
      position={positionProperty.current}  // 上下跳动的轨迹
      model={{
        uri: modelUri, // 3D模型路径
        minimumPixelSize: 128 * 2,
        maximumScale: 2400,
        scale: 3.0, // 调整模型的大小
      }}
      // orientation={rotation} // 设置模型的旋转
    />
  )

  // return (
  //   <Entity
  //     name="Jumping Marker"
  //     // position={Cartesian3.fromDegrees(longitude, latitude, 10)}
  //     position={position}
  //     model={{
  //       uri: modelUri, // 3D模型路径
  //       minimumPixelSize: 128,
  //       maximumScale: 2400,
  //     }}
  //   />
  // );
};

export default LocationMarker;