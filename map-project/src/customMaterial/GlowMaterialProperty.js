import * as Cesium from "cesium";

// 自定义发光材质的 MaterialProperty
class GlowMaterialProperty {
  constructor(color = Cesium.Color.YELLOW, glowPower = 0.3) {
    this.color = new Cesium.ConstantProperty(color); // 确保使用 Cesium.Property
    this.glowPower = new Cesium.ConstantProperty(glowPower); // 确保使用 Cesium.Property
    this.definitionChanged = new Cesium.Event(); // 必须包含，用于触发材质变化事件
  }

  // 返回材质类型（必须实现此方法）
  getType(time) {
    return Cesium.Material.GlowMaterialType;
  }

  // 返回材质的值
  getValue(time, result) {
    if (!result) {
      result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this.color, time, Cesium.Color.WHITE);
    result.glowPower = Cesium.Property.getValueOrDefault(this.glowPower, time, 0.3);
    return result;
  }

  // 判断是否相等
  equals(other) {
    return (
      this === other ||
      (other instanceof GlowMaterialProperty &&
        Cesium.Property.equals(this.color, other.color) &&
        Cesium.Property.equals(this.glowPower, other.glowPower))
    );
  }
}

// 注册自定义发光材质
Cesium.Material.GlowMaterialType = "GlowMaterial";
Cesium.Material._materialCache.addMaterial(Cesium.Material.GlowMaterialType, {
  fabric: {
    type: Cesium.Material.GlowMaterialType,
    uniforms: {
      color: Cesium.Color.YELLOW,
      glowPower: 0.3,
    },
    source: `
      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);

        // 计算纹理坐标的径向渐变
        float gradient = 1.0 - length(materialInput.st - vec2(0.5, 0.5)) * 2.0;

        // 应用发光效果
        gradient = clamp(gradient * glowPower, 0.0, 1.0);

        material.diffuse = color.rgb;
        material.alpha = color.a * gradient; // 透明度随光晕变化
        return material;
      }
    `,
  },
  translucent: function () {
    return true; // 材质透明度受控制
  },
});

// 使用封装的发光材质
export function createGlowMaterialProperty(color, glowPower) {
  return new GlowMaterialProperty(color, glowPower);
}
