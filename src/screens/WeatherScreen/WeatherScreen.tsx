import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import ForecastWeather from "../../components/ForecastWeather/ForecastWeather";
import styles from "./WeatherScreen.module.scss";

const WeatherScreen = () => {
  return (
    <div className={styles["weather"]}>
      <div className={styles["weather__container"]}>
        <CurrentWeather />
        <p className={styles["title"]}>5-day Forecast (3 hours)</p>
        <ForecastWeather />
      </div>
    </div>
  );
};

export default WeatherScreen;
