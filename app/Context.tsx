import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type ContextType = {
  token: string | null;
  user: UserDetails | null;
  weather: WeatherType | null;
  weatherError: string | null;
  contextLoading: true | false;
  shouldRefreshDashboard: string;
  shouldRefreshWaterIntake: string;
  setToken: (token: string) => void;
  setUser: (user: UserDetails) => void;
  // updateUser: (fields: Partial<UserDetails>) => void;
  updateUserInContext: (newUser: UserDetails) => void;
  updateUserInStorage: (newUser: UserDetails) => Promise<void>;
  logout: () => Promise<void>;
  setWeather: (weather: WeatherType) => void;
  setWeatherError: (weatherError: string | null) => void;
  setShouldRefreshDashboard: (refresh: string) => void;
  setShouldRefreshWaterIntake: (refresh: string) => void;
};

type UserDetails = {
  id: number;
  email: string;
  fullname: string;
  picture: string | null;
  weight: number | null;
  activity: string | null;
  gender: string | null;
  creatine_intake: string | null;
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
  const [weatherError, setWeatherErrorState] = useState<string | null>(null);
  const [contextLoading, setContextLoading] = useState(true);
  const [shouldRefreshDashboard, setShouldRefreshDashboard] = useState("");
  const [shouldRefreshWaterIntake, setShouldRefreshWaterIntake] = useState("");

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("id");
    setShouldRefreshDashboard(new Date().toString());
    // setShouldRefreshWaterIntake(new Date().toString());
    setTokenState(null);
    setUserState(null);
  };

  const loadToken = async () => {
    const savedToken = await AsyncStorage.getItem("token");
    if (savedToken) {
      setToken(JSON.parse(savedToken));
    }
    setContextLoading(false);
  };

  const setToken = (newToken: string) => {
    setTokenState(newToken);
  };

  const setUser = (newUser: UserDetails) => {
    setUserState(newUser);
  };

  const updateUserInContext = (newUser: UserDetails) => {
    setUserState(newUser);
  };

  const updateUserInStorage = async (newUser: UserDetails): Promise<void> => {
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
  };

  const setWeather = (newWeather: WeatherType) => {
    setWeatherState(newWeather);
  };

  const setWeatherError = (err: string | null) => {
    setWeatherErrorState(err);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <Context.Provider
      value={{
        token,
        user,
        weather,
        weatherError,
        contextLoading,
        shouldRefreshDashboard,
        setToken,
        setUser,
        logout,
        setWeather,
        setWeatherError,
        setShouldRefreshDashboard,
        setShouldRefreshWaterIntake,
        shouldRefreshWaterIntake,
        updateUserInContext,
        updateUserInStorage,
      }}
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
