import { useEffect } from 'react'
import LocationMarker from '../components/LocationMarker'
import { education, personalInfo } from '../data/resumeData'
import * as Cesium from 'cesium'
import { EducationCard } from '../components/EducationCard'
import FlyWithLine from '../components/FlyWithLine'

interface Frame3Props {
  onNext?: () => void
  onPrev?: () => void
  viewerRef: Cesium.Viewer | null
  setChildren: (children: React.ReactNode) => void
}

export default function Frame3({ onNext, onPrev, viewerRef, setChildren }: Frame3Props) {
  useEffect(() => {
    if (viewerRef) {
      console.log('frame3 viewerRef')
      // viewerRef.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(
      //     education[0].location.longitude,
      //     education[0].location.latitude,
      //     6000
      //   ),
      // })

      setChildren(
        <>
          <LocationMarker location={education[0].location} />
          <FlyWithLine viewer={viewerRef} from={personalInfo.location} to={education[0].location} />
        </>
      )
    }
  }, [viewerRef])

  return (
    <div
      className="relative w-full h-screen"
      style={{
        pointerEvents: 'none',
      }}
    >
      <EducationCard education={education} />
      <button style={{pointerEvents: 'all'}} onClick={onNext}>下一页</button>
      <button style={{pointerEvents: 'all'}} onClick={onPrev}>上一页</button>
    </div>
  )
}

