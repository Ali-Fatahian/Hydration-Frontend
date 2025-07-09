import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { useRouter } from "expo-router";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import { useContextState } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Keep for initial user loading if context not ready

type Props = {};

const EnterActivityLevel = (props: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    token,
    contextLoading,
    setShouldRefreshDashboard,
    setShouldRefreshWaterIntake, // **IMPORTANT: Add this**
    updateUserInContext,
    updateUserInStorage,
    user, // Rely on user from context as the primary source
  } = useContextState();

  // Initialize selectedActivityLevel based on the user from context
  // Use a separate useEffect or set it directly based on 'user' once it's available.
  const [selectedActivityLevel, setSelectedActivityLevel] =
    useState("moderate"); // Default initial state

  useEffect(() => {
    if (!contextLoading) {
      if (!token) {
        router.navigate("/Login");
        return;
      }
    }

    // This effect runs when `user` from context changes or becomes available
    const initializeActivityLevel = async () => {
      let currentUser = user;
      if (!currentUser) {
        // Fallback: If context user is not yet available, try AsyncStorage
        try {
          const storedUser = await AsyncStorage.getItem("user");
          if (storedUser) {
            currentUser = JSON.parse(storedUser);
          }
        } catch (err) {
          console.error(
            "Failed to load user from storage for initialization:",
            err
          );
        }
      }

      if (
        currentUser?.activity &&
        typeof currentUser.activity === "string" &&
        currentUser.activity.length > 0
      ) {
        setSelectedActivityLevel(currentUser.activity);
      } else {
        setSelectedActivityLevel("moderate"); // Set default if no activity found
      }
    };

    initializeActivityLevel();
  }, [contextLoading, token, user]); // Depend on user from context

  const sendData = async () => {
    // Rely on `user` from context for user ID
    if (!user?.id) {
      setError("User information missing. Please log in again.");
      setLoading(false); // Ensure loading is off if there's an early exit
      return;
    }
    if (!selectedActivityLevel) {
      setError("Please select an activity level.");
      setLoading(false); // Ensure loading is off
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await axiosInstance.patch(
        `users/${user.id}`,
        {
          // Use user.id from context, no trailing slash
          activity: selectedActivityLevel.toLowerCase(),
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (response.status === 200) {
        // Create an updated user object based on current context user
        const updatedUser = {
          ...user,
          activity: selectedActivityLevel.toLowerCase(),
        };

        // 1. Update user in global context
        updateUserInContext(updatedUser);
        // 2. Update user in AsyncStorage
        await updateUserInStorage(updatedUser);

        // 3. Trigger refreshes for Dashboard and WaterIntakeLoader
        setShouldRefreshDashboard((prev: number) => prev + 1); // Increment the number
        setShouldRefreshWaterIntake((prev: number) => prev + 1); // **IMPORTANT: Increment this too**

        router.replace("/Profile"); // Navigate back to profile or wherever appropriate
      } else {
        setError("Failed to update activity level. Please try again.");
      }
    } catch (err: any) {
      console.error("Error updating activity level:", err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const formSubmitHandler = () => {
    // Simplified validation: check if a valid activity level is selected
    if (["low", "moderate", "high"].includes(selectedActivityLevel)) {
      sendData();
    } else {
      setError("Please select a valid activity level before submitting.");
    }
  };

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px] px-2">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          Activity Level
        </Text>
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Please choose and click continue
        </Text>
        <View className="flex flex-col min-[270px]:flex-row flex-wrap gap-4 mt-10 justify-center mx-auto">
          {["low", "moderate", "high"].map(
            (
              activity // Removed selectedActivityLevel.length > 0 check here
            ) => (
              <Pressable
                key={activity}
                onPress={() => {
                  // Move onPress to Pressable
                  setError("");
                  setSelectedActivityLevel(activity);
                }}
                className={`cursor-pointer ${
                  selectedActivityLevel === activity
                    ? "bg-[#448AFF]"
                    : "bg-[#2D2F4E]"
                } text-white rounded-lg py-3 px-10 w-fit mx-auto hover:bg-[#2979FF] transition-colors`}
              >
                <Text className="text-white text-center">
                  {`${activity.slice(0, 1).toUpperCase()}${activity.slice(1)}`}
                </Text>
              </Pressable>
            )
          )}
        </View>
        {error.length > 0 && (
          <View className="bg-[#B22222] p-2 rounded-md mt-6">
            <Text className="text-sm text-gray-200">{error}</Text>
          </View>
        )}
        {loading && <Loader className="mt-6" />}
        <Pressable
          onPress={formSubmitHandler} // Simplified onPress
          className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 mt-10 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          disabled={loading} // Disable button while loading
        >
          <Text className="text-[14px] font-bold text-white text-center">
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/Profile")}
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          <Text className="text-[14px] font-bold text-white text-center">
            Back
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EnterActivityLevel;
