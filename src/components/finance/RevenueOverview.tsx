import React from 'react';
import { storage } from '../../services/storage';
import { formatCurrency } from '../../utils/formatters';
import { DollarSign, TrendingUp, CreditCard, PieChart, ArrowUpRight } from 'lucide-react';

export const RevenueOverview: React.FC = () => {
  const finances = storage.getFinances();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="white-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] dark:text-white font-display flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-[#0A4D1A] dark:text-[#2FE85F]" /> Finanzas & Arqueo de Caja
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Métricas financieras en tiempo real, ocupación de canchas y cobros por anticipo
          </p>
        </div>
      </div>

      {/* Top Key Performance Metric Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        
        <div className="white-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Ingresos Totales</span>
            <div className="p-2 rounded-xl bg-[#DCEFE1] dark:bg-[#0A4D1A] text-[#0A4D1A] dark:text-[#2FE85F]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#111827] dark:text-white font-display">
            {formatCurrency(finances.totalRevenue)}
          </p>
          <span className="text-[11px] text-[#0A4D1A] dark:text-[#2FE85F] font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +14.2% vs semana anterior
          </span>
        </div>

        <div className="white-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Por Cobrar (Pendientes)</span>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-600 font-display">
            {formatCurrency(finances.pendingCollect)}
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Restante de anticipos en recepción</span>
        </div>

        <div className="white-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Ocupación de Canchas</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-blue-700 font-display">
            {finances.occupancyRate}%
          </p>
          <span className="text-[11px] text-blue-700 font-bold">Excelente nivel de reserva</span>
        </div>

        <div className="white-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Partidos / Rentas</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-700 font-display">
            {finances.totalBookings} Renta(s)
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Registradas este mes</span>
        </div>

      </div>

      {/* Revenue Visual Bar Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Bar Chart */}
        <div className="lg:col-span-2 white-card p-6 space-y-4">
          <h3 className="text-lg font-extrabold text-[#111827] dark:text-white font-display flex items-center justify-between">
            <span>Gráfica de Ingresos Diarios por Renta</span>
            <span className="text-xs text-[#0A4D1A] dark:text-[#2FE85F] font-mono font-bold">Última Semana</span>
          </h3>

          {/* CSS Bar chart */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-4 border-b border-slate-200 dark:border-slate-800">
            {[
              { day: 'Lun', val: 3200, height: '40%' },
              { day: 'Mar', val: 4100, height: '55%' },
              { day: 'Mié', val: 5400, height: '70%' },
              { day: 'Jue', val: 4800, height: '62%' },
              { day: 'Vie', val: 7800, height: '95%' },
              { day: 'Sáb', val: 8900, height: '100%' },
              { day: 'Dom', val: 6500, height: '80%' },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-[#0A4D1A] dark:text-[#2FE85F] opacity-0 group-hover:opacity-100 transition-opacity">
                  ${item.val}
                </span>
                <div
                  className="w-full bg-gradient-to-t from-[#0A4D1A] to-[#2FE85F] rounded-t-lg transition-all group-hover:brightness-110 shadow-sm"
                  style={{ height: item.height }}
                />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods breakdown */}
        <div className="white-card p-6 space-y-4">
          <h3 className="text-lg font-extrabold text-[#111827] dark:text-white font-display">Distribución de Pagos</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A4D1A]" /> Transferencia SPEI
              </span>
              <span className="font-mono font-bold text-[#0A4D1A] dark:text-[#2FE85F]">62%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Efectivo Recepción
              </span>
              <span className="font-mono font-bold text-amber-700">28%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Tarjeta de Débito/Crédito
              </span>
              <span className="font-mono font-bold text-blue-700">10%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Transactions Table */}
      <div className="white-card p-6">
        <h3 className="text-lg font-extrabold text-[#111827] dark:text-white font-display mb-4">Últimas Transacciones Registradas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">ID / Fecha</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Cancha</th>
                <th className="py-3 px-4">Método</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {finances.recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{tx.id}</div>
                    <div className="text-[10px] text-slate-400">{tx.date}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">{tx.customer}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{tx.pitchName}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#0A4D1A] dark:text-[#2FE85F]">{tx.method}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[10px] font-bold text-slate-700 dark:text-slate-300">
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-sm text-[#0A4D1A] dark:text-[#2FE85F]">
                    +{formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
