import { useEffect } from 'react';
import LocationMarker from '../components/LocationMarker';
import { personalInfo } from '../data/resumeData';
import * as Cesium from 'cesium';
import { HeadingPitchRoll } from 'cesium';
import { Math as CesiumMath } from 'cesium';
import { PersonalInfoCard } from '../components/PersonalInfoCard'
import FlyWithLine from '../components/FlyWithLine'

interface Frame2Props {
  onNext?: () => void
  onPrev?: () => void
  viewerRef: Cesium.Viewer | null
  setChildren: (children: React.ReactNode) => void
}

export default function Frame2({ onNext, onPrev, viewerRef, setChildren }: Frame2Props) {
  useEffect(() => {
    if (viewerRef) {
      const orientation = new HeadingPitchRoll(
        CesiumMath.toRadians(0),   // heading: 0，表示正北
        CesiumMath.toRadians(-30), // pitch: -30，表示相机向下倾斜30度  
        0                          // roll: 0，表示不滚转
      );
      viewerRef.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.3912757, 39.906217, 2000),
        orientation: orientation,
      });

      setChildren(<LocationMarker viewer={viewerRef} longitude={personalInfo.location.longitude} latitude={personalInfo.location.latitude} modelUri={personalInfo.location.modelUri}/>);
      // console.log('frame2 viewerRef')
      // viewerRef.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(
      //     personalInfo.location.longitude,
      //     personalInfo.location.latitude,
      //     6000
      //   ),
      // })

      // setChildren(
      //   <>
      //     <LocationMarker location={personalInfo.location} />
      //   </>
      // )
    }
  }, [viewerRef])

  return (
    <div
      className="relative w-full h-screen"
      style={{
        pointerEvents: 'none',
      }}
    >
      <PersonalInfoCard personalInfo={personalInfo} />
      <button style={{pointerEvents: 'all'}} onClick={onNext}>下一页</button>
      <button style={{pointerEvents: 'all'}} onClick={onPrev}>上一页</button>
    </div>
  )
}
