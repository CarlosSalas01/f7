import React, { useState } from 'react';
import { Sidebar } from './components/common/Sidebar';
import { TournamentsOverview } from './components/league/TournamentsOverview';
import { PitchVisualMap } from './components/pitches/PitchVisualMap';
import { PitchCard } from './components/pitches/PitchCard';
import { BookingCalendar } from './components/bookings/BookingCalendar';
import { NewBookingModal } from './components/bookings/NewBookingModal';
import { LiveScoreboard } from './components/matches/LiveScoreboard';
import { StandingsTable } from './components/league/StandingsTable';
import { TeamGrid } from './components/teams/TeamGrid';
import { RevenueOverview } from './components/finance/RevenueOverview';

import { useBookings } from './hooks/useBookings';
import { storage } from './services/storage';
import { Pitch } from './types';
import { CalendarPlus, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('tournaments');
  const { pitches, bookings, addBooking, updateBookingStatus, cancelBooking, togglePitchStatus } =
    useBookings();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPitchForBooking, setSelectedPitchForBooking] = useState<Pitch | null>(null);

  const handleOpenBookingModal = (pitch?: Pitch) => {
    setSelectedPitchForBooking(pitch || null);
    setIsBookingModalOpen(true);
  };

  const handleResetData = () => {
    if (window.confirm('¿Deseas restablecer todos los datos de prueba a su estado original?')) {
      storage.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6f9] dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 flex flex-col lg:flex-row font-sans antialiased transition-colors duration-300">
      {/* Sidebar Navigation (Responsive: Top bar + Drawer on mobile, Vertical on desktop) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onResetData={handleResetData} />

      {/* Main Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
          
          {/* Tab 1: Tournaments (Main View from Screenshot) */}
          {activeTab === 'tournaments' && (
            <TournamentsOverview onNavigateTab={setActiveTab} />
          )}

          {/* Tab 2: Teams */}
          {activeTab === 'teams' && <TeamGrid />}

          {/* Tab 3: Fixtures & Canchas */}
          {activeTab === 'fixtures' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 white-card p-6">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-white font-display flex items-center gap-2">
                    Canchas & Fixture de Partidos <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Administra las canchas del complejo, horarios y asignación de turnos
                  </p>
                </div>

                <button
                  onClick={() => handleOpenBookingModal()}
                  className="px-6 py-3 bg-[#a3e635] hover:bg-[#84cc16] text-[#0f172a] font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <CalendarPlus className="w-4 h-4" /> + Nueva Reserva
                </button>
              </div>

              {/* Interactive Pitch Visual Map */}
              <PitchVisualMap
                pitches={pitches}
                bookings={bookings}
                onSelectPitch={(pitch) => handleOpenBookingModal(pitch)}
              />

              {/* Pitch Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pitches.map((pitch) => (
                  <PitchCard
                    key={pitch.id}
                    pitch={pitch}
                    onBookClick={(p) => handleOpenBookingModal(p)}
                    onToggleStatus={togglePitchStatus}
                  />
                ))}
              </div>

              {/* Fixture Calendar */}
              <BookingCalendar
                bookings={bookings}
                pitches={pitches}
                onCancelBooking={cancelBooking}
                onUpdateStatus={updateBookingStatus}
              />
            </div>
          )}

          {/* Tab 4: Results & Marcador en Vivo */}
          {activeTab === 'results' && <LiveScoreboard />}

          {/* Tab 5: Finances */}
          {activeTab === 'finances' && <RevenueOverview />}

        </main>

        {/* Footer */}
        <footer className="py-6 px-10 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2 mt-auto">
          <p>© {new Date().getFullYear()} F7 Manager — Elite League Admin System</p>
          <p className="font-semibold text-slate-700 dark:text-slate-300">React + TypeScript + Tailwind CSS</p>
        </footer>
      </div>

      {/* New Booking Modal */}
      <NewBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        pitches={pitches}
        selectedPitch={selectedPitchForBooking}
        onSubmitBooking={addBooking}
      />
    </div>
  );
}

export default App;
