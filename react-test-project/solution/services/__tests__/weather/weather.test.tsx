import { weatherTest } from '../../weather'
import { IWeatherDetails, TempUnit } from '../../../lib/types'
import sampleData from './sample.response.json'
import states from '../../../lib/states'

describe('weather service', () => {
  it('should invoke fetcher', () => {
    const params = { value: 'test' }
    const mockFetcher = jest.fn((params) => Promise.resolve())
    const mockMapper = (data) => data as IWeatherDetails
    weatherTest.setFetcher(mockFetcher)
    weatherTest.setMapper(mockMapper)
    weatherTest.get(params)

    expect(mockFetcher.mock.calls.length).toBe(1)
    expect(mockFetcher.mock.calls[0][0]).toBe(params)
  })

  it('should invoke mapper', (done) => {
    const params = {}
    const response = { data: 'test' }
    const mockFetcher = (params) => Promise.resolve(response)
    const mockMapper = jest.fn((data) => data as IWeatherDetails)
    weatherTest.setFetcher(mockFetcher)
    weatherTest.setMapper(mockMapper)
    weatherTest.get(params).then(() => {
      expect(mockMapper.mock.calls.length).toBe(1)
      expect(mockMapper.mock.calls[0][0]).toBe(response.data)
      done()
    })
  })

  it('should properly map API fields', () => {
    const expected: IWeatherDetails = {
      id: 4930956,
      name: 'Boston',
      description: 'Rain',
      icon: '10d',
      temp: 48,
      temp_min: 45,
      temp_max: 51,
      temp_feels: 45,
      wind: 3,
      humidity: 93,
      pressure: 1018,
    }
    const mapped = weatherTest.mapper(sampleData)
    expect(mapped).toMatchObject(expected)
  })

  test('byZipCode() should reject missing zip param', (done) => {
    weatherTest.byZipCode('', TempUnit.CELSIUS).catch((err) => {
      expect(err.response.data.message).toBe(weatherTest.MISSING_PARAMS_MSG)
      done()
    })
  })

  test('byCity() should reject missing city param', (done) => {
    weatherTest.byCity('', TempUnit.CELSIUS).catch((err) => {
      expect(err.response.data.message).toBe(weatherTest.MISSING_PARAMS_MSG)
      done()
    })
  })

  test('byCityState() should reject missing city param', (done) => {
    weatherTest.byCityState('', states[0], TempUnit.CELSIUS).catch((err) => {
      expect(err.response.data.message).toBe(weatherTest.MISSING_PARAMS_MSG)
      done()
    })
  })

  test('byZipCode() should invoke fetcher with correct params', (done) => {
    const zip = '123456'
    const unit = TempUnit.CELSIUS
    const params = weatherTest.constructZipCodeFetchParams(zip, unit)

    const mockFetcher = jest.fn((params) => Promise.resolve({ data: '' }))
    const mockMapper = (data) => data as IWeatherDetails
    weatherTest.setFetcher(mockFetcher)
    weatherTest.setMapper(mockMapper)

    weatherTest.byZipCode(zip, unit).then((res) => {
      expect(mockFetcher.mock.calls.length).toBe(1)
      expect(mockFetcher.mock.calls[0][0]).toMatchObject(params)
      done()
    })
  })

  test('byCity() should invoke fetcher with correct params', (done) => {
    const city = 'Madrid'
    const unit = TempUnit.CELSIUS
    const params = weatherTest.constructCityFetchParams(city, unit)

    const mockFetcher = jest.fn((params) => Promise.resolve({ data: '' }))
    const mockMapper = (data) => data as IWeatherDetails
    weatherTest.setFetcher(mockFetcher)
    weatherTest.setMapper(mockMapper)

    weatherTest.byCity(city, unit).then((res) => {
      expect(mockFetcher.mock.calls.length).toBe(1)
      expect(mockFetcher.mock.calls[0][0]).toMatchObject(params)
      done()
    })
  })

  test('byCityState() should invoke fetcher with correct params', (done) => {
    const city = 'Raleigh'
    const state = states.filter((state) => state.abbr === 'NC')[0]
    const unit = TempUnit.FAHRENHEIT
    const params = weatherTest.constructCityStateFetchParams(city, state, unit)

    const mockFetcher = jest.fn((params) => Promise.resolve({ data: '' }))
    const mockMapper = (data) => data as IWeatherDetails
    weatherTest.setFetcher(mockFetcher)
    weatherTest.setMapper(mockMapper)

    weatherTest.byCityState(city, state, unit).then((res) => {
      expect(mockFetcher.mock.calls.length).toBe(1)
      expect(mockFetcher.mock.calls[0][0]).toMatchObject(params)
      done()
    })
  })

  afterEach(() => {
    weatherTest.resetFetcher()
    weatherTest.resetMapper()
  })
})
