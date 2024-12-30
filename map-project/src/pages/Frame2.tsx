import { useEffect, useRef, useState } from 'react';
import LocationMarker from '../components/LocationMarker';
import { personalInfo } from '../data/resumeData';
import * as Cesium from 'cesium';
import { HeadingPitchRoll } from 'cesium';
import { Math as CesiumMath } from 'cesium';
import { PersonalInfoCard } from '../components/PersonalInfoCard'
import FlyWithLine from '../components/FlyWithLine'

window.Cesium = Cesium;

/*
  frame2 推荐视角
  {
    "longitude": 116.38883925278479,
    "latitude": 39.778450026240876,
    "height": 6273.956315649068,
    "heading": 358.35795288086166,
    "pitch": -29.519120536129364,
    "roll": 0.005211170799622822
  }

  function restoreCameraState(viewer, state) {
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(state.longitude, state.latitude, state.height), // 经纬度和高度
        orientation: {
            heading: Cesium.Math.toRadians(state.heading), // 转为弧度
            pitch: Cesium.Math.toRadians(state.pitch),
            roll: Cesium.Math.toRadians(state.roll),
        },
    });
  }
*/

interface Frame2Props {
  onNext?: () => void
  onPrev?: () => void
  viewerRef: Cesium.Viewer | null
  setChildren: (children: React.ReactNode) => void
}

// 计算曲线
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

// 画线
function drawLine(viewer: Cesium.Viewer) {
  // 发光效果材质
  const glowingMaterial = new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.1,
    taperPower: 0.9,
    color: Cesium.Color.ORANGERED.withAlpha(0.8),
  });

  // 发射点位置
  const startPoint = Cesium.Cartesian3.fromDegrees(116.4, 39.9, 0);
  viewer.entities.add({
    position: startPoint,
    billboard: {
      image: "./imgs/green-arrow.png", // 自定义背景图片
      width: 100, // 图标宽度
      height: 100, // 图标高度
      pixelOffset: new Cesium.Cartesian2(0, -25), // 偏移，调整 Label 和图标不重叠
    },
  })


  const tips = [
    {
      "key": "姓名",
      "value": "柴劲松",
      point: Cesium.Cartesian3.fromDegrees(116.33197486835621,39.994065912992966, 0),
      curveHeight: getRandomNumberInRange(1000, 2000),
    },
    // {
    //   "key": "性别",
    //   "value": "男",
    //   point: Cesium.Cartesian3.fromDegrees(116.35311440201328, 39.86421458140552, 0),
    //   curveHeight: getRandomNumberInRange(1000, 2000),
    // },
    // {
    //   "key": "出生日期",
    //   "value": "1995 年 3 月 15 日",
    //   point: Cesium.Cartesian3.fromDegrees(116.31328616210703, 39.956931325665714, 0),
    //   curveHeight: getRandomNumberInRange(1000, 2000),
    // },
    {
      "key": "手机号码",
      "value": "15035806407",
      point: Cesium.Cartesian3.fromDegrees(116.47571970993637,39.998954572885765, 0),
      curveHeight: getRandomNumberInRange(1000, 2000),
    },
    {
      "key": "电子邮箱",
      "value": "15035806407@163.com",
      point: Cesium.Cartesian3.fromDegrees(116.49063412088599,39.899570429789215, 0),
      curveHeight: getRandomNumberInRange(1000, 2000),
    },
    {
      "key": "现居地",
      "value": "北京市海淀区",
      point: Cesium.Cartesian3.fromDegrees(116.4409155962572,39.84084926821931, 0),
      curveHeight: getRandomNumberInRange(1000, 2000),
    },
    {
      "key": "毕业院校",
      "value": "武汉大学",
      point: Cesium.Cartesian3.fromDegrees(116.3519761930329,39.85770394533406, 0),
      curveHeight: getRandomNumberInRange(1000, 2000),
    },
    {
      "key": "所学专业",
      "value": "计算机科学与技术",
      point: Cesium.Cartesian3.fromDegrees(116.2987688375657,39.90546569941321, 0),
      curveHeight: getRandomNumberInRange(1000, 2000),
    },
    {
      "key": "求职岗位",
      "value": "软件工程师",
      point: Cesium.Cartesian3.fromDegrees(116.3929074577457,39.832078163773346, 0),
      curveHeight: getRandomNumberInRange(1000, 2000),
    },
  ]

  tips.forEach((tip) => {
    viewer.entities.add({
      polyline: {
        positions: generateParabolicCurve(tip.point, startPoint , 1000, tip.curveHeight),
        // width: getRandomNumberInRange(4, 6),
        width: 10,
        material: glowingMaterial,
        arcType: Cesium.ArcType.NONE,
        // material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE),
      },
    })

    // hideShowPic(viewer, tip.point);

    // 在目标点创建一个小面板
    const panel = viewer.entities.add({
      position: tip.point,
      billboard: {
        // image: "./imgs/frame2-text-box.png", // 自定义背景图片
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -10),
      },
      label: {
        text: tip.key + ':' + tip.value, // 初始文字
        font: "16px sans-serif", // 字体样式
        fillColor: Cesium.Color.WHITE,
        // outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        // style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -18),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    });

    // 动态调整 Billboard 尺寸
    panel && panel.label && adjustBillboardToLabel(panel, panel.label.text);
  });
}

// 曲线的动画效果、动态设置光线效果
function runningPolyline(glowingMaterial) {
  let glowStrength = 0.5;
  function updateGlowPower() {
    glowStrength = glowStrength === 0.5 ? 1.0 : 0.5; // 交替变化强度
    glowingMaterial.glowPower = glowStrength;  // 更新发光强度
  }

  setInterval(updateGlowPower, 100); // 每秒切换一次
}

// 创建 Canvas 来动态生成渐变背景图片
function createGradientImage(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // 创建线性渐变
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "rgb(21 77 189)");
  gradient.addColorStop(0.5, "rgb(41 77 150)");
  gradient.addColorStop(1, "rgb(150 167 202)");  
  // gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/png");
}

