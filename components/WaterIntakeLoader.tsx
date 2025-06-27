import { useEffect } from "react";
import { useContextState } from "@/app/Context";
import axiosInstance from "@/axiosInstance";

type Props = {
  setFetchWaterIntake: (data: any) => void;
  setCreateWaterIntake: (data: any) => void;
  setCreateWaterIntakeError: (err: string) => void;
  setFetchWaterIntakeError: (err: string) => void;
  setWaterIntakeLoader: (data: any) => void;
};

const WaterIntakeLoader = (props: Props) => {
  const { weather } = useContextState();

  useEffect(() => {
    if (
      !weather ||
      weather.temperature_celsius == null ||
      weather.humidity_percent == null
    ) {
      return;
    }

    const createWaterIntake = async () => {
      try {
        const response = await axiosInstance.post("water_intake", {
          temperature_celsius: weather?.temperature_celsius,
          humidity_percent: weather?.humidity_percent,
        });
        if (response.status === 201) {
          props.setCreateWaterIntake(response.data);
        }
      } catch (err: any) {
        props.setCreateWaterIntakeError(err.message);
      }
    };

    const fetchWaterIntake = async () => {
      try {
        const response = await axiosInstance.get("water_intake");
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
  }, []);

  return null;
};

export default WaterIntakeLoader;
