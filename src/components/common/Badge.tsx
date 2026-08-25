import React from 'react';
import { getStatusBadgeColor } from '../../utils/formatters';

interface BadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  const colors = getStatusBadgeColor(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
      {status}
    </span>
  );
};
