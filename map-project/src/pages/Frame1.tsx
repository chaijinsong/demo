
import { Play } from 'lucide-react';
import * as Cesium from 'cesium';
import { useEffect } from 'react';

interface Frame1Props {
  onNext: () => void;
  viewerRef: Cesium.Viewer | null;
  setChildren: (children: React.ReactNode) => void;
}


export default function Frame1({ onNext, viewerRef, setChildren }: Frame1Props) {

  useEffect(() => {
    if (viewerRef) {
      // viewerRef.camera.setView({
      //   destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 50000000)
      // });
      const center = Cesium.Cartesian3.fromDegrees(0, 0, 50000000); // 地球中心点
      viewerRef.scene.camera.setView({
        destination: center,
      });

      // 将相机偏移
      viewerRef.scene.camera.moveRight(8000000); // 向右移动相机（地球看起来向左）

      setChildren(null);
    }
  }, [viewerRef]);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="text-center text-white mr-60">
          <h1 className="text-6xl font-bold mb-8 text-shadow-lg">李太白的简历</h1>
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