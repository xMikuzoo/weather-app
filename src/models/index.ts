interface Weather {
  address: string;
  alerts: WeatherAlert[];
  currentConditions: WeatherCurrentConditions;
  days: WeatherDay[];
  description: string;
  latitude: number;
  longitude: number;
  queryCost: number;
  resolvedAddress: string;
  stations: WeatherStation[];
  timezone: string;
  tzoffset: number;
}

interface WeatherAlert {
  description: string;
  ends: string;
  endsEpoch: number;
  event: string;
  headline: string;
  id: string;
  language: string;
  link: string;
  onset: string;
  onsetEpoch: number;
}

interface WeatherCurrentConditions {
  cloudcover: number;
  conditions: string;
  datetime: string;
  datetimeEpoch: number;
  dew: number;
  feelslike: number;
  humidity: number;
  icon: string;
  moonphase: number;
  precip: number;
  precipprob: number;
  preciptype: string[] | null;
  pressure: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  source: string;
  stations: string[];
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  temp: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust: number;
  windspeed: number;
}

type WeatherStation = Record<string, StationDetails>;
interface StationDetails {
  contribution: number;
  distance: number;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  quality: number;
  useCount: number;
}

interface WeatherDay {
  cloudcover: number;
  conditions: string;
  datetime: string;
  datetimeEpoch: number;
  description: string;
  dew: number;
  feelslike: number;
  feelslikemax: number;
  feelslikemin: number;
  hours: WeatherHour[];
  humidity: number;
  icon: string;
  moonphase: number;
  precip: number;
  precipcover: number;
  precipprob: number;
  preciptype: string[] | null;
  pressure: number;
  severerisk: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  source: string;
  stations: string[];
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  temp: number;
  tempmax: number;
  tempmin: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust: number;
  windspeed: number;
}

interface WeatherHour {
  cloudcover: number;
  conditions: string;
  datetime: string;
  datetimeEpoch: number;
  dew: number;
  feelslike: number;
  humidity: number;
  icon: string;
  precip: number;
  precipprob: number;
  preciptype: string[] | null;
  pressure: number;
  severerisk: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  source: string;
  stations: string[];
  temp: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust: number;
  windspeed: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export type {
  Weather,
  WeatherAlert,
  WeatherCurrentConditions,
  WeatherDay,
  WeatherHour,
  WeatherStation,
  StationDetails,
  Coordinates,
};
