import { useEffect } from "react";
import { useContextState } from "@/app/Context";
import useUserLocation from "./useUserLocation";
import axiosInstance from "@/axiosInstance";

export default function WeatherFetcher() {
  const { setWeather, setWeatherError } = useContextState();
  const { location, errorMsg } = useUserLocation();

  useEffect(() => {
    if (!location || errorMsg) return;

    const fetchWeather = async () => {
      try {
        const res = await axiosInstance.get(
          "weather_info",
          {
            params: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }
        );

        setWeather(res.data); // { temperature_celsius, humidity_percent }
        setWeatherError(null)
      } catch (err:any) {
        console.error("Failed to fetch weather", err);
        setWeatherError(err?.message || "Failed to fetch weather");
      }
    };

    fetchWeather();
  }, [location, errorMsg]);

  return null;
}
