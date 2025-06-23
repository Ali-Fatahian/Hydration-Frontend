import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Ionicons } from "@expo/vector-icons";
import ShoeIcon from "@/assets/ShoeIcon";
import BottleIcon from "@/assets/BottleIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/axiosInstance";
import { useContextState } from "./Context";

type Props = {};

const Dashboard = (props: Props) => {
  const [notification, setNotification] = useState<any>("");
  const [waterIntake, setWaterIntake] = useState<any>(null);
  const [creatineIntake, setCreatineIntake] = useState("");
  const [weather, setWeather] = useState(""); // Comes directly from AI
  const [activityLevel, setActivityLevel] = useState("");
  const [notificationError, setNotificationError] = useState("");
  const [userError, setUserError] = useState("");
  const [waterIntakeError, setWaterIntakeError] = useState("");
  const [weatherError, setWeatherError] = useState("");
  const router = useRouter();

  const { token, contextLoading } = useContextState();

  console.log('Token', token)

  const fetchNotification = async () => {
    try {
      const response = await axiosInstance.get("latest_notification");
      if (response.status === 200) {
        setNotification(response.data);
      }
    } catch (err: any) {
      setNotificationError(err.message);
    }
  };

  const fetchWaterIntake = async () => {
    try {
      const response = await axiosInstance.get("water_intake");
      if (response.status === 200) {
        setWaterIntake(response.data);
      }
    } catch (err: any) {
      setWaterIntakeError(err.message);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      const response = await axiosInstance.get(`users/${userId}`);
      if (response.status === 200) {
        setCreatineIntake(response.data["creatine_intake"]);
        setActivityLevel(response.data["activity"]);
      }
    } catch (err: any) {
      setUserError(err.message);
    }
  };

  // const fetchWeatherInfo = async () => {
  //   try {
  //     const response = await axios.get("weather-api-url");
  //     if (response.status === 200) {
  //       setWeather(response.data);
  //     }
  //   } catch (err: any) {
  //     setWeatherError(err.message);
  //   }
  // };

  useEffect(() => {
    if (!contextLoading) {
      if (!token) {
        router.navigate("/Login");
        return;
      }
    } // Putting this code in checkAuth() makes it too slow to run, doesn't work

    fetchWaterIntake();
    fetchNotification();
    // fetchWeatherInfo();
    fetchUserInfo();
  }, [token, contextLoading]);

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
          Track your hydration
        </Text>
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Monitor your water intake and stay on top of your hydration goals.
        </Text>
        {waterIntakeError.length > 0 ? (
          <View className="w-full bg-[#BBBBBB] text-xs text-blue-100 rounded-full dark:bg-gray-700 mt-8 text-center p-2 font-bold leading-none">
            0<View className={`bg-[#57A8FF] rounded-full w-0`}></View>
          </View>
        ) : (
          waterIntake && (
            <View className="w-full bg-[#BBBBBB] rounded-full dark:bg-gray-700 mt-8">
              <View
                style={{
                  width: `${Math.round(
                    (Number(waterIntake.user_water_intake) /
                      Number(waterIntake.max_water_intake)) *
                      100
                  )}%`,
                }}
                className={
                  "bg-[#57A8FF] rounded-full text-center p-2 font-bold leading-none text-xs text-blue-100"
                }
              >
                {Math.round(
                  (Number(waterIntake.user_water_intake) /
                    Number(waterIntake.max_water_intake)) *
                    1000
                ) / 10}
                %
              </View>
            </View>
          )
        )}
        {waterIntakeError.length === 0 && waterIntake && (
          <Text className="text-center text-white font-bold mt-8 text-xl">
            {(Math.round(waterIntake.user_water_intake) * 10) / 10}ml
            <Text className="text-[#AFAFC1] font-normal ml-2">
              of {waterIntake.max_water_intake}ml
            </Text>
          </Text>
        )}
        {notificationError.length > 0 ? (
          <View className="bg-[#B22222] mt-3 p-2 rounded-md">
            <Text className="text-sm text-gray-200">{notificationError}</Text>
          </View>
        ) : (
          <Pressable
            className="bg-[#565967] px-5 py-4 rounded-lg mt-8 flex flex-col gap-4 min-[366px]:flex-row min-[366px]:gap-0 justify-between hover:bg-[#4a4c58] transition-colors"
            onPress={() => router.navigate("/NotificationsSummary")}
          >
            <View className="flex flex-row">
              <Ionicons
                name="bulb"
                color={"#FBC02D"}
                size={15}
                className="mr-2"
              />
              <Text className="text-[#afafc1] font-light text-xs">
                {notification.message}
              </Text>
            </View>
            <Ionicons
              name="arrow-forward-outline"
              size={15}
              color={"#fff"}
              className="text-right"
            />
          </Pressable>
        )}
        <View className="w-full mt-3">
          <View className="mt-6 w-full mx-auto flex flex-row justify-evenly gap-3">
            {activityLevel.length > 0 && userError.length === 0 ? (
              <View className="flex flex-col items-center">
                <ShoeIcon
                  height={80}
                  width={80}
                  fill={
                    activityLevel === "low"
                      ? "#4B9CD3"
                      : activityLevel === "moderate"
                      ? "#FF9F1C"
                      : "#E63946"
                  }
                />
                <View>
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    Activity:
                  </Text>
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    {activityLevel}
                  </Text>
                </View>
              </View>
            ) : (
              <View className="flex flex-col items-center">
                <ShoeIcon height={80} width={80} fill="#635994" />
                <View>
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    Activity:
                  </Text>
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    N/D
                  </Text>
                </View>
              </View>
            )}

            <View className="flex flex-col items-center gap-3">
              <Ionicons
                name="partly-sunny-outline"
                size={70}
                color={"#7B61FF"}
              />
              <View>
                <Text className="text-[14px] font-bold text-[#AFAFC1]">
                  Weather:
                </Text>
                {weather.length > 0 && weatherError.length === 0 ? (
                  <View className="flex flex-row gap-1">
                    <Text className="text-[14px] font-bold text-[#AFAFC1]">
                      {weather}
                    </Text>
                    <Text className="text-[14px] font-bold text-[#AFAFC1]">
                      °C
                    </Text>
                  </View>
                ) : (
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    N/D
                  </Text>
                )}
              </View>
            </View>
            <View className="flex flex-col items-center gap-3">
              <BottleIcon height={70} width={70} fill={"#7B61FF"} />
              <View>
                <Text className="text-[14px] font-bold text-[#AFAFC1]">
                  Creatine:
                </Text>
                <View className="flex flex-row gap-1">
                  {creatineIntake.length > 0 && userError.length === 0 ? (
                    <Text className="text-[14px] font-bold text-[#AFAFC1]">
                      {Number(creatineIntake)}
                    </Text>
                  ) : (
                    <Text className="text-[14px] font-bold text-[#AFAFC1]">
                      0
                    </Text>
                  )}
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    g/day
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => router.navigate("/DailyGoal")}
          className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 mt-10 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-[14px] font-bold text-white text-center">
            + Enter Water Intake
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
