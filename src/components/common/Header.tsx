import React from 'react';
import { Trophy, Calendar, Activity, Users, DollarSign, ShieldAlert, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onResetData }) => {
  const tabs = [
    { id: 'canchas', label: 'Canchas & Reservas', icon: Calendar },
    { id: 'marcador', label: 'Marcador en Vivo', icon: Activity, badge: 'EN VIVO' },
    { id: 'liga', label: 'Tabla de Liga', icon: Trophy },
    { id: 'equipos', label: 'Equipos & Plantilla', icon: Users },
    { id: 'finanzas', label: 'Finanzas & Caja', icon: DollarSign },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stadium-dark/95 backdrop-blur-md border-b border-stadium-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('canchas')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pitch-600 via-pitch-500 to-pitch-neon p-0.5 shadow-glow-pitch">
              <div className="w-full h-full bg-stadium-dark rounded-[10px] flex items-center justify-center">
                <span className="text-2xl font-black text-pitch-neon tracking-tighter">F7</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  STADIUM <span className="text-pitch-500">PRO</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-pitch-500/20 text-pitch-400 border border-pitch-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Futbol 7
                </span>
              </div>
              <p className="text-xs text-stadium-muted">Gestión de Canchas & Torneos</p>
            </div>
          </div>

          {/* Navigation Bar Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 bg-stadium-surface/60 p-1.5 rounded-2xl border border-stadium-border/60">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-pitch-500 text-stadium-dark font-bold shadow-glow-pitch scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-stadium-card/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stadium-dark' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`px-1.5 py-0.5 text-[9px] font-black rounded-full animate-pulse-fast ${
                      isActive ? 'bg-stadium-dark text-pitch-neon' : 'bg-rose-500 text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onResetData}
              title="Restablecer datos de prueba"
              className="p-2.5 text-slate-400 hover:text-amber-400 hover:bg-stadium-surface rounded-xl border border-stadium-border transition-colors text-xs flex items-center space-x-1"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
            <div className="h-6 w-px bg-stadium-border" />
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-pitch-500 p-0.5">
                <div className="w-full h-full bg-stadium-card rounded-full flex items-center justify-center text-xs font-bold text-white">
                  AD
                </div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-white leading-tight">Admin Cancha</p>
                <p className="text-[10px] text-pitch-400">Online • Liga Central</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex overflow-x-auto py-2 space-x-2 scrollbar-none border-t border-stadium-border/40">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold ${
                  isActive
                    ? 'bg-pitch-500 text-stadium-dark font-bold'
                    : 'bg-stadium-surface text-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
