import { useState, useCallback, useEffect } from 'react';
import CesiumGlobe from './components/CesiumGlobe';
import * as Cesium from 'cesium';
import Frame1 from './pages/Frame1';
import Frame2 from './pages/Frame2';
import Frame3 from './pages/Frame3';
import Frame4 from './pages/Frame4';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import Frame5 from './pages/Frame5';

function App() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [viewer, setViewer] = useState<Cesium.Viewer | null>(null);
  const [children, setChildren] = useState<React.ReactNode | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const handleMount = useCallback((vie: Cesium.Viewer) => {
    console.log('cesium viewer mounted')
    if (!viewer) {
      setViewer(vie);
      const googleMapsImageryProvider = new Cesium.UrlTemplateImageryProvider({
        url : 'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' // 谷歌地图瓦片URL
      });
      vie.imageryLayers.addImageryProvider(googleMapsImageryProvider);
    }
  }, []);

  useEffect(() => {
    if (currentFrame === 1) {
      setAutoRotate(true);
    } else {
      setAutoRotate(false);
    }
  }, [currentFrame])
  
  const nextFrame = () => setCurrentFrame(prev => prev + 1);
  const prevFrame = () => setCurrentFrame(prev => prev - 1);

  return (
    <div className="w-full h-screen" style={{overflow: 'hidden'}}>
      <CesiumGlobe onMount={handleMount} children={children} autoRotate={autoRotate}/>
      {currentFrame === 1 && <Frame1 onNext={nextFrame} viewerRef={viewer} setChildren={setChildren}/>}
      {currentFrame === 2 && <Frame2 onNext={nextFrame} onPrev={prevFrame} viewerRef={viewer} setChildren={setChildren}/>}
      {currentFrame === 3 && <Frame3 onNext={nextFrame} onPrev={prevFrame} viewerRef={viewer} setChildren={setChildren}/>}
      {currentFrame === 4 && <Frame4 onNext={nextFrame} onPrev={prevFrame} viewerRef={viewer} setChildren={setChildren}/>}
      {
        currentFrame !== 1 && (
          <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 bg-opacity-20 hover:bg-opacity-50" style={{height: 300}} onClick={() => (currentFrame < 4 ? nextFrame() : setCurrentFrame(1))}>
            <ChevronRight />
          </button>
        )
      }

      {
        currentFrame !== 1 && (
          <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 bg-opacity-20 hover:bg-opacity-50" style={{height: 300}} onClick={() => (currentFrame > 1 ? prevFrame() : setCurrentFrame(4))}>
            <ChevronLeft />
          </button>
        )
      }
            
      {/* {currentFrame === 5 && <Frame5 onReset={resetFrames} />} */}
    </div>
  );
}

export default App;