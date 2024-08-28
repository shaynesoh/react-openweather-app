import { WeatherData } from "../services/weatherApi/weatherApi";

export interface AppContextProps {
    isLoading: boolean;
    weather: WeatherData | null;
    location: string;
    errorMessage: string;
    searchHistory: Set<string>;
    screen: 'search' | 'weather';
    setLocation: (location: string) => void;
    handleSearch: (searchResults: string) => void;
    handleSearchHistoryDelete: (item: string) => void;
    handleSearchHistorySelect: (item: string) => void;
    setScreen: (screen: 'search' | 'weather') => void;
}