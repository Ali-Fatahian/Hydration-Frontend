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
    console.log('triggered')
    // Only proceed if we have valid weather data and a token
    if (
      !weather ||
      !token ||
      weather.temperature_celsius == null ||
      weather.humidity_percent == null
    ) {
      // If conditions aren't met, ensure loader is false so UI doesn't hang
      props.setWaterIntakeLoader(false);
      return;
    }

    const createAndFetchWaterIntake = async () => {
      props.setWaterIntakeLoader(true); // Start loading

      try {
        // 1. Attempt to create water intake
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
          props.setCreateWaterIntakeError(""); // Clear any previous errors
        }
      } catch (createErr: any) {
        // Only set error if it's a real error, not just a 409 (conflict)
        // You might want to check for specific error codes here if your API returns 409 for "already exists"
        if (createErr.response && createErr.response.status === 409) {
          console.log(
            "Water intake for today already exists, proceeding to fetch."
          );
          props.setCreateWaterIntakeError(""); // Clear error if it's just a conflict
        } else {
          console.error("Error creating water intake:", createErr);
          props.setCreateWaterIntakeError(
            createErr.message || "Failed to create water intake."
          );
        }
      }

      try {
        // 2. Attempt to fetch water intake (regardless of create success/failure)
        const fetchResponse = await axiosInstance.get("water_intake", {
          headers: { Authorization: `Token ${token}` },
        });
        if (fetchResponse.status === 200) {
          props.setFetchWaterIntake(fetchResponse.data);
          props.setFetchWaterIntakeError(""); // Clear any previous errors
        }
      } catch (fetchErr: any) {
        console.error("Error fetching water intake:", fetchErr);
        props.setFetchWaterIntakeError(
          fetchErr.message || "Failed to fetch water intake."
        );
        props.setFetchWaterIntake(null); // Clear previous data on error
      } finally {
        props.setWaterIntakeLoader(false); // End loading, even if there's an error
      }
    };

    createAndFetchWaterIntake();
  }, [shouldRefreshWaterIntake, weather, token]); // Simplified dependencies

  return null;
};

export default WaterIntakeLoader;
