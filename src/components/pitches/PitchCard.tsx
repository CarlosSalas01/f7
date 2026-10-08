import React from 'react';
import { Pitch } from '../../types';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';
import { Check, ShieldCheck, Sun, Moon, CalendarPlus } from 'lucide-react';

interface PitchCardProps {
  pitch: Pitch;
  onBookClick: (pitch: Pitch) => void;
  onToggleStatus: (pitchId: string, currentStatus: Pitch['status']) => void;
}

export const PitchCard: React.FC<PitchCardProps> = ({ pitch, onBookClick, onToggleStatus }) => {
  return (
    <div className="white-card white-card-hover overflow-hidden flex flex-col justify-between">

    </div>
  );
};
