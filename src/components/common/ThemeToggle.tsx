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
      className={`w-full flex items-center rounded-xl bg-[#064e3b]/60 hover:bg-[#064e3b] text-slate-200 transition-all duration-200 border border-[#527a14]/30 focus:outline-none focus:ring-2 focus:ring-[#a3e635]/50 group cursor-pointer ${
        collapsed ? 'justify-center px-0 py-2.5' : 'justify-between px-3 py-2.5'
      }`}
      title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
      aria-label="Toggle dark mode"
    >
      <div className={`flex items-center ${collapsed ? '' : 'space-x-2.5'}`}>
        <div className={`p-1.5 rounded-lg transition-colors ${isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-lime-400/20 text-[#a3e635]'}`}>
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
        <div className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${isDark ? 'bg-[#527a14]' : 'bg-slate-700'}`}>
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              isDark ? 'translate-x-5 bg-white' : 'translate-x-0'
            }`}
          >
            {isDark ? (
              <Moon className="w-2.5 h-2.5 text-[#032e22]" />
            ) : (
              <Sun className="w-2.5 h-2.5 text-amber-500" />
            )}
          </div>
        </div>
      )}
    </button>
  );
};
