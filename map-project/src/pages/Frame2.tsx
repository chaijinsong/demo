import { useEffect } from 'react';
import LocationMarker from '../components/LocationMarker';
import { personalInfo } from '../data/resumeData';
import * as Cesium from 'cesium';
import { HeadingPitchRoll } from 'cesium';
import { Math as CesiumMath } from 'cesium';
import { PersonalInfoCard } from '../components/PersonalInfoCard'
import FlyWithLine from '../components/FlyWithLine'

interface Frame2Props {
  onNext?: () => void
  onPrev?: () => void
  viewerRef: Cesium.Viewer | null
  setChildren: (children: React.ReactNode) => void
}

function generateParabolicCurve(start: Cesium.Cartesian3, end: Cesium.Cartesian3, numPoints: number, maxHeight: number) {
  // 计算两个点之间的插值，numPoints 决定生成多少个点，maxHeight 控制抛物线的最高点
  const points = [];
  
  // 计算起始点和结束点之间的插值
  for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints; // 插值比例，0 到 1
      const position = Cesium.Cartesian3.lerp(start, end, t, new Cesium.Cartesian3());

      // 计算抛物线的高度（通过 t 来计算）
      const height = maxHeight * (1 - Math.pow(2 * t - 1, 2)); // 抛物线方程，t=0时为0，高度最大值时为t=0.5

      // 对中间点加上高度，使得中间点为最高点
      position.z += height;

      points.push(position);
  }

  return points;
}

function drawLine(viewer: Cesium.Viewer) {
  // 发光效果材质
  const glowingMaterial = new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.5,
    taperPower: 0.5,
    color: Cesium.Color.YELLOW,
  });

  // 发射点位置
  const startPoint = Cesium.Cartesian3.fromDegrees(116.4, 39.9, 0);

  // 目标点位置数组
  const targetPoints = [
    Cesium.Cartesian3.fromDegrees(116.5, 39.95, 0),
    // Cesium.Cartesian3.fromDegrees(116.6, 39.85, 0),
    // Cesium.Cartesian3.fromDegrees(116.7, 39.8, 0)
  ];

  const polylineCollection = new Cesium.PolylineCollection();
  viewer.scene.primitives.add(polylineCollection);

  targetPoints.forEach((endPoint, index) => {
    polylineCollection.add({
      show : true,
      positions : generateParabolicCurve(startPoint, endPoint, 100, 1000),
      width : 5
    });
  
    // 在目标点创建一个小面板
    // const label = viewer.entities.add({
    //   position: endPoint,
    //   label: {
    //     text: `信息 ${index + 1}`,
    //     font: '14px sans-serif',
    //     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    //     outlineWidth: 2,
    //     outlineColor: Cesium.Color.BLACK,
    //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //     pixelOffset: new Cesium.Cartesian2(0, -20) // 控制标签相对目标点的位置
    //   }
    // });
  });
}


// 第二页，个人信息
export default function Frame2({ onNext, onPrev, viewerRef, setChildren }: Frame2Props) {
  useEffect(() => {
    if (viewerRef) {

      drawLine(viewerRef)
      // 获取Viewer实例

      viewerRef.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.4, 39.9, 2000),
        // orientation: orientation,
      });

    }
  }, [viewerRef])

  return (
    <div
      className="relative w-full h-screen"
      style={{
        pointerEvents: 'none',
      }}
    >
      {/* <PersonalInfoCard personalInfo={personalInfo} /> */}
      {/* <button style={{pointerEvents: 'all'}} onClick={onNext}>下一页</button>
      <button style={{pointerEvents: 'all'}} onClick={onPrev}>上一页</button> */}
    </div>
  )
}