// 动态调整背景图片的宽度，适应文字
function adjustBillboardToLabel(entity, text) {
  // 创建临时 canvas 计算文本宽度
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = "16px sans-serif"; // 与 Label 字体保持一致

  const textWidth = context.measureText(text).width;

  // 生成适合文本宽度的渐变图片
  const gradientImageUrl = createGradientImage(textWidth + 20, 30); // 留出一些 padding
  entity.billboard.image = gradientImageUrl;

  // 根据需要调整 billboard 的 `scale` 或 `pixelOffset`
  entity.billboard.scale = 1.0;
}

// 重置视角
function restoreCameraState(viewer, state) {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(state.longitude, state.latitude, state.height), // 经纬度和高度
    orientation: {
      heading: Cesium.Math.toRadians(state.heading), // 转为弧度
      pitch: Cesium.Math.toRadians(state.pitch),
      roll: Cesium.Math.toRadians(state.roll),
    },
  });
}

const FRAME2_DEFAULT_CAMERA_STATE = {
  "longitude": 116.37971981871594,
  "latitude": 39.756058929250585,
  "height": 7102.694382693418,
  "heading": 359.46721389828394,
  "pitch": -29.834066765479285,
  "roll": 359.9979089651042
}

// 获取点击事件位置
const getClicPosition = (viewer) => {
  // 创建一个事件处理器来监听鼠标点击
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

  // 监听鼠标左键点击事件
  handler.setInputAction(function (movement) {
    // 获取鼠标点击的屏幕坐标
    const position = movement.position;

    // 将屏幕坐标转换为世界坐标（经纬度）
    const ray = viewer.camera.getPickRay(position);  // 获取射线
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);

    if (cartesian) {
      // 如果点击的是地球表面，转换为经纬度
      const longitudeLatitude = Cesium.Cartographic.fromCartesian(cartesian);
      const longitude = Cesium.Math.toDegrees(longitudeLatitude.longitude);
      const latitude = Cesium.Math.toDegrees(longitudeLatitude.latitude);
      const height = cartesian.z;  // 获取高度

      console.log(`点击位置：经度: [${longitude},${latitude}], 高度: ${height}`);
    } else {
      console.log('点击位置不在地球表面');
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// 获取range
function getRandomNumberInRange(min, max) {
  if (min > max) {
    throw new Error("min should be less than or equal to max");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 动态控制图片的显影动画
function hideShowPic(viewer, point, img = './imgs/green-arrow.png') {
  const glowingEntity = viewer.entities.add({
    position: point, // 北京坐标
    billboard: {
      image: img, // 空白图片
      scale: 1.0,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1000000),
    },
  });

  // 动态调整光晕效果
  viewer.scene.preRender.addEventListener(() => {
    const time = Date.now() * 0.001; // 时间因子
    glowingEntity.billboard.color = Cesium.Color.WHITE.withAlpha(
      0.5 + 0.5 * Math.sin(time) // 动态透明度变化
    );
  });
}

// 第二页，个人信息
export default function Frame2({ onNext, onPrev, viewerRef, setChildren }: Frame2Props) {
  const hasInited = useRef(false);

  useEffect(() => {
    if (viewerRef && !hasInited.current) {
      hasInited.current = true;

      drawLine(viewerRef)
      // 获取Viewer实例

      restoreCameraState(viewerRef, FRAME2_DEFAULT_CAMERA_STATE)

      getClicPosition(viewerRef)

      // viewerRef.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(116.4, 39.9, 2000),
      //   // orientation: orientation,
      // });

    }
  }, [viewerRef, hasInited])

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
