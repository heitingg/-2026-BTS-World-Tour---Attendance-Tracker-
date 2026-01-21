
import React, { useState } from 'react';
import { X, ExternalLink, Plane, Train, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { CityData, BuyMethod } from '../types';
import { getTransportOptions } from '../services/transportService';

interface CityDetailDrawerProps {
  city: CityData | null;
  onClose: () => void;
}

const getPersonColorClasses = (name: string) => {
  switch (name.toUpperCase()) {
    case 'IVY': return { 
      bg: 'bg-purple-600', 
      border: 'border-purple-500/30', 
      ring: 'ring-purple-500/20', 
      text: 'text-purple-300',
      gradient: 'from-purple-600 to-purple-800'
    };
    case 'KHT': return { 
      bg: 'bg-sky-500', 
      border: 'border-sky-500/30', 
      ring: 'ring-sky-500/20', 
      text: 'text-sky-300',
      gradient: 'from-sky-500 to-sky-700'
    };
    case 'YKT': return { 
      bg: 'bg-pink-500', 
      border: 'border-pink-500/30', 
      ring: 'ring-pink-500/20', 
      text: 'text-pink-300',
      gradient: 'from-pink-500 to-pink-700'
    };
    default: return { 
      bg: 'bg-gray-600', 
      border: 'border-gray-500/30', 
      ring: 'ring-gray-500/20', 
      text: 'text-gray-300',
      gradient: 'from-gray-600 to-gray-800'
    };
  }
};

const CityDetailDrawer: React.FC<CityDetailDrawerProps> = ({ city, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'attendees'>('info');
  
  if (!city) return null;

  const transport = getTransportOptions(city.id);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity" 
        onClick={onClose} 
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050816] z-[101] border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-purple-900/20 to-transparent">
          <div>
            <h2 className="text-3xl font-bold font-title">{city.city}</h2>
            <p className="text-white/40 uppercase tracking-widest text-xs">{city.country} • {city.region}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'info' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-white/40 hover:text-white'}`}
          >
            Guide
          </button>
          <button 
            onClick={() => setActiveTab('attendees')}
            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'attendees' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-white/40 hover:text-white'}`}
          >
            Squad
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {activeTab === 'info' ? (
            <>
              {/* Ticketing Section */}
              <section>
                <h4 className="text-lg font-title mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-purple-400" />
                  Ticketing Info
                </h4>
                <div className="glass p-4 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/60">Presale Status</span>
                    <span className="text-sm font-bold text-purple-400">{city.presaleStatus}</span>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg text-sm">
                    <p className="font-bold text-purple-300 mb-1">Agent Action Required</p>
                    <p className="text-white/60 text-xs">Recommended: Contact MILIaAe (NOL Global) for Daishua services if not applying personally.</p>
                  </div>
                  <a 
                    href="https://world.nol.com/en/auth-web/login" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-bold transition-all"
                  >
                    Login to NOL World <ExternalLink size={14} />
                  </a>
                </div>
              </section>

              {/* Transport Section */}
              <section>
                <h4 className="text-lg font-title mb-4 flex items-center gap-2">
                  <Plane size={18} className="text-blue-400" />
                  Travel Logistics
                </h4>
                <div className="space-y-4">
                  {transport.map((opt, i) => (
                    <div key={i} className="glass p-4 rounded-xl flex items-start gap-4">
                      <div className="p-2 bg-white/5 rounded-lg">
                        {opt.mode === 'flight' ? <Plane size={20} className="text-blue-400" /> : <Train size={20} className="text-blue-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{opt.description}</p>
                        {opt.duration && <p className="text-xs text-white/40 mt-1">Est. Duration: {opt.duration}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Accommodation */}
              <section>
                <h4 className="text-lg font-title mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-green-400" />
                  Accommodation
                </h4>
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${city.hasAccommodationBooked ? 'bg-green-500/10 border-green-500/20 text-green-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                  {city.hasAccommodationBooked ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {city.hasAccommodationBooked ? 'Booking Confirmed' : 'Action Needed: Not Booked'}
                  </span>
                </div>
              </section>
            </>
          ) : (
            <div className="space-y-4">
              {city.attendees.map((person, i) => {
                const colors = getPersonColorClasses(person.name);
                return (
                  <div 
                    key={i} 
                    className={`glass p-5 rounded-2xl border transition-all ${person.wantToGo ? `${colors.border} ring-1 ${colors.ring}` : 'opacity-40 grayscale'}`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center font-bold text-white shadow-lg`}>
                          {person.name[0]}
                        </div>
                        <div>
                          <p className={`font-bold ${person.wantToGo ? 'text-white' : 'text-white/40'}`}>{person.name}</p>
                          <p className="text-xs text-white/40 uppercase tracking-tighter">
                            {person.wantToGo ? 'Attending' : 'Not Attending'}
                          </p>
                        </div>
                      </div>
                      {person.wantToGo && person.appliedPresale && (
                        <CheckCircle2 size={20} className="text-green-400" />
                      )}
                    </div>
                    
                    {person.wantToGo && (
                      <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-widest text-white/60">
                        <div className={`p-2 bg-white/5 rounded border border-white/10 text-center ${person.buyMethod === BuyMethod.Daishua ? colors.text : ''}`}>
                          Method: {person.buyMethod}
                        </div>
                        <div className={`p-2 bg-white/5 rounded border border-white/10 text-center ${person.gotAirTicket ? 'text-green-400' : ''}`}>
                          Air: {person.gotAirTicket ? 'Ready' : 'Pending'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-[#070b1d]">
          <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-purple-100 transition-colors">
            Update My Status
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default CityDetailDrawer;
