import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { useRouter } from "expo-router";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContextState } from "../Context";

type Props = {};

const EnterGender = (props: Props) => {
  const [selectedGender, setSelectedGender] = useState("");
  // userSafe state might be redundant if you always rely on user from context after initial load
  // For now, we'll keep it for clarity but note that `user` from context is preferred for updates.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    token,
    contextLoading,
    user, // Use 'user' directly from context as the primary source
    updateUserInContext,
    updateUserInStorage,
    setShouldRefreshDashboard,
    setShouldRefreshWaterIntake, // Add this setter from context
  } = useContextState();

  // Load initial gender from context's user state
  useEffect(() => {
    if (!contextLoading) {
      if (!token) {
        router.navigate("/Login");
        return;
      }
    }

    // Initialize selectedGender from context user, or fallback to AsyncStorage if context user is not yet loaded
    const loadInitialGender = async () => {
      try {
        if (user) {
          setSelectedGender(user.gender || "");
        } else {
          const storedUser = await AsyncStorage.getItem("user");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setSelectedGender(parsed.gender || "");
          }
        }
      } catch (err) {
        console.error("Failed to load initial gender:", err);
      }
    };
    loadInitialGender();
  }, [contextLoading, token, user]); // Add user to dependencies to react to context user changes

  const sendData = async () => {
    // Rely on `user` from context, it should be available if `token` is.
    if (!user?.id) {
      setError("User information missing. Please log in again.");
      return;
    }
    if (!selectedGender) {
      setError("Please select a gender.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // Use user.id from context directly
      const response = await axiosInstance.patch(`users/${user.id}`, { // Added trailing slash based on common DRF patterns
        gender: selectedGender.toLowerCase(),
      }, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 200) {
        // Create an updated user object
        const updatedUser = {
          ...user, // Start with current user data from context
          gender: selectedGender.toLowerCase(),
        };

        // 1. Update user in global context
        updateUserInContext(updatedUser);
        // 2. Update user in AsyncStorage
        await updateUserInStorage(updatedUser);

        // 3. Trigger refreshes for Dashboard and WaterIntakeLoader
        setShouldRefreshDashboard((prev: number) => prev + 1); // Increment the number
        setShouldRefreshWaterIntake((prev: number) => prev + 1); // Increment the number

        router.replace("/Profile"); // Navigate back to profile or wherever appropriate
      } else {
        setError("Failed to update gender. Please try again.");
      }
    } catch (err: any) {
      console.error("Error updating gender:", err);
      setError(err.response?.data?.detail || err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const formSubmitHandler = () => {
    // Simplified validation: check if a gender is selected
    if (selectedGender === "male" || selectedGender === "female") {
      sendData();
    } else {
      setError("Please select a gender before submitting.");
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
          Gender
        </Text>
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Please choose and click continue
        </Text>
        <View className="flex flex-col min-[270px]:flex-row gap-4 mt-10 max-w-sm mx-auto">
          {["male", "female"].map((gender) => (
            <Pressable
              key={gender}
              onPress={() => { // Moved onPress to the Pressable component
                setError("");
                setSelectedGender(gender);
              }}
              className={`cursor-pointer ${
                selectedGender &&
                selectedGender.length > 0 &&
                selectedGender === gender
                  ? "bg-[#448AFF]"
                  : "bg-[#2D2F4E]"
              } text-white rounded-lg py-3 px-10 w-fit mx-auto hover:bg-[#2979FF] transition-colors`}
            >
              <Text className="text-white text-center"> {/* Text needs to be inside the Pressable */}
                {`${gender.charAt(0).toUpperCase() + gender.slice(1)}`}
              </Text>
            </Pressable>
          ))}
        </View>
        {error.length > 0 && (
          <View className="bg-[#B22222] p-2 rounded-md mt-6">
            <Text className="text-sm text-gray-200">{error}</Text>
          </View>
        )}
        {loading && <Loader className="mt-6" />}
        <Pressable
          onPress={formSubmitHandler} // No need for arrow function if not passing args
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

export default EnterGender;