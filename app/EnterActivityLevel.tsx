import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { useRouter } from "expo-router";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import { useContextState } from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const EnterActivityLevel = (props: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token, contextLoading, setShouldRefreshDashboard, updateUser, user } =
    useContextState();
  const [userSafe, setUserSafe] = useState<any>(user ?? null);

  const [selectedActivityLevel, setSelectedActivityLevel] = useState(() => {
    if (
      typeof userSafe?.activity === "string" &&
      userSafe.activity.length > 0
    ) {
      return userSafe.activity;
    }
    return "moderate";
  });

  const sendData = async () => {
    if (!userSafe?.id) {
      setError("User not loaded yet.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.patch(`users/${userSafe.id}`, {
        activity: selectedActivityLevel.toLowerCase(),
      });
      updateUser({ activity: selectedActivityLevel.toLowerCase() });
      setShouldRefreshDashboard(new Date().toString());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formSubmitHandler = () => {
    if (
      selectedActivityLevel === "low" ||
      selectedActivityLevel === "moderate" ||
      (selectedActivityLevel === "high" && userSafe?.id !== null)
    ) {
      sendData();
    } else {
      setError("Invalid data!");
    }
  };

  useEffect(() => {
    if (!contextLoading) {
      if (!token) {
        router.navigate("/Login");
        return;
      }
    }

    const loadUserFromStorage = async () => {
      if (!user) {
        try {
          const storedUser = await AsyncStorage.getItem("user");
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserSafe(parsedUser);

            if (
              typeof parsedUser?.activity === "string" &&
              parsedUser.activity.length > 0
            ) {
              setSelectedActivityLevel(parsedUser.activity);
            }
          }
        } catch (err) {
          console.error("Failed to load user from storage:", err);
        }
      }
    };

    loadUserFromStorage();
  }, [contextLoading, token]);

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
        <View className="flex flex-col min-[270px]:flex-row flex-wrap gap-4 mt-10 max-w-[25rem] justify-center mx-auto">
          {selectedActivityLevel.length > 0 &&
            ["low", "moderate", "high"].map((activity) => (
              <Pressable
                key={activity}
                onPress={() => {
                  setError("");
                  setSelectedActivityLevel(activity);
                }}
              >
                <Text
                  className={`cursor-pointer ${
                    selectedActivityLevel === activity
                      ? "bg-[#448AFF]"
                      : "bg-[#2D2F4E]"
                  } text-white rounded-lg py-3 px-10 w-fit mx-auto hover:bg-[#2979FF] active:bg-[#5943d6] transition-colors`}
                >
                  {`${activity.slice(0, 1).toUpperCase()}${activity.slice(1)}`}
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
          onPress={() => formSubmitHandler()}
          className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 mt-10 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-[14px] font-bold text-white text-center">
            Submit
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/Profile")}
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Back
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EnterActivityLevel;
