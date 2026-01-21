
import { TransportOption } from '../types';

export const getTransportOptions = (cityId: string): TransportOption[] => {
  switch (cityId) {
    case 'goyang-d1':
      return [
        { mode: 'flight', description: 'Hong Kong (HKG) → Seoul Incheon (ICN)', duration: '3h 45m' },
        { mode: 'metro', description: 'AREX Express Train → Seoul Station → Metro Line 3 to Daehwa', duration: '1h 20m' },
      ];
    case 'tokyo-d1':
      return [
        { mode: 'flight', description: 'Hong Kong (HKG) → Narita (NRT) or Haneda (HND)', duration: '4h 15m' },
        { mode: 'train', description: 'Narita Express / Keisei Skyliner to Shinjuku → Keio Line to Tobitakyu', duration: '1h 10m' },
      ];
    case 'kaohsiung-d1':
      return [
        { mode: 'flight', description: 'Hong Kong (HKG) → Kaohsiung (KHH)', duration: '1h 30m' },
        { mode: 'metro', description: 'KMRT Red Line to World Games Station (R17)', duration: '30m' },
      ];
    case 'hongkong-d1':
      return [
        { mode: 'metro', description: 'Tuen Ma Line to Kai Tak Station / Sung Wong Toi Station', duration: 'N/A' },
        { mode: 'walk', description: 'Walk from Kai Tak Station Exit D', duration: '10m' },
      ];
    default:
      return [
        { mode: 'flight', description: 'International Direct Flight from HKG', duration: 'Varies' },
        { mode: 'metro', description: 'Local public transport to Venue', duration: 'Varies' },
      ];
  }
};
