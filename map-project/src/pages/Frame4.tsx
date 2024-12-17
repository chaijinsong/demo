import { useEffect, useRef } from 'react';
import CesiumGlobe from '../components/CesiumGlobe';
import LocationMarker from '../components/LocationMarker';
import FloatingCard from '../components/FloatingCard';
import { workExperience } from '../data/resumeData';
import { flyToLocation } from '../utils/camera';
import * as Cesium from 'cesium';

interface Frame4Props {
  onNext: () => void;
}

export default function Frame4({ onNext }: Frame4Props) {
  const viewerRef = useRef<Cesium.Viewer | null>(null);

  const handleMount = (viewer: Cesium.Viewer) => {
    viewerRef.current = viewer;
    // Center the view between all work locations
    const avgLon = workExperience.reduce((sum, exp) => sum + exp.location.longitude, 0) / workExperience.length;
    const avgLat = workExperience.reduce((sum, exp) => sum + exp.location.latitude, 0) / workExperience.length;
    
    flyToLocation(viewer, {
      longitude: avgLon,
      latitude: avgLat,
      height: 100000 // Closer view to see multiple locations
    });
  };

  return (
    <div className="relative w-full h-screen">
      <CesiumGlobe autoRotate={false} onMount={handleMount} />
      {workExperience.map((exp, index) => (
        <LocationMarker key={index} location={exp.location} />
      ))}
      <FloatingCard title="工作经历">
        {workExperience.map((exp, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold">{exp.company}</h3>
            <p className="text-lg">{exp.position}</p>
            <p className="text-gray-600">{exp.period}</p>
            <p className="text-sm text-gray-500">{exp.location.name}</p>
            <ul className="list-disc list-inside mt-2">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
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