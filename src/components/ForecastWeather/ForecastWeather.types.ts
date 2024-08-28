export interface ForecastItem {
    date?: string;
    hour?: number;
    icon: string;
    description: string;
    temp_min: number;
    temp_max: number;
}

export interface ForecastWeatherProps {
    weather: ForecastItem[];
}
