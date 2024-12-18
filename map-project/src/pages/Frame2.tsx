import { useEffect } from 'react'
import LocationMarker from '../components/LocationMarker'
import { education, personalInfo } from '../data/resumeData'
import { PersonalInfoCard } from '../components/PersonalInfoCard'
import * as Cesium from 'cesium'
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
      console.log('frame2 viewerRef')
      viewerRef.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          personalInfo.location.longitude,
          personalInfo.location.latitude,
          6000
        ),
      })

      setChildren(
        <>
          <LocationMarker location={personalInfo.location} />
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
      <PersonalInfoCard personalInfo={personalInfo} />
      <button style={{pointerEvents: 'all'}} onClick={onNext}>下一页</button>
      <button style={{pointerEvents: 'all'}} onClick={onPrev}>上一页</button>
    </div>
  )
}
