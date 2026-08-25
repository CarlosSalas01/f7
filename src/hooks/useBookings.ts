import { useState, useEffect } from 'react';
import { Booking, Pitch } from '../types';
import { storage } from '../services/storage';

export function useBookings() {
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setPitches(storage.getPitches());
    setBookings(storage.getBookings());
  }, []);

  const addBooking = (newBookingData: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...newBookingData,
      id: `bk-${Date.now()}`,
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    storage.saveBookings(updated);

    // Update finances as well
    const finances = storage.getFinances();
    finances.totalRevenue += newBooking.depositPaid;
    if (newBooking.totalPrice > newBooking.depositPaid) {
      finances.pendingCollect += (newBooking.totalPrice - newBooking.depositPaid);
    }
    finances.totalBookings += 1;
    finances.recentTransactions.unshift({
      id: `tx-${Date.now()}`,
      bookingId: newBooking.id,
      customer: newBooking.customerName,
      pitchName: newBooking.pitchName,
      amount: newBooking.depositPaid,
      method: newBooking.paymentMethod,
      date: newBooking.date,
      type: newBooking.depositPaid === newBooking.totalPrice ? 'Pago Completo' : 'Anticipo',
    });
    storage.saveFinances(finances);

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status'], paymentStatus?: Booking['paymentStatus']) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          status,
          ...(paymentStatus ? { paymentStatus } : {}),
        };
      }
      return b;
    });
    setBookings(updated);
    storage.saveBookings(updated);
  };

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, 'Cancelada');
  };

  const togglePitchStatus = (pitchId: string, status: Pitch['status']) => {
    const updatedPitches = pitches.map((p) => (p.id === pitchId ? { ...p, status } : p));
    setPitches(updatedPitches);
    storage.savePitches(updatedPitches);
  };

  return {
    pitches,
    bookings,
    addBooking,
    updateBookingStatus,
    cancelBooking,
    togglePitchStatus,
  };
}
