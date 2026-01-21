
import React from 'react';
import { LayoutGrid, Ticket, Plane, Clock, CheckCircle } from 'lucide-react';

interface KPIBarProps {
  kpis: {
    total: number;
    confirmed: number;
    presale: number;
    tickets: number;
    tbc: number;
  };
}

const KPIBar: React.FC<KPIBarProps> = ({ kpis }) => {
  const items = [
    { icon: <LayoutGrid className="w-5 h-5" />, label: 'Total Stops', value: kpis.total, sub: 'Global' },
    { icon: <CheckCircle className="w-5 h-5 text-green-400" />, label: 'Confirmed', value: kpis.confirmed, sub: 'Locked in' },
    { icon: <Ticket className="w-5 h-5 text-purple-400" />, label: 'Presale', value: kpis.presale, sub: 'Applied' },
    { icon: <Plane className="w-5 h-5 text-blue-400" />, label: 'Flights', value: kpis.tickets, sub: 'Purchased' },
    { icon: <Clock className="w-5 h-5 text-orange-400" />, label: 'TBC', value: kpis.tbc, sub: 'Pending' },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {items.map((item, idx) => (
        <div key={idx} className="flex-1 min-w-[150px] glass p-4 rounded-xl flex items-center gap-4 transition-transform hover:scale-105">
          <div className="p-3 bg-white/5 rounded-lg">
            {item.icon}
          </div>
          <div>
            <div className="text-2xl font-bold font-title">{item.value}</div>
            <div className="text-xs text-white/60 uppercase tracking-widest">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIBar;
