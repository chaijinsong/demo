import { useEffect, useRef } from 'react';
import CesiumGlobe from '../components/CesiumGlobe';
import LocationMarker from '../components/LocationMarker';
import FloatingCard from '../components/FloatingCard';
import { education } from '../data/resumeData';
import { flyToLocation } from '../utils/camera';
import * as Cesium from 'cesium';

interface Frame3Props {
  onNext: () => void;
}

export default function Frame3({ onNext }: Frame3Props) {
  const viewerRef = useRef<Cesium.Viewer | null>(null);

  const handleMount = (viewer: Cesium.Viewer) => {
    viewerRef.current = viewer;
    flyToLocation(viewer, education[0].location);
  };

  return (
    <div className="relative w-full h-screen">
      <CesiumGlobe autoRotate={false} onMount={handleMount} />
      <LocationMarker location={education[0].location} />
      <FloatingCard title="教育背景">
        {education.map((edu, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold">{edu.school}</h3>
            <p>{edu.degree} - {edu.major}</p>
            <p className="text-gray-600">{edu.period}</p>
          </div>
        ))}
        <button
          onClick={onNext}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          下一页
        </button>
      </FloatingCard>
    </div>
  );
}