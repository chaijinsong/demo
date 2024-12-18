import { useRef, useMemo } from 'react';
import { Entity } from 'resium';
import * as Cesium from 'cesium';
import { calculateBouncePosition } from '../utils/animation';
import { SPHERE_CONFIG } from '../constants/mapSettings';

export default function BouncingSphere() {
  const { position, style, animation } = SPHERE_CONFIG;
  
  const sphereRadii = useMemo(() => {
    return new Cesium.Cartesian3(style.radius, style.radius, style.radius);
  }, [style.radius]);

  const positionProperty = useRef(
    new Cesium.CallbackProperty((time) => {
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
      position={positionProperty.current}
      ellipsoid={{
        radii: sphereRadii,
        material: style.color,
        outline: true,
        outlineColor: style.outlineColor,
        outlineWidth: style.outlineWidth,
      }}
    />
  );
}