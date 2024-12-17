import { useEffect } from 'react';
import LocationMarker from '../components/LocationMarker';
import FloatingCard from '../components/FloatingCard';
import { personalInfo } from '../data/resumeData';
import * as Cesium from 'cesium';

interface Frame2Props {
  onNext: () => void;
  onPrev: () => void;
  viewerRef: Cesium.Viewer | null;
  setChildren: (children: React.ReactNode) => void;
}

export default function Frame2({ onNext, onPrev, viewerRef, setChildren }: Frame2Props) {

  useEffect(() => {
    if (viewerRef) {
      console.log('frame2 viewerRef');
      viewerRef.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.3912757, 39.906217, 6000)
      });

      setChildren(<LocationMarker location={personalInfo.location} />);

    }
  }, [viewerRef]);

  return (
    <div className="relative w-full h-screen" style={{pointerEvents: 'none'}}>
      <FloatingCard title="个人信息" style={{pointerEvents: 'all'}}>
        <p><strong>姓名:</strong> {personalInfo.name}</p>
        <p><strong>职位:</strong> {personalInfo.title}</p>
        <p><strong>技能:</strong> {personalInfo.skills.join(', ')}</p>
        <p><strong>邮箱:</strong> {personalInfo.email}</p>
        <p><strong>地点:</strong> {personalInfo.location.name}</p>
        <button
          onClick={onPrev}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          上一页
        </button>
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