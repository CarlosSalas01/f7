import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  collapsed?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ collapsed = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`w-full flex items-center rounded-xl bg-[#073612]/70 hover:bg-[#073612] text-slate-200 transition-all duration-200 border border-[#0e5f22] focus:outline-none focus:ring-2 focus:ring-[#2FE85F]/50 group cursor-pointer ${
        collapsed ? 'justify-center px-0 py-2.5' : 'justify-between px-3 py-2.5'
      }`}
      title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
      aria-label="Toggle dark mode"
    >
      <div className={`flex items-center ${collapsed ? '' : 'space-x-2.5'}`}>
        <div className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-[#2FE85F]/20 text-[#2FE85F]'}`}>
          {isDark ? <Moon className="w-4 h-4 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </div>
        {!collapsed && (
          <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
            {isDark ? 'Modo Oscuro' : 'Modo Claro'}
          </span>
        )}
      </div>

      {/* Pill Switch */}
      {!collapsed && (
        <div className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${isDark ? 'bg-[#2FE85F]' : 'bg-[#111827]'}`}>
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              isDark ? 'translate-x-5 bg-white' : 'translate-x-0'
            }`}
          >
            {isDark ? (
              <Moon className="w-2.5 h-2.5 text-[#0A4D1A]" />
            ) : (
              <Sun className="w-2.5 h-2.5 text-amber-500" />
            )}
          </div>
        </div>
      )}
    </button>
  );
};
