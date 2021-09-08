import { Component } from 'react'
import styles from '../styles/Home.module.scss'
import { TextField, FormControl, FormLabel, Button } from '@material-ui/core'
import { Autocomplete, ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import states from '../lib/states'
import { TempUnit, IUSState, IWeatherDetails } from '../lib/types'
import weather from '../services/weather'
import WeatherDetails from '../components/WeatherDetails.module'

const DEFAULT_TEMP_UNIT: TempUnit = TempUnit.FAHRENHEIT

interface IProps {}
interface IState {
  tempUnit: TempUnit
  requestedTempUnit: TempUnit
  usState: IUSState
  city: string
  zip: string
  error: string
  weather: IWeatherDetails
}

export default class Home extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      tempUnit: DEFAULT_TEMP_UNIT,
      requestedTempUnit: null,
      usState: null,
      city: '',
      zip: '',
      error: '',
      weather: null,
    }
  }

  private toggleTempUnit = (event, value) => {
    if (value) {
      this.setState({ tempUnit: value })
    } else {
      this.submit()
    }
  }

  private onUsStateChange = (event, option: IUSState) => {
    //console.log(`onUsStateChange: ${option ? option.name : 'null'}`)
    this.setState({ usState: option })
  }

  private onCityChange = (event) => {
    const city = event.target.value
    //console.log(`onCityChange: ${city}`)
    this.setState({ city })
  }

  private onZipChange = (event) => {
    const zip = event.target.value
    //console.log(`onZipChange: ${zip}`)
    this.setState({ zip })
  }

  private clearErrorMsg = () => this.setState({ error: '' })

  private searchByZip = (zip: string, unit: TempUnit) =>
    weather
      .byZipCode(zip, unit)
      .then((res: IWeatherDetails) => {
        this.handleSuccessResponse(res, unit)
        //console.log(`executed searchByZip: ${this.state.weather.name}`)
      })
      .catch((error) => this.setState({ error: error.response.data.message }))

  private searchByCityState = (city: string, state: IUSState, unit: TempUnit) =>
    weather
      .byCityState(city, state, unit)
      .then((res: IWeatherDetails) => {
        this.handleSuccessResponse(res, unit)
        //console.log(`executed searchByCityState: ${this.state.weather.name}`)
      })
      .catch((error) => this.setState({ error: error.response.data.message }))

  private handleSuccessResponse = (weather: IWeatherDetails, requestedTempUnit: TempUnit) => {
    this.clearErrorMsg()
    this.setState({ weather, requestedTempUnit })
  }

  private submit = () => {
    const { tempUnit, usState, city, zip } = this.state
    if (zip) {
      this.setState({ usState: null, city: '' })
      this.searchByZip(zip, tempUnit)
    } else if (city) {
      this.searchByCityState(city, usState, tempUnit)
    }
  }

  private renderStateInput = (params) => (
    <TextField {...params} onKeyPress={this.handleKeyPress} label='State' variant='outlined' />
  )

  private renderStateField = () => {
    return (
      <FormControl className={`state ${styles.formField}`}>
        <Autocomplete
          id='combo-box-demo'
          options={states}
          getOptionLabel={(option) => option.name}
          style={{ width: 300 }}
          renderInput={this.renderStateInput}
          value={this.state.usState}
          onChange={this.onUsStateChange}
        />
      </FormControl>
    )
  }

  private handleKeyPress = (e) => (e.key === 'Enter' ? this.submit() : '')

  private renderCityField = () => {
    return (
      <FormControl className={styles.formField}>
        <TextField
          id='outlined-basic'
          label='City'
          variant='outlined'
          value={this.state.city}
          onChange={this.onCityChange}
          onKeyPress={this.handleKeyPress}
        />
      </FormControl>
    )
  }

  private renderZipField = () => {
    return (
      <FormControl className={styles.formField}>
        <TextField
          id='outlined-basic'
          label='ZIP'
          variant='outlined'
          value={this.state.zip}
          onChange={this.onZipChange}
          onKeyPress={this.handleKeyPress}
        />
      </FormControl>
    )
  }

  private renderTempUnitField = () => {
    return (
      <FormControl className={`${styles.tempUnit} ${styles.formField}`}>
        <FormLabel>Unit:</FormLabel>
        <ToggleButtonGroup
          value={this.state.tempUnit}
          exclusive={true}
          onChange={this.toggleTempUnit}
          aria-label='temperature unit'
          size={'small'}
        >
          <ToggleButton value={TempUnit.CELSIUS} aria-label='celsius'>
            <span>&deg;C</span>
          </ToggleButton>
          <ToggleButton value={TempUnit.FAHRENHEIT} aria-label='fahrenheit'>
            <span>&deg;F</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
    )
  }

  private renderSubmitButton = () => {
    return (
      <Button variant='contained' color='primary' className={styles.submit} size={'large'} onClick={this.submit}>
        Show
      </Button>
    )
  }

  private renderError = () => {
    if (this.state.error) {
      return <span className={styles.errorMessage}>{this.state.error}</span>
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Weather</h1>
          <div className={styles.content}>
            <div className={styles.formContainer}>
              {this.renderStateField()}
              {this.renderCityField()}
              {this.renderZipField()}
              {this.renderTempUnitField()}
              {this.renderError()}
              {this.renderSubmitButton()}
            </div>
            <WeatherDetails weather={this.state.weather} units={this.state.requestedTempUnit} />
          </div>
        </main>
        <footer className={styles.footer}>Powered by Voomove</footer>
      </div>
    )
  }
}
