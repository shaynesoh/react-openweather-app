
import { CurrentWeather, ForecastItem, ForecastWeather } from './weatherApi.types';

export interface WeatherData extends CurrentWeather, ForecastWeather { }

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchWeatherData = async (
  dataType: string,
  searchParams: Record<string, string | number>
): Promise<any> => {
  if (!API_KEY) {
    throw new Error("API_KEY is not defined");
  }

  const url = new URL(`${BASE_URL}/${dataType}`);
  const params: Record<string, string> = {
    ...searchParams,
    appid: API_KEY,
    units: "metric",
  };

  url.search = new URLSearchParams(params).toString();

  const res = await fetch(url.toString());
  return res.json();
};

const currentWeatherFormat = (data: any): CurrentWeather => {
  const {
    coord: { lat, lon },
    main: { temp, humidity },
    sys: { country },
    wind: { speed, deg: direction },
    dt,
    weather,
    visibility,
    name: city,
  } = data;

  const { icon, description } = weather[0];

  return {
    lat,
    lon,
    dt,
    country,
    city,
    description,
    temp,
    humidity,
    icon,
    speed,
    visibility,
    direction
  };
};

function forecastWeatherFormat(data: any): ForecastWeather {
  const days: ForecastItem[] = [];

  const forecastMap: Record<string, ForecastItem["hours"]> = {};

  for (let i = 0; i < data.list.length; i++) {
    const forecastDate = data.list[i].dt_txt.slice(0, 10);
    const hour = new Date(data.list[i].dt_txt).getHours();
    const temp_min = data.list[i].main.temp_min;
    const temp_max = data.list[i].main.temp_max;
    const { icon, description } = data.list[i].weather[0];

    if (!forecastMap[forecastDate]) {
      forecastMap[forecastDate] = [];
    }

    forecastMap[forecastDate].push({
      hour,
      temp_min,
      temp_max,
      icon,
      description,
    });
  }

  for (const [date, hours] of Object.entries(forecastMap)) {
    days.push({ date: new Date(date).toLocaleDateString(), hours });
  }

  const limitedDays = days.slice(0, 5);

  return { days: limitedDays };
}

const fetchFormattedData = async (
  searchParams: Record<string, string | number>
): Promise<WeatherData> => {
  const fetchCurrentWeather = await fetchWeatherData(
    "weather",
    searchParams
  ).then(currentWeatherFormat);

  const forecastSearchParams = {
    lat: fetchCurrentWeather.lat,
    lon: fetchCurrentWeather.lon,
    exclude: "minutely",
    units: "metric",
  };

  const fetchForecastWeather = await fetchWeatherData(
    "forecast",
    forecastSearchParams
  ).then(forecastWeatherFormat);

  return { ...fetchCurrentWeather, ...fetchForecastWeather };
};

export default fetchFormattedData;
