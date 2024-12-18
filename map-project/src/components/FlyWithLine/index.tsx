import React, { useEffect, useRef } from 'react'
import * as Cesium from 'cesium'

// 定义地点类型
type Location = {
  longitude: number
  latitude: number
  height: number
  name: string
}

type FlyWithLineProps = {
  viewer: Cesium.Viewer // Cesium Viewer 实例
  from: Location // 起点
  to: Location // 终点
}

const FlyWithLine: React.FC<FlyWithLineProps> = ({ viewer, from, to }) => {
  const polylineRef = useRef<Cesium.Entity | null>(null)

  useEffect(() => {
    if (!viewer) return

    // 起点和终点的 Cartesian3 坐标
    const fromPosition = Cesium.Cartesian3.fromDegrees(
      from.longitude,
      from.latitude,
      from.height
    )
    const toPosition = Cesium.Cartesian3.fromDegrees(
      to.longitude,
      to.latitude,
      to.height
    )

    // 动态路径存储
    const positions: Cesium.Cartesian3[] = [fromPosition]

    // 使用 CallbackProperty 实现路径动态更新
    const dynamicPositions = new Cesium.CallbackProperty(() => {
      return positions
    }, false)

    // 添加一条动态的 Polyline
    polylineRef.current = viewer.entities.add({
      polyline: {
        positions: dynamicPositions,
        width: 5,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.2,
          color: Cesium.Color.CYAN,
        }),
      },
    })

    // 飞行动画时间
    const flightDuration = 4000 // 3秒

    // 插值路径点
    const startTime = Date.now()
    function updatePath() {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / flightDuration, 1) // 归一化时间 [0, 1]

      // 计算当前飞行点的位置（线性插值）
      const currentPosition = Cesium.Cartesian3.lerp(
        fromPosition,
        toPosition,
        t,
        new Cesium.Cartesian3()
      )

      positions.push(currentPosition) // 将当前点加入路径
      if (t < 1) {
        requestAnimationFrame(updatePath)
      }
    }

    // 启动飞行路径更新
    updatePath()

    // 启动相机飞行
    viewer.camera.flyTo({
      destination: toPosition,
      duration: flightDuration / 1000, // 以秒为单位
      easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
    })

    // 清理
    return () => {
      if (polylineRef.current) {
        viewer.entities.remove(polylineRef.current)
      }
    }
  }, [viewer, from, to])

  return null
}

export default FlyWithLine
