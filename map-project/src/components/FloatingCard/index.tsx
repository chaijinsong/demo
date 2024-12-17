import { ReactNode } from 'react';
import anime from 'animejs';
import { useEffect, useRef } from 'react';

interface FloatingCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  show?: boolean;
  style?: React.CSSProperties;
}

export default function FloatingCard({ title, children, className = '', show = true, style }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !show) return;

    anime({
      targets: cardRef.current,
      translateX: [100, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }, [show]);

  if (!show) return null;

  return (
    <div 
      ref={cardRef}
      className={`absolute right-8 top-8 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl w-80 ${className}`}
      style={{ opacity: 0, ...style }}
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}