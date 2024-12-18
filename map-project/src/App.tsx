import { useState, useCallback } from 'react';
import CesiumGlobe from './components/CesiumGlobe';
import * as Cesium from 'cesium';
import Frame1 from './pages/Frame1';
import Frame2 from './pages/Frame2';
import Frame3 from './pages/Frame3';
import Frame4 from './pages/Frame4';
// import Frame5 from './pages/Frame5';

function App() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [viewer, setViewer] = useState<Cesium.Viewer | null>(null);
  const [children, setChildren] = useState<React.ReactNode | null>(null);
  const handleMount = useCallback((viewer: Cesium.Viewer) => {
    console.log('cesium viewer mounted')
    setViewer(viewer);
  }, []);
  
  const nextFrame = () => setCurrentFrame(prev => prev + 1);
  const prevFrame = () => setCurrentFrame(prev => prev - 1);

  return (
    <div className="w-full h-screen" style={{overflow: 'hidden'}}>
      <CesiumGlobe onMount={handleMount} children={children}/>
      {currentFrame === 1 && <Frame1 onNext={nextFrame} viewerRef={viewer}/>}
      {currentFrame === 2 && <Frame2 onNext={nextFrame} onPrev={prevFrame} viewerRef={viewer} setChildren={setChildren}/>}
      {currentFrame === 3 && <Frame3 onNext={nextFrame} onPrev={prevFrame} viewerRef={viewer} setChildren={setChildren}/>}
      {currentFrame === 4 && <Frame4 onNext={nextFrame} onPrev={prevFrame} viewerRef={viewer} setChildren={setChildren}/>}
      {/* {currentFrame === 5 && <Frame5 onReset={resetFrames} />} */}
    </div>
  );
}

export default App;