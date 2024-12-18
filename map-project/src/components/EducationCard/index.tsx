import React, { useEffect, useRef } from 'react'
import anime from 'animejs'

// 定义 Education 的类型
type Education = {
  school: string
  degree: string
  major: string
  period: string
  location: {
    longitude: number
    latitude: number
    height: number
    name: string
  }
}

type EducationCardProps = {
  education: Education[]
}

export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 卡片入场动画（从左侧滑入）
    anime({
      targets: cardRef.current,
      translateX: ['-100%', '0%'],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutCubic',
    })

    // 每条教育经历的浮现动画
    anime({
      targets: contentRef.current?.children,
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(200), // 每条经历延迟 200ms
      easing: 'easeOutQuad',
      duration: 800,
    })
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        width: '400px',
        padding: '20px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        position: 'absolute',
        top: '50%',
        left: '5%', // 居左
        transform: 'translateY(-50%)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>教育经历</h2>
      <div ref={contentRef}>
        {education.map((edu, index) => (
          <div
            key={index}
            style={{
              marginBottom: '15px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '18px' }}>{edu.school}</h3>
            <p style={{ margin: '5px 0', opacity: 0.8 }}>
              {edu.degree} - {edu.major}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px', opacity: 0.7 }}>
              {edu.period}
            </p>
            <p style={{ margin: 0, fontSize: '14px' }}>
              地点: {edu.location.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
