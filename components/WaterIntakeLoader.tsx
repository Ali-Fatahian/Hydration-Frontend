import { useEffect } from "react";
import { useContextState } from "@/app/Context";
import axiosInstance from "@/axiosInstance";

type Props = {
  setFetchWaterIntake: (data: any) => void;
  setCreateWaterIntake: (data: any) => void;
  setCreateWaterIntakeError: (err: string) => void;
  setFetchWaterIntakeError: (err: string) => void;
  setWaterIntakeLoader: (data: any) => void;
  refreshToken: string;
  token: string | null;
};

const WaterIntakeLoader = (props: Props) => {
  const { weather, shouldRefreshWaterIntake, token } = useContextState();

  useEffect(() => {
    if (
      !weather ||
      weather.temperature_celsius == null ||
      weather.humidity_percent == null ||
      !token
    ) {
      props.setFetchWaterIntake(null);
      props.setCreateWaterIntake(null);
      return;
    }

    const createWaterIntake = async () => {
      try {
        const response = await axiosInstance.post(
          "water_intake",
          {
            temperature_celsius: weather?.temperature_celsius,
            humidity_percent: weather?.humidity_percent,
          },
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        if (response.status === 201) {
          props.setCreateWaterIntake(response.data);
        }
      } catch (err: any) {
        props.setCreateWaterIntakeError(err.message);
      }
    };

    const fetchWaterIntake = async () => {
      try {
        const response = await axiosInstance.get("water_intake", {
          headers: { Authorization: `Token ${token}` },
        });
        if (response.status === 200) {
          props.setFetchWaterIntake(response.data);
        }
      } catch (err: any) {
        props.setFetchWaterIntakeError(err.message);
      }
    };
    const orderEnforcer = async () => {
      props.setWaterIntakeLoader(true);
      await createWaterIntake();
      await fetchWaterIntake();
      props.setWaterIntakeLoader(false);
    };
    orderEnforcer();
    console.log(shouldRefreshWaterIntake);
  }, [shouldRefreshWaterIntake, props.refreshToken, token]);

  return null;
};

export default WaterIntakeLoader;
