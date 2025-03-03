import { ReactNode } from 'react';

interface ResumeCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ResumeCard({ title, children, className = '' }: ResumeCardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-xl ${className}`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}