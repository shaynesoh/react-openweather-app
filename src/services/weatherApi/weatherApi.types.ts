
export interface CurrentWeather {
    lat: number;
    lon: number;
    country: string;
    city: string;
    dt: number;
    icon: string;
    temp: number;
    description: string;
    humidity: number;
    visibility: number;
    speed: number;
    direction: number
}

export interface ForecastItem {
    date: string;
    hours: {
        hour: number;
        temp_min: number;
        temp_max: number;
        icon: string;
        description: string;
    }[];
}


export interface ForecastWeather {
    days: ForecastItem[];
}