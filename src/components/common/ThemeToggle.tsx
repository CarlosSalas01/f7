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
      className={`group flex w-full cursor-pointer items-center rounded-xl text-slate-200 transition-all duration-200 hover:bg-[#073612] focus:outline-none ${
        collapsed ? 'justify-center px-0 py-2.5' : 'justify-between px-3 py-2.5'
      }`}
      title={isDark ? 'Cambiar a Modo claro' : 'Cambiar a Modo oscuro'}
      aria-label="Toggle dark mode"
    >
      <div className={`flex items-center ${collapsed ? '' : 'space-x-2.5'}`}>
        {/* <<div className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-[#2FE85F]/20 text-[#2FE85F]'}`}>> */}
        <div
          className={`rounded-lg p-1.5 transition-colors ${isDark ? 'bg-amber-500/20 text-amber-300' : 'text-[#2FE85F]'}`}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-amber-300" />
          ) : (
            <Sun className="h-4 w-4 text-amber-400" />
          )}
        </div>
        {!collapsed && (
          <span className="text-xs font-bold text-slate-200 transition-colors group-hover:text-white">
            {isDark ? 'Modo oscuro' : 'Modo claro'}
          </span>
        )}
      </div>

      {/* Pill Switch */}
      {!collapsed && (
        <div
          className={`relative h-5 w-10 rounded-full transition-colors duration-300 ${isDark ? 'bg-[#2FE85F]' : 'bg-[#111827]'}`}
        >
          <div
            className={`absolute top-0.5 left-0.5 flex h-4 w-4 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
              isDark ? 'translate-x-5 bg-white' : 'translate-x-0'
            }`}
          >
            {isDark ? (
              <Moon className="h-2.5 w-2.5 text-[#0A4D1A]" />
            ) : (
              <Sun className="h-2.5 w-2.5 text-amber-500" />
            )}
          </div>
        </div>
      )}
    </button>
  );
};
