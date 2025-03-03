import React, { useEffect, useRef } from "react";
import * as Cesium from "cesium";

type FlyWithLineProps = {
  viewer: Cesium.Viewer; // Cesium Viewer 实例
  from: Cesium.Cartesian3; // 起点坐标
  to: Cesium.Cartesian3; // 终点坐标
  modelUrl: string; // 飞机模型的路径（如 .glb 文件）
  duration?: number; // 动画时长（单位：秒，默认 10 秒）
};

const FlyWithLine: React.FC<FlyWithLineProps> = ({ viewer, from, to, modelUrl, duration = 10 }) => {
  const lineEntityRef = useRef<Cesium.Entity>();
  const planeEntityRef = useRef<Cesium.Entity>();

  useEffect(() => {
    if (!viewer || !from || !to) return;

    // 1. 设置动画时间
    const startTime = Cesium.JulianDate.now();
    const stopTime = Cesium.JulianDate.addSeconds(startTime, duration, new Cesium.JulianDate());
    viewer.clock.startTime = startTime.clone();
    viewer.clock.stopTime = stopTime.clone();
    viewer.clock.currentTime = startTime.clone();
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 动画结束后停止
    viewer.clock.multiplier = 1;

    // 2. 生成路径轨迹（起点到终点）
    const positionProperty = new Cesium.SampledPositionProperty();
    const midPoint = Cesium.Cartesian3.midpoint(from, to, new Cesium.Cartesian3()); // 计算中点
    midPoint.z += 50000; // 提升高度，形成弧线轨迹

    // 添加起点、中点和终点的时间点
    positionProperty.addSample(startTime, from);
    positionProperty.addSample(
      Cesium.JulianDate.addSeconds(startTime, duration / 2, new Cesium.JulianDate()),
      midPoint
    );
    positionProperty.addSample(stopTime, to);

    // 3. 添加飞行路径线条
    const lineEntity = viewer.entities.add({
      polyline: {
        positions: [from, midPoint, to],
        width: 5,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.2,
          color: Cesium.Color.CYAN,
        }),
      },
    });
    lineEntityRef.current = lineEntity;

    // 4. 添加飞机模型
    const planeEntity = viewer.entities.add({
      position: positionProperty,
      model: {
        uri: modelUrl, // 模型路径
        scale: 0.5, // 调整飞机模型大小
      },
      orientation: new Cesium.VelocityOrientationProperty(positionProperty), // 自动计算朝向
    });
    planeEntityRef.current = planeEntity;

    // 5. 设置摄像机飞行到起点视角
    viewer.scene.camera.flyTo({
      destination: from,
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-45),
        roll: 0.0,
      },
      duration: 2,
    });

    return () => {
      // 清理实体
      if (lineEntityRef.current) {
        viewer.entities.remove(lineEntityRef.current);
      }
      if (planeEntityRef.current) {
        viewer.entities.remove(planeEntityRef.current);
      }
    };
  }, [viewer, from, to, modelUrl, duration]);

  return null;
};

export default FlyWithLine;
