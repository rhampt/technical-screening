export enum TempUnit {
  CELSIUS = 'metric',
  FAHRENHEIT = 'imperial',
}

export interface IUSState {
  name: string
  abbr: string
}

export interface IWeatherDetails {
  id: number
  name: string
  description: string
  icon: string
  temp: number
  temp_min: number
  temp_max: number
  temp_feels: number
  wind: number
  humidity: number
  pressure: number
}
