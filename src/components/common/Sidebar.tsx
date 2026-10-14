import React, { useState } from 'react';
import {
  Trophy,
  Users,
  Calendar,
  Flag,
  DollarSign,
  LogOut,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onResetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onResetData }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'tournaments', label: 'Torneos', icon: Trophy },
    { id: 'teams', label: 'Equipos', icon: Users },
    { id: 'fixtures', label: 'Partidos', icon: Calendar },
    { id: 'results', label: 'Resultados', icon: Flag },
    { id: 'finances', label: 'Finanzas', icon: DollarSign },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header Bar (< lg) */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#032e22] text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-[#064e3b]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#a3e635] text-[#032e22] flex items-center justify-center font-black text-base shadow-sm">
            F7
          </div>
          <div>
            <h1 className="font-display font-extrabold text-base text-white leading-tight">
              F7 Manager
            </h1>
            <p className="text-[10px] text-[#94a3b8]">Elite League Admin</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl bg-[#064e3b] text-white hover:bg-[#527a14] transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#032e22] text-white flex flex-col justify-between p-5 shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#064e3b]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#a3e635] text-[#032e22] flex items-center justify-center font-black text-lg shadow-sm">
                F7
              </div>
              <div>
                <h2 className="font-display font-extrabold text-lg text-white leading-tight">
                  F7 Manager
                </h2>
                <p className="text-[11px] text-[#94a3b8]">Elite League Admin</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#064e3b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#527a14] text-white shadow-md'
                      : 'text-slate-300 hover:bg-[#064e3b]/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#064e3b]">
          <div className="px-1">
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 border border-[#a3e635] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Admin User</p>
                <button
                  onClick={onResetData}
                  className="text-[11px] text-slate-400 hover:text-[#a3e635] flex items-center gap-1 transition-colors"
                >
                  Logout / Reset
                </button>
              </div>
            </div>
            <button
              onClick={onResetData}
              title="Reset Demo Data"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#064e3b]"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Vertical Left Sidebar (>= lg) */}
      <aside
        className={`hidden lg:flex bg-[#032e22] text-white flex-col justify-between min-h-screen flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20 p-3' : 'w-64 p-5'
        }`}
      >
        <div className="space-y-8">
          {/* Brand Header */}
          <div
            className={`flex pt-2 ${
              isCollapsed ? 'flex-col items-center gap-3 px-0' : 'items-center justify-between px-2'
            }`}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-10 h-10 rounded-2xl bg-[#a3e635] text-[#032e22] flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0">
                F7
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-display font-extrabold text-lg text-white leading-tight">
                    F7 Manager
                  </h1>
                  <p className="text-[11px] text-[#94a3b8]">Elite League Admin</p>
                </div>
              )}
            </div>

            {/* Collapse / Expand Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
              aria-label={isCollapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
              aria-expanded={!isCollapsed}
              className={`flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-[#064e3b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#a3e635]/50 ${
                isCollapsed ? 'p-2' : 'p-1.5'
              }`}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isCollapsed ? 'justify-center px-0 py-3' : 'space-x-3 px-4 py-3'
                  } ${
                    isActive
                      ? 'bg-[#527a14] text-white shadow-md'
                      : 'text-slate-300 hover:bg-[#064e3b]/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4">
          {/* Theme Toggle Switch */}
          <div className={isCollapsed ? '' : 'px-1'}>
            <ThemeToggle collapsed={isCollapsed} />
          </div>

          {/* User Profile at Bottom */}
          <div
            className={`flex border-t border-[#064e3b] pt-4 ${
              isCollapsed ? 'flex-col items-center gap-2 px-0' : 'items-center justify-between px-2'
            }`}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-9 h-9 rounded-full bg-slate-200 border border-[#a3e635] overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isCollapsed && (
                <div>
                  <p className="text-xs font-bold text-white">Admin User</p>
                  <button
                    onClick={onResetData}
                    className="text-[11px] text-slate-400 hover:text-[#a3e635] flex items-center gap-1 transition-colors"
                  >
                    Logout / Reset
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onResetData}
              title="Reset Demo Data"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#064e3b]"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
