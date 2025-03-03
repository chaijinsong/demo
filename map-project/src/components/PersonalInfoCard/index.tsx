import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { PersonalInfo } from "../../types";


type PersonalInfoCardProps = {
  personalInfo: PersonalInfo;
};

export const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ personalInfo }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 卡片入场动画
    anime({
      targets: cardRef.current,
      translateX: ["100%", "0%"], // 从右侧滑入
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutCubic",
    });

    // 内容浮现动画
    anime({
      targets: contentRef.current?.children,
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(200), // 每个子元素延迟 200ms
      easing: "easeOutQuad",
      duration: 800,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        width: "300px",
        padding: "20px",
        borderRadius: "8px",
        color: 'white',
        fontFamily: "Arial, sans-serif",
        position: "absolute",
        top: "50%",
        right: "5%", // 组件居右
        transform: "translateY(-50%)", // 垂直居中
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // 轻微阴影
      }}
    >
      {/* 内容 */}
      <div ref={contentRef}>
        <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>{personalInfo.name}</h2>
        <p style={{ marginBottom: "10px", fontSize: "14px", opacity: 0.8 }}>
          {personalInfo.title}
        </p>
        <div style={{ marginBottom: "10px",  }}> 
          <strong>技能:</strong>{" "}
          <div className="flex flex-wrap gap-1"> 
            {personalInfo.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p style={{ marginBottom: "10px" }}>
          <strong>电话:</strong> {personalInfo.phone}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>github:</strong> {personalInfo.github}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>linkedin:</strong> {personalInfo.linkedin}
        </p>
        <p style={{ marginBottom: "10px" }}>
          <strong>邮箱:</strong> {personalInfo.email}
        </p>
        <p style={{ marginBottom: "0" }}>
          <strong>位置:</strong> {personalInfo.location.name} ({personalInfo.location.latitude},{" "}
          {personalInfo.location.longitude})
        </p>
      </div>
    </div>
  );
};
