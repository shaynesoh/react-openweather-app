import { useAppContext } from "../../contexts/AppContext";
import styles from "./ForecastWeather.module.scss";

const ForecastWeather = () => {
  const { weather } = useAppContext();

  if (!weather) {
    return null;
  }

  const renderWeatherIcon = (icon: string) => {
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return (
      <img
        src={iconUrl}
        alt="weather icon"
        width={50}
        height={50}
        className={styles["icon"]}
      />
    );
  };

  const formatTime = (hour: number) =>
    hour < 10 ? `0${hour}:00` : `${hour}:00`;

  const formatDateForComparison = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    return `${day}/${month}/${year}`;
  };

  const getCurrentDateString = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderData = () => {
    const todayDateString = getCurrentDateString();
    let currentDate: string | null = null;
    const rows: JSX.Element[] = [];

    weather.days.forEach((day) => {
      day.hours.forEach((hour, index) => {
        const itemDate = formatDateForComparison(day.date);

        if (itemDate !== currentDate) {
          rows.push(
            <div
              key={`date-${itemDate}-${index}`}
              className={styles["forecast__date"]}
            >
              {itemDate === todayDateString ? "Today" : itemDate}
            </div>
          );
          currentDate = itemDate;
        }

        rows.push(
          <div
            key={`forecast-${itemDate}-${index}`}
            className={styles["forecast__row"]}
          >
            <div>
              <p className={styles["forecast__time"]}>
                {hour.hour !== undefined ? formatTime(hour.hour) : ""}
              </p>
              <div>
                {renderWeatherIcon(hour.icon)}
                <p className={styles["forecast__temperature"]}>
                  {hour.temp_min.toFixed(1)}&nbsp;/&nbsp;
                  {hour.temp_max.toFixed(1)}°C
                </p>
              </div>
            </div>
            <p className={styles["forecast__description"]}>
              {hour.description}
            </p>
          </div>
        );
      });
    });

    return rows;
  };

  return <div className={styles["forecast"]}>{renderData()}</div>;
};

export default ForecastWeather;
