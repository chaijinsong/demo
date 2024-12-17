
import { Play } from 'lucide-react';
import * as Cesium from 'cesium';
import { useEffect } from 'react';

interface Frame1Props {
  onNext: () => void;
  viewerRef: Cesium.Viewer | null;
}

export default function Frame1({ onNext, viewerRef }: Frame1Props) {

  useEffect(() => {
    if (viewerRef) {
      viewerRef.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 40000000)
      });
    }
  }, [viewerRef]);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="text-center text-white mr-20">
          <h1 className="text-6xl font-bold mb-8 text-shadow-lg">我的简历</h1>
          <button
            onClick={onNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <span>开始浏览</span>
            <Play size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}