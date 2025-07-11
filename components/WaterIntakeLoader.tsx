import { useEffect } from "react";
import { useContextState } from "@/app/Context";
import axiosInstance from "@/axiosInstance";

type Props = {
  setFetchWaterIntake: (data: any) => void;
  setCreateWaterIntake: (data: any) => void;
  setCreateWaterIntakeError: (err: string) => void;
  setFetchWaterIntakeError: (err: string) => void;
  setWaterIntakeLoader: (isLoading: boolean) => void; // Explicitly boolean
};

const WaterIntakeLoader = (props: Props) => {
  const { weather, shouldRefreshWaterIntake, token } = useContextState();

  useEffect(() => {
    if (
      !weather ||
      !token ||
      weather.temperature_celsius == null ||
      weather.humidity_percent == null
    ) {
      props.setWaterIntakeLoader(false);
      return;
    }

    const createAndFetchWaterIntake = async () => {
      props.setWaterIntakeLoader(true);

      try {
        const createResponse = await axiosInstance.post(
          "water_intake",
          {
            temperature_celsius: weather.temperature_celsius,
            humidity_percent: weather.humidity_percent,
          },
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        if (createResponse.status === 201) {
          props.setCreateWaterIntake(createResponse.data);
          props.setCreateWaterIntakeError("");
        }
      } catch (createErr: any) {
        if (createErr.response && createErr.response.status === 409) {
          console.log(
            "Water intake for today already exists, proceeding to fetch."
          );
          props.setCreateWaterIntakeError("");
        } else {
          console.error("Error creating water intake:", createErr);
          props.setCreateWaterIntakeError(
            createErr.message || "Failed to create water intake."
          );
        }
      }

      try {
        const fetchResponse = await axiosInstance.get("water_intake", {
          headers: { Authorization: `Token ${token}` },
        });
        if (fetchResponse.status === 200) {
          props.setFetchWaterIntake(fetchResponse.data);
          props.setFetchWaterIntakeError("");
        }
      } catch (fetchErr: any) {
        props.setFetchWaterIntakeError("Failed to fetch water intake, please fill out your profile info to receive water intake suggestion.");
        props.setFetchWaterIntake(null);
      } finally {
        props.setWaterIntakeLoader(false);
      }
    };

    createAndFetchWaterIntake();
  }, [shouldRefreshWaterIntake, weather, token]);

  return null;
};

export default WaterIntakeLoader;
