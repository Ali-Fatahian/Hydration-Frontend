import { useEffect } from "react";
import { useContextState } from "@/app/Context";
import useUserLocation from "./useUserLocation";
import axiosInstance from "@/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export default function WeatherFetcher() {
  const { setWeather, setWeatherError } = useContextState();
  const { location, errorMsg } = useUserLocation();

  useEffect(() => {
    if (!location || errorMsg) return;

    const fetchWeather = async () => {
      // Fetch every new day automatically
      try {
        const today = format(new Date(), "yyyy-MM-dd"); // Local date string
        const lastFetchDate = await AsyncStorage.getItem(
          "weatherLastFetchDate"
        );
        const storedWeather = await AsyncStorage.getItem("weatherData");

        if (lastFetchDate === today && storedWeather) {
          setWeather(JSON.parse(storedWeather));
          return;
        }

        if (!location || errorMsg) {
          setWeatherError("Location unavailable");
          return;
        }

        const res = await axiosInstance.get("weather_info", {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        });

        setWeather(res.data); // { temperature_celsius, humidity_percent }
        setWeatherError(null);

        await AsyncStorage.setItem("weatherLastFetchDate", today);
        await AsyncStorage.setItem("weatherData", JSON.stringify(res.data));
      } catch (err: any) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch weather";
        console.error("Weather fetch failed:", err);
        setWeatherError(message);
      }
    };

    fetchWeather();
  }, [location, errorMsg]);

  return null;
}
