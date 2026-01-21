
import { useState, useMemo } from 'react';
import { TOUR_LOCATIONS } from '../constants/locations';
import { CityData, TourFilters, PresaleStatus, AirTicketStatus } from '../types';

export const useTourState = () => {
  const [locations] = useState<CityData[]>(TOUR_LOCATIONS);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [filters, setFilters] = useState<TourFilters>({
    appliedPresaleOnly: false,
    missingAirTicketOnly: false,
    regions: []
  });

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      if (filters.appliedPresaleOnly && loc.presaleStatus !== PresaleStatus.Applied) return false;
      if (filters.missingAirTicketOnly && loc.airTicketStatus === AirTicketStatus.Bought) return false;
      if (filters.regions.length > 0 && !filters.regions.includes(loc.region)) return false;
      return true;
    });
  }, [locations, filters]);

  const kpis = useMemo(() => {
    const confirmedCount = locations.filter(l => l.status === 'Confirmed').length;
    const presaleAppliedCount = locations.filter(l => l.presaleStatus === PresaleStatus.Applied).length;
    const ticketsBoughtCount = locations.filter(l => l.airTicketStatus === AirTicketStatus.Bought).length;
    const tbcCount = locations.filter(l => l.status === 'TBC').length;

    return {
      total: locations.length,
      confirmed: confirmedCount,
      presale: presaleAppliedCount,
      tickets: ticketsBoughtCount,
      tbc: tbcCount
    };
  }, [locations]);

  const selectedCity = useMemo(() => 
    locations.find(l => l.id === selectedCityId) || null, 
  [locations, selectedCityId]);

  return {
    locations,
    filteredLocations,
    selectedCity,
    setSelectedCityId,
    kpis,
    filters,
    setFilters
  };
};
