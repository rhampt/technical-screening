import { Component, ReactElement } from 'react'
import styles from './WeatherDetails.module.scss'
import { IWeatherDetails, TempUnit } from '../lib/types'
import LocationOnIcon from '@material-ui/icons/LocationOn'

interface IProps {
  weather: IWeatherDetails
  units: TempUnit
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IState {}

export default class WeatherDetails extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  private renderTopSection = (): ReactElement => {
    const { weather } = this.props
    return (
      <div className={styles.topSection}>
        <div className={styles.location}>
          <LocationOnIcon className={styles.locationIcon} />
          <span className={styles.locationName}>{weather.name}</span>
        </div>
      </div>
    )
  }

  private getTempUnitSymbol = (): string => (this.props.units === TempUnit.CELSIUS ? 'C' : 'F')

  private renderTemp = (temp: number): ReactElement => (
    <span>
      {temp}&deg;{this.getTempUnitSymbol()}
    </span>
  )

  private renderIconSection = (): ReactElement => {
    const { weather } = this.props
    const getIconUrl = (): string => `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
    const renderMinMaxTemp = (): ReactElement => (
      <span>
        {weather.temp_min}&deg;&#47;{weather.temp_max}&deg;
      </span>
    )
    const renderFeelsLike = (): ReactElement => <div>Feels like: {this.renderTemp(weather.temp_feels)}</div>
    return (
      <div className={styles.iconSection}>
        <img className={styles.icon} src={getIconUrl()}></img>
        <div className={styles.temp}>{this.renderTemp(weather.temp)}</div>
        <div className={styles.mainInfo}>
          <div>{weather.description}</div>
          <div>{renderMinMaxTemp()}</div>
          <div>{renderFeelsLike()}</div>
        </div>
      </div>
    )
  }

  private renderDetailsSection = (): ReactElement => {
    const { weather } = this.props
    const renderDetail = (label: string, value: number | ReactElement): ReactElement => {
      return (
        <div className={styles.detail}>
          <div className={styles.detailLabel}>{label}</div>
          <div className={styles.detaiValue}>{value}</div>
        </div>
      )
    }
    return (
      <div className={styles.detailsSection}>
        <div className={styles.innerContainer}>
          {renderDetail('Humidity:', weather.humidity)}
          {renderDetail('Pressure:', weather.pressure)}
          {renderDetail('Wind:', weather.wind)}
          {renderDetail('Temp Min:', this.renderTemp(weather.temp_min))}
          {renderDetail('Temp Max:', this.renderTemp(weather.temp_max))}
        </div>
      </div>
    )
  }

  render(): string | ReactElement {
    if (!this.props.weather) return ''
    return (
      <div className={styles.container}>
        {this.renderTopSection()}
        {this.renderIconSection()}
        {this.renderDetailsSection()}
      </div>
    )
  }
}
