import React, { useState } from 'react';
import { Booking, Pitch } from '../../types';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Calendar, Phone, XCircle, DollarSign, Clock } from 'lucide-react';

interface BookingCalendarProps {
  bookings: Booking[];
  pitches: Pitch[];
  onCancelBooking: (id: string) => void;
  onUpdateStatus: (id: string, status: Booking['status'], paymentStatus?: Booking['paymentStatus']) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  bookings,
  pitches,
  onCancelBooking,
  onUpdateStatus,
}) => {
  const [selectedPitchFilter, setSelectedPitchFilter] = useState<string>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter((b) => {
    if (selectedPitchFilter !== 'ALL' && b.pitchId !== selectedPitchFilter) return false;
    if (selectedStatusFilter !== 'ALL' && b.status !== selectedStatusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        (b.teamA && b.teamA.toLowerCase().includes(q)) ||
        (b.teamB && b.teamB.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="white-card p-4 sm:p-6 space-y-6">

    </div>
  );
};
