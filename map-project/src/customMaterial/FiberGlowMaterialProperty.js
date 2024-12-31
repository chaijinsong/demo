import * as Cesium from "cesium";

// 自定义光纤发光材质的 MaterialProperty
class FiberGlowMaterialProperty {
  constructor(color = Cesium.Color.YELLOW, glowPower = 0.3, noiseFactor = 0.1) {
    this.color = new Cesium.ConstantProperty(color); // 确保使用 Cesium.Property
    this.glowPower = new Cesium.ConstantProperty(glowPower); // 确保使用 Cesium.Property
    this.noiseFactor = new Cesium.ConstantProperty(noiseFactor); // 随机噪声因子，用于模拟光斑
    this.definitionChanged = new Cesium.Event(); // 必须包含，用于触发材质变化事件
  }

  // 返回材质类型（必须实现此方法）
  getType(time) {
    return Cesium.Material.FiberGlowMaterialType;
  }

  // 返回材质的值
  getValue(time, result) {
    if (!result) {
      result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this.color, time, Cesium.Color.WHITE);
    result.glowPower = Cesium.Property.getValueOrDefault(this.glowPower, time, 0.3);
    result.noiseFactor = Cesium.Property.getValueOrDefault(this.noiseFactor, time, 0.1);
    return result;
  }

  // 判断是否相等
  equals(other) {
    return (
      this === other ||
      (other instanceof FiberGlowMaterialProperty &&
        Cesium.Property.equals(this.color, other.color) &&
        Cesium.Property.equals(this.glowPower, other.glowPower) &&
        Cesium.Property.equals(this.noiseFactor, other.noiseFactor))
    );
  }
}

// 注册自定义光纤发光材质
Cesium.Material.FiberGlowMaterialType = "FiberGlowMaterial";
Cesium.Material._materialCache.addMaterial(Cesium.Material.FiberGlowMaterialType, {
  fabric: {
    type: Cesium.Material.FiberGlowMaterialType,
    uniforms: {
      color: Cesium.Color.YELLOW,
      glowPower: 0.3,
      noiseFactor: 0.1,
      time: 0.0, // 添加时间的 uniform 变量
    },
    source: `
      uniform float glowPower;
      uniform float noiseFactor;
      uniform float time;
      uniform vec4 color;

      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);

        // 计算沿线的距离
        float lengthFactor = length(materialInput.st - vec2(0.5, 0.5)) * 2.0;

        // 基本的光晕效果
        float glow = exp(-lengthFactor * glowPower);

        // 增加一些噪声效果来模拟光斑
        float noise = sin(time * 10.0 + materialInput.st.s * 5.0) * noiseFactor;

        // 最终的颜色和透明度效果
        material.diffuse = color.rgb;
        material.alpha = glow + noise;

        return material;
      }
    `,
  },
  translucent: function () {
    return true; // 材质透明度受控制
  },
});


// 使用封装的光纤发光材质
export function createFiberGlowMaterialProperty(color, glowPower, noiseFactor) {
  return new FiberGlowMaterialProperty(color, glowPower, noiseFactor);
}