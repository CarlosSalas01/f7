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
  ChevronLeft,
  ChevronRight,
  ListOrdered,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import adminImage from '../../assets/img/admin.jpg';

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
    // { id: 'finances', label: 'Finanzas', icon: DollarSign },
    { id: 'positions', label: 'Posiciones', icon: ListOrdered },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header Bar (< lg) */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#0e5f22] bg-[#0A4D1A] px-4 py-3 text-white shadow-md lg:hidden">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2FE85F] text-base font-black text-[#0A4D1A] shadow-sm">
            F7
          </div>
          <div>
            <h1 className="font-display text-base leading-tight font-extrabold text-white">
              F7 Manager
            </h1>
            <p className="text-[10px] text-[#DCEFE1]/80">Elite League Admin</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="rounded-xl bg-[#073612] p-2 text-white transition-colors hover:bg-[#0e5f22] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="animate-fadeIn fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between bg-[#0A4D1A] p-5 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#0e5f22] pb-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2FE85F] text-lg font-black text-[#0A4D1A] shadow-sm">
                F7
              </div>
              <div>
                <h2 className="font-display text-lg leading-tight font-extrabold text-white">
                  F7 Manager
                </h2>
                <p className="text-[11px] text-[#DCEFE1]/80">Elite League Admin</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg p-1.5 text-[#DCEFE1]/70 hover:bg-[#073612] hover:text-white"
            >
              <X className="h-5 w-5" />
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
                  className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#2FE85F] font-extrabold text-[#111827] shadow-md'
                      : 'text-[#DCEFE1]/85 hover:bg-[#073612] hover:text-white'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isActive ? 'text-[#111827]' : 'text-[#DCEFE1]/70'}`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 border-t border-[#0e5f22] pt-4">
          <div className="px-1">
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#2FE85F] bg-slate-200">
                <img
                  src="../../assets/img/admin.jpg"
                  alt="Admin"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Administrador</p>
                <button
                  onClick={onResetData}
                  className="flex items-center gap-1 text-[11px] text-[#DCEFE1]/70 transition-colors hover:text-[#2FE85F]"
                >
                  Logout / Reset
                </button>
              </div>
            </div>
            <button
              onClick={onResetData}
              title="Reset Demo Data"
              className="rounded-lg p-1 text-[#DCEFE1]/70 hover:bg-[#073612] hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Vertical Left Sidebar (>= lg) */}
      <div className="relative z-30 hidden shrink-0 lg:flex">
        <aside
          className={`flex min-h-screen shrink-0 flex-col justify-between overflow-hidden border-r border-[#0e5f22]/40 bg-[#0A4D1A] text-white transition-all duration-300 ease-in-out ${
            isCollapsed ? 'w-20 p-3' : 'w-64 p-2'
          }`}
        >
          <div className="space-y-8">
            {/* Brand Header */}
            <div className={`flex pt-2 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#2FE85F] text-lg font-black text-[#0A4D1A] shadow-sm">
                  F7
                </div>
                {!isCollapsed && (
                  <div>
                    <h1 className="font-display text-lg leading-tight font-extrabold text-white">
                      F7 Manager
                    </h1>
                    <p className="text-[11px] text-[#DCEFE1]/80">Elite League Admin</p>
                  </div>
                )}
              </div>
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
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex w-full items-center rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#2FE85F] focus-visible:outline-none ${
                      isCollapsed ? 'justify-center px-0 py-3' : 'space-x-3 px-4 py-3'
                    } ${
                      isActive
                        ? 'bg-[#2FE85F] font-extrabold text-[#111827] shadow-md'
                        : 'text-[#DCEFE1]/85 hover:bg-[#073612] hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${isActive ? 'text-[#111827]' : 'text-[#DCEFE1]/70'}`}
                    />
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
              className={`flex border-t border-[#0e5f22] pt-4 ${
                isCollapsed
                  ? 'flex-col items-center gap-2 px-0'
                  : 'items-center justify-between px-2'
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-[#0b7628] bg-slate-200">
                  <img src={adminImage} alt="Admin" className="h-full w-full object-cover" />
                </div>
                {!isCollapsed && (
                  <div>
                    <p className="text-xs font-bold text-white">Administrador</p>
                    <button
                      onClick={onResetData}
                      className="flex items-center gap-1 text-[11px] text-[#DCEFE1]/70 transition-colors hover:text-[#2FE85F]"
                    >
                      Logout / Reset
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={onResetData}
                title="Reset Demo Data"
                className="rounded-lg p-1 text-[#DCEFE1]/70 hover:bg-[#073612] hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Edge tab to collapse / expand the sidebar */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
          aria-label={isCollapsed ? 'Expandir menú lateral' : 'Contraer menú lateral'}
          aria-expanded={!isCollapsed}
          className="absolute top-1/2 right-0 flex h-14 w-4 translate-x-full -translate-y-1/2 cursor-pointer items-center justify-center bg-[#0A4D1A] pr-0.5 text-[#DCEFE1] transition-colors [clip-path:polygon(0_0,100%_20%,100%_78%,0_100%)] hover:bg-[#0e5f22] hover:text-white focus:outline-none focus-visible:bg-[#0e5f22]"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </>
  );
};
