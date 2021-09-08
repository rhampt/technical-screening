import { IUSState, TempUnit, IWeatherDetails } from '../lib/types'
import axios from 'axios'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e1721e32fc11d80f6c5823debdf7da00'
const MISSING_PARAMS_MSG = 'Missing parameters'

let fetcher: (params?: any) => Promise<any>
const setFetcher = (f: (params?: any) => Promise<any>) => {
  fetcher = f
}

// weather API fetcher
const apiFetcher = (params) => axios.get(API_URL, { params })
const resetFetcher = () => setFetcher(apiFetcher)
resetFetcher()

let mapper: (data: any) => IWeatherDetails
const setMapper = (m: (data: any) => IWeatherDetails) => {
  mapper = m
}

// weather API mapper
const apiMapper = (data: any): IWeatherDetails => {
  const formatFloor = (val: number): number => Math.floor(val)
  const formatTemp = (temp: number): number => formatFloor(temp)
  const formatWind = (wind: number): number => formatFloor(wind)
  return {
    id: data.id,
    name: data.name,
    description: data.weather[0].main,
    icon: data.weather[0].icon,
    temp: formatTemp(data.main.temp),
    temp_min: formatTemp(data.main.temp_min),
    temp_max: formatTemp(data.main.temp_max),
    temp_feels: formatTemp(data.main.feels_like),
    wind: formatWind(data.wind.speed),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
  }
}
const resetMapper = () => setMapper(apiMapper)
resetMapper()

const get = (params) => fetcher(params).then((res) => mapper(res.data))

const missingParams = (): Promise<any> => Promise.reject({ response: { data: { message: MISSING_PARAMS_MSG } } })

// by ZIP Code
const constructZipCodeFetchParams = (zip: string, units: TempUnit): any => {
  return { appid: API_KEY, zip, units }
}
const byZipCode = (zip: string, units: TempUnit): any => {
  if (!zip) return missingParams()
  const params = constructZipCodeFetchParams(zip, units)
  return get(params)
}

// by City
const constructCityFetchParams = (city: string, units: TempUnit): any => {
  return { appid: API_KEY, q: city, units }
}
const byCity = (city: string, units: TempUnit) => {
  if (!city) return missingParams()
  const params = constructCityFetchParams(city, units)
  return get(params)
}

// by City and State
const constructCityStateFetchParams = (city: string, state: IUSState, units: TempUnit): any => {
  const getParamStr = () => {
    let arr = [city]
    if (state) {
      arr = arr.concat([state.abbr.toLowerCase(), 'us'])
    }
    return arr.join()
  }
  return { appid: API_KEY, q: getParamStr(), units }
}
const byCityState = (city: string, state: IUSState, units: TempUnit) => {
  if (!city) return missingParams()
  const params = constructCityStateFetchParams(city, state, units)
  return get(params)
}

const weather = {
  byCity,
  byZipCode,
  byCityState,
}

export const weatherTest = {
  mapper,
  setMapper,
  resetMapper,
  setFetcher,
  resetFetcher,
  get,
  MISSING_PARAMS_MSG,
  byCity,
  byZipCode,
  byCityState,
  constructZipCodeFetchParams,
  constructCityFetchParams,
  constructCityStateFetchParams,
}

export default weather
