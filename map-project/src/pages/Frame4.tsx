import { useEffect } from 'react'
import LocationMarker from '../components/LocationMarker'
import { education, workExperience } from '../data/resumeData'
import * as Cesium from 'cesium'
import { WorkExperienceCard } from '../components/WorkExperienceCard'
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
      console.log('frame4 viewerRef')
      // viewerRef.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(
      //     workExperience[0].location.longitude,
      //     workExperience[0].location.latitude,
      //     6000
      //   ),
      // })

      setChildren(
        <>
          <LocationMarker location={workExperience[0].location} />
          <FlyWithLine viewer={viewerRef} from={education[0].location} to={workExperience[0].location} />
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
      <WorkExperienceCard workExperience={workExperience} />
      <button style={{pointerEvents: 'all'}} onClick={onNext}>下一页</button>
      <button style={{pointerEvents: 'all'}} onClick={onPrev}>上一页</button>
    </div>
  )
}

