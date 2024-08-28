import React, { createContext, useContext, useState, useEffect } from "react";
import fetchFormattedData, {
  WeatherData,
} from "../services/weatherApi/weatherApi";
import { AppContextProps } from "./AppContext.types";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<Set<string>>(new Set());
  const [screen, setScreen] = useState<"search" | "weather">("search");

  const handleSearch = (searchResults: string) => {
    setLocation(searchResults);
  };

  const handleSearchHistoryDelete = (item: string) => {
    setSearchHistory((prev) => {
      const updatedHistory = new Set(
        Array.from(prev).filter((h) => h !== item)
      );
      return updatedHistory;
    });
  };

  const handleSearchHistorySelect = (item: string) => {
    setLocation(item);
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(new Set(JSON.parse(savedHistory)));
    }
  }, []);

  useEffect(() => {
    const historyArray = Array.from(searchHistory).slice(-10);
    localStorage.setItem("searchHistory", JSON.stringify(historyArray));
  }, [searchHistory]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (
        !location ||
        (weather && `${weather.city}, ${weather.country}` === location)
      ) {
        return;
      }

      setIsLoading(true);
      setErrorMessage("");
      try {
        const data = await fetchFormattedData({ q: location });

        if (data && data.city && data.country) {
          const cityCountry = `${data.city}, ${data.country}`;

          setWeather(data);
          setScreen("weather");
          setSearchHistory((prev) => {
            const updatedHistory = new Set(Array.from(prev).slice(-9));
            updatedHistory.add(cityCountry);
            return updatedHistory;
          });

          if (location !== cityCountry) {
            setLocation(cityCountry);
          }
        } else {
          throw new Error("No data received");
        }
      } catch (error) {
        setLocation("");
        setErrorMessage("Invalid country or city");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        weather,
        location,
        errorMessage,
        searchHistory: new Set(Array.from(searchHistory).slice(-10)),
        screen,
        setLocation,
        handleSearch,
        handleSearchHistoryDelete,
        handleSearchHistorySelect,
        setScreen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
