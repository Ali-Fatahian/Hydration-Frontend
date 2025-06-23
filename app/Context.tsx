import React, { createContext, useContext, useState, ReactNode } from "react";

type ContextType = {
  token: string | null;
  user: UserDetails | null;
  weather: WeatherType | null;
  setToken: (token: string) => void;
  setUser: (user: UserDetails) => void;
  clearAuth: () => void;
  setWeather: (weather: WeatherType) => void;
};

type UserDetails = {
  id: number;
  email: string;
  fullname: string;
  picture: string | null;
  weight: number | null;
  activity: string | null;
  gender: string | null;
  creatine_intake: number | null;
  date_joined: string;
  bottle: { id: number; name: string } | null;
};

type WeatherType = {
  temperature_celsius: number;
  humidity_percent: number;
};

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<UserDetails | null>(null);
  const [weather, setWeatherState] = useState<WeatherType | null>(null);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
  };

  const setUser = (newUser: UserDetails) => {
    setUserState(newUser);
  };

  const clearAuth = () => {
    setTokenState(null);
    setUserState(null);
  };

  const setWeather = (newWeather: WeatherType) => {
    setWeatherState(newWeather);
  };

  return (
    <Context.Provider
      value={{ token, user, weather, setToken, setUser, clearAuth, setWeather }}
    >
      {children}
    </Context.Provider>
  );
};

export const useContextState = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContextState must be used within a ContextProvider");
  }
  return context;
};
