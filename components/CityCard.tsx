
import React from 'react';
import { Calendar, MapPin, Plane, Ticket, Users } from 'lucide-react';
import { CityData, PresaleStatus, AirTicketStatus } from '../types';

interface CityCardProps {
  city: CityData;
  onClick: (id: string) => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick }) => {
  const isTBC = city.status === 'TBC';
  
  const getPresaleColor = (status: PresaleStatus) => {
    switch (status) {
      case PresaleStatus.Applied: return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case PresaleStatus.Won: return 'bg-green-500/20 text-green-300 border-green-500/50';
      case PresaleStatus.NotApplied: return 'bg-red-500/20 text-red-300 border-red-500/50';
      default: return 'bg-white/10 text-white/50 border-white/20';
    }
  };

  const getFlightColor = (status: AirTicketStatus) => {
    return status === AirTicketStatus.Bought 
      ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
      : 'bg-white/10 text-white/50 border-white/20';
  };

  return (
    <div 
      onClick={() => onClick(city.id)}
      className="group relative overflow-hidden glass rounded-2xl p-6 cursor-pointer transition-all hover:bg-white/5 hover:-translate-y-1 active:scale-[0.98]"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <MapPin size={64} />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold font-title group-hover:text-purple-400 transition-colors">
              {city.city}
            </h3>
            <p className="text-sm text-white/40 uppercase tracking-wider">{city.country}</p>
          </div>
          {isTBC && (
            <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-[10px] font-bold rounded uppercase tracking-tighter border border-orange-500/30">
              TBC
            </span>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Calendar size={16} className="text-purple-400" />
            <span>{city.date || 'To Be Announced'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <MapPin size={16} className="text-purple-400" />
            <span className="truncate">{city.venueName}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded text-[10px] font-bold border flex items-center gap-1 ${getPresaleColor(city.presaleStatus)}`}>
            <Ticket size={10} />
            PRESALE: {city.presaleStatus}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold border flex items-center gap-1 ${getFlightColor(city.airTicketStatus)}`}>
            <Plane size={10} />
            FLIGHT: {city.airTicketStatus}
          </span>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
          <div className="flex -space-x-2">
            {city.attendees.filter(a => a.wantToGo).map((a, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full bg-purple-600 border-2 border-[#050816] flex items-center justify-center text-[10px] font-bold"
                title={a.name}
              >
                {a.name[0]}
              </div>
            ))}
            {city.attendees.filter(a => a.wantToGo).length === 0 && (
              <div className="text-[10px] text-white/30 italic">No attendees selected</div>
            )}
          </div>
          <button className="text-[10px] uppercase font-bold tracking-widest text-purple-400 group-hover:underline">
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
