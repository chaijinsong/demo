import React, { useEffect, useRef } from 'react'
import anime from 'animejs'
import { WorkExperience } from '../../types'
type WorkExperienceCardProps = {
  workExperience: WorkExperience[]
}

export const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
  workExperience,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 卡片入场动画（从右侧滑入）
    anime({
      targets: cardRef.current,
      translateX: ['100%', '0%'],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutCubic',
    })

    // 每条工作经历的浮现动画
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
      className="custom-scrollbar"
      style={{
        width: '400px',
        padding: '20px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        position: 'absolute',
        top: '50%',
        right: '5%', // 居右
        transform: 'translateY(-50%)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        maxHeight: '80vh',
        overflowY: 'auto',
        pointerEvents: 'all',
      }}
    >
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            transition: background 0.2s ease;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
        `}
      </style>
      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>工作经历</h2>
      <div ref={contentRef}>
        {workExperience.map((work, index) => (
          <div
            key={index}
            style={{
              marginBottom: '15px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '18px' }}>{work.company}</h3>
            <p style={{ margin: '5px 0', opacity: 0.8 }}>
              {work.position} ({work.period})
            </p>
            <ul style={{ margin: '5px 0', paddingLeft: '20px', opacity: 0.7 }}>
              {work.responsibilities.map((resp, i) => (
                <li key={i} style={{ fontSize: '14px' }}>
                  {resp}
                </li>
              ))}
            </ul>
            <ul style={{ margin: '5px 0', paddingLeft: '20px', opacity: 0.7 }}>
              <li style={{ fontSize: '14px' }}>成就:</li>
              {work.achievements.map((achievement, i) => (
                <li key={i} style={{ fontSize: '14px' }}>
                  {achievement}
                </li>
              ))}
            </ul>
            <p style={{ margin: 0, fontSize: '14px' }}>
              地点: {work.location.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
