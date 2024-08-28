export interface CurrentWeatherProps {
    weather: {
        dt: number;
        temp: number;
        humidity: number;
        speed: number;
        icon: string;
        visibility: number;
        description: string;
        direction: number
    };
}
