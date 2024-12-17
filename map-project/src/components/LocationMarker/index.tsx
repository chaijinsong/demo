import { Entity, Viewer } from 'resium';
import * as Cesium from 'cesium';
import { Location } from '../../types';
import { useEffect, useState } from 'react';
import anime from 'animejs';

interface LocationMarkerProps {
  location: Location;
  color?: Cesium.Color;
}

export default function LocationMarker({ 
  location, 
  color = Cesium.Color.RED.withAlpha(0.6) 
}: LocationMarkerProps) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const animation = anime({
      targets: { height: 0 },
      height: location.height / 50, // Smaller height for better visibility
      duration: 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      update: (anim) => {
        setHeight(anim.animations[0].currentValue);
      }
    });

    return () => animation.pause();
  }, [location.height]);

  return (
    <>
      <Entity
        position={Cesium.Cartesian3.fromDegrees(
          location.longitude,
          location.latitude,
          height
        )}
        cylinder={{
          length: location.height / 100,
          topRadius: 0,
          bottomRadius: 2000,
          material: color,
        }}
      />
      <Entity
        position={Cesium.Cartesian3.fromDegrees(
          location.longitude,
          location.latitude,
          0
        )}
        billboard={{
          image: '/location-pin.png',
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 0.5,
        }}
      />
    </>
  );
}