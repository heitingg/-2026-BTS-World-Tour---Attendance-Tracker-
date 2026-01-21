
import React from 'react';
import { Filter, Globe, Plane, Ticket } from 'lucide-react';
import { TourFilters } from '../types';

interface FilterBarProps {
  filters: TourFilters;
  setFilters: React.Dispatch<React.SetStateAction<TourFilters>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const regions = ['Asia', 'Europe', 'North America', 'Oceania'];

  const toggleRegion = (region: string) => {
    setFilters(prev => ({
      ...prev,
      regions: prev.regions.includes(region) 
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl flex-wrap overflow-x-auto">
        <Filter size={18} className="text-white/40 shrink-0" />
        {regions.map(r => (
          <button
            key={r}
            onClick={() => toggleRegion(r)}
            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filters.regions.includes(r) ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl flex-wrap">
        <button
          onClick={() => setFilters(prev => ({ ...prev, appliedPresaleOnly: !prev.appliedPresaleOnly }))}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filters.appliedPresaleOnly ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}
        >
          <Ticket size={14} /> Presale Done
        </button>
        <button
          onClick={() => setFilters(prev => ({ ...prev, missingAirTicketOnly: !prev.missingAirTicketOnly }))}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filters.missingAirTicketOnly ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}
        >
          <Plane size={14} /> Flights Missing
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
