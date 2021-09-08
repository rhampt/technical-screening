import React from 'react'
import WeatherDetails from '../WeatherDetails.module'
import renderer from 'react-test-renderer'
import { IWeatherDetails, TempUnit } from '../../lib/types'

describe('WeatherDetails', () => {
  const weather: IWeatherDetails = {
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
  it('should match the snapshot', () => {
    const tree = renderer.create(<WeatherDetails weather={weather} units={TempUnit.CELSIUS} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
