
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Map, List, Globe, Navigation, ChevronDown } from 'lucide-react';
import KPIBar from './components/KPIBar';
import CityCard from './components/CityCard';
import CityDetailDrawer from './components/CityDetailDrawer';
import FilterBar from './components/FilterBar';
import { useTourState } from './hooks/useTourState';

const Dashboard: React.FC = () => {
  const { 
    filteredLocations, 
    selectedCity, 
    setSelectedCityId, 
    kpis, 
    filters, 
    setFilters 
  } = useTourState();

  return (
    <div className="min-h-screen pb-24">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-pink-600/5 blur-[100px] rounded-full" />
      </div>

      {/* Hero Section */}
      <header className="px-6 pt-12 pb-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 text-[10px] font-bold rounded-full mb-4 uppercase tracking-[0.2em] border border-purple-500/30">
              World Tour Tracker 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-title leading-tight">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">MISSION</span> MAP
            </h1>
            <p className="text-white/40 text-lg mt-4 max-w-lg font-light">
              End-to-end logistics hub for the BTS 2026 Global Tour. Tracking tickets, flights, and squad readiness.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-4 glass rounded-xl flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
              <Navigation size={18} className="text-purple-400" />
              Route Map
            </button>
            <button className="px-6 py-4 bg-white text-black rounded-xl flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:bg-purple-100 transition-all">
              <Globe size={18} />
              Global Sync
            </button>
          </div>
        </div>

        <KPIBar kpis={kpis} />
      </header>

      {/* Main Grid */}
      <main className="px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-title flex items-center gap-3">
            <List size={24} className="text-purple-400" />
            Tour Stops
          </h2>
          <div className="text-xs text-white/40 uppercase tracking-widest font-bold">
            Showing {filteredLocations.length} results
          </div>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map(loc => (
            <CityCard key={loc.id} city={loc} onClick={setSelectedCityId} />
          ))}
          {filteredLocations.length === 0 && (
            <div className="col-span-full py-32 text-center glass rounded-3xl border-dashed border-2 border-white/10">
              <Globe size={48} className="mx-auto mb-4 text-white/20" />
              <p className="text-white/40 uppercase tracking-[0.2em] font-bold">No cities match these mission filters</p>
              <button 
                onClick={() => setFilters({ regions: [], appliedPresaleOnly: false, missingAirTicketOnly: false })}
                className="mt-6 text-purple-400 font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Detail Drawer */}
      <CityDetailDrawer 
        city={selectedCity} 
        onClose={() => setSelectedCityId(null)} 
      />

      {/* Sticky Bottom Nav (Mobile) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden flex gap-2 glass p-2 rounded-2xl shadow-2xl z-50">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
          <List size={14} /> Grid
        </button>
        <button className="px-6 py-3 hover:bg-white/10 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all">
          <Map size={14} /> Map
        </button>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
