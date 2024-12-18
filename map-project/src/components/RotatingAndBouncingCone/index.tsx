import React, { useEffect } from 'react';
import { Entity } from 'resium';
import { Cartesian3, SampledPositionProperty, JulianDate, Math as CesiumMath, HeadingPitchRoll } from 'cesium';

const RotatingAndBouncingCone = ({ longitude, latitude, heightAmplitude = 1000, period = 2, modelUri }: { longitude: number, latitude: number, heightAmplitude?: number, period?: number, modelUri?: string }   ) => {
  // 创建位置动画轨迹（上下跳动）
  const position = new SampledPositionProperty();
  const currentTime = JulianDate.now();
  const timeStep = 1 / 60; // 每秒更新60次

  // 为跳动效果添加位置样本
  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      const time = JulianDate.addSeconds(currentTime, timeStep * i, new JulianDate());
      const height = heightAmplitude * Math.sin((2 * Math.PI * i) / period); // 跳动公式
      position.addSample(time, Cartesian3.fromDegrees(longitude, latitude, height));
    }
  }, [longitude, latitude, heightAmplitude, period]);

  // 定义旋转效果
  const rotation = new HeadingPitchRoll(
    CesiumMath.toRadians(0),    // heading: 0，表示正北
    CesiumMath.toRadians(0),    // pitch: 0，表示相机水平
    CesiumMath.toRadians(90)    // roll: 90，表示旋转90度
  );

  return (
    <Entity
      name="Rotating and Bouncing Cone"
      position={Cartesian3.fromDegrees(longitude, latitude, 200)}  // 上下跳动的轨迹
      model={{
        uri: modelUri, // 3D模型路径
        minimumPixelSize: 64,
        maximumScale: 200,
        scale: 1.0, // 调整模型的大小
      }}
      orientation={rotation} // 设置模型的旋转
    />
  );
};

export default RotatingAndBouncingCone;
