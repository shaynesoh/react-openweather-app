import styles from "./CurrentWeather.module.scss";
import { useAppContext } from "../../contexts/AppContext";

const CurrentWeather = () => {
  const { weather } = useAppContext();

  if (!weather) {
    return null;
  }

  const renderWeatherIcon = (icon: string) => {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return (
      <img
        src={iconUrl}
        width={150}
        height={150}
        alt="Weather icon"
        className={styles["icon"]}
      />
    );
  };

  const renderWindArrow = (degrees: number): string => {
    if (degrees >= 337.5 || degrees < 22.5) return "↑";
    if (degrees >= 22.5 && degrees < 67.5) return "↗";
    if (degrees >= 67.5 && degrees < 112.5) return "→";
    if (degrees >= 112.5 && degrees < 157.5) return "↘";
    if (degrees >= 157.5 && degrees < 202.5) return "↓";
    if (degrees >= 202.5 && degrees < 247.5) return "↙";
    if (degrees >= 247.5 && degrees < 292.5) return "←";
    if (degrees >= 292.5 && degrees < 337.5) return "↖";
    return "";
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(
      date
    );
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const formatDescription = (description: string): string => {
    return description
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className={styles["current"]}>
      <div className={styles["current__date"]}>
        <p>{formatDate(weather.dt)}</p>
      </div>
      <div className={styles["current__temperature"]}>
        {renderWeatherIcon(weather.icon)}
        <div>
          <p className={styles["temperature"]}>
            {weather.temp.toFixed(0)}
            <span className={styles["temperature-unit"]}>°C</span>
          </p>
          <p>{formatDescription(weather.description)}</p>
        </div>
      </div>
      <div className={styles["current__details"]}>
        <div className={styles["current__humidity"]}>
          <p className={styles["subtitle"]}>Humidity</p>
          <p className={styles["value"]}>
            {weather.humidity.toFixed(0)}&nbsp;<span>%</span>
          </p>
        </div>
        <div className={styles["current__winds"]}>
          <p className={styles["subtitle"]}>Winds</p>
          <div>
            <p className={styles["wind-direction"]}>
              {renderWindArrow(weather.direction)}
            </p>
            <p className={styles["value"]}>
              {weather.speed}&nbsp;<span>m/s</span>
            </p>
          </div>
        </div>
        <div className={styles["current__visibility"]}>
          <p className={styles["subtitle"]}>Visibility</p>
          <p className={styles["value"]}>
            {Math.round(weather.visibility / 1000)}&nbsp;<span>km</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
