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
import WeatherFetcher from "@/components/WeatherFetcher";
import WaterIntakeLoader from "@/components/WaterIntakeLoader";
import Loader from "@/assets/Loader";

type Props = {};

const Dashboard = (props: Props) => {
  const [notification, setNotification] = useState<any>("");
  const [userSafe, setUserSafe] = useState<any>(null);
  const [notificationError, setNotificationError] = useState("");
  const [userError, setUserError] = useState("");
  const [fetchWaterIntake, setFetchWaterIntake] = useState<any>(null);
  const [createWaterIntake, setCreateWaterIntake] = useState("");
  const [createWaterIntakeError, setCreateWaterIntakeError] = useState("");
  const [fetchWaterIntakeError, setFetchWaterIntakeError] = useState("");
  // Initialize waterIntakeLoader to true to show loader from the start
  const [waterIntakeLoader, setWaterIntakeLoader] = useState(true);
  const router = useRouter();

  const {
    token,
    contextLoading,
    weather,
    weatherError,
    shouldRefreshDashboard,
    shouldRefreshWaterIntake,
    user,
  } = useContextState();

  const progress =
    fetchWaterIntake?.user_water_intake && fetchWaterIntake?.max_water_intake
      ? Math.min(
          Math.round(
            (Number(fetchWaterIntake.user_water_intake) /
              Number(fetchWaterIntake.max_water_intake)) *
              100
          ),
          100
        )
      : 0;

  const fetchNotification = async () => {
    try {
      const response = await axiosInstance.get("latest_notification", {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status === 200) {
        setNotification(response.data);
      }
    } catch (err: any) {
      setNotificationError(err.message);
    }
  };

  useEffect(() => {
    if (!contextLoading && !token) {
      router.navigate("/Login");
      return; // Add return to prevent further execution if redirecting
    }

    if (token) {
      fetchNotification();
    }

    const loadUserFromStorage = async () => {
      try {
        if (!user) {
          const storedUser = await AsyncStorage.getItem("user");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUserSafe(parsed);
          }
        } else {
          setUserSafe(user);
        }
      } catch (err: any) {
        setUserError(err.message);
      }
    };

    loadUserFromStorage();
  }, [token, contextLoading, shouldRefreshDashboard, user]);

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px] px-2">
      <View className="w-full max-w-lg mx-auto">
        <WeatherFetcher />
        <WaterIntakeLoader
          setFetchWaterIntake={setFetchWaterIntake}
          setCreateWaterIntake={setCreateWaterIntake}
          setCreateWaterIntakeError={setCreateWaterIntakeError}
          setFetchWaterIntakeError={setFetchWaterIntakeError}
          setWaterIntakeLoader={setWaterIntakeLoader}
        />

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

        {waterIntakeLoader ? (
          <Loader className="mt-3" />
        ) : fetchWaterIntakeError.length > 0 ? (
          <View className="w-full bg-[#B22222] text-xs text-blue-100 rounded-full mt-8 text-center p-4 font-bold leading-none">
            <Text className="text-white">
              {fetchWaterIntakeError || "Could not load water intake."}
            </Text>
          </View>
        ) : (
          fetchWaterIntake && (
            <>
              <View className="w-full bg-[#BBBBBB] rounded-full dark:bg-gray-700 mt-8">
                <View
                  style={{
                    width: `${Math.min(
                      Math.round(
                        (Number(fetchWaterIntake.user_water_intake) /
                          Number(fetchWaterIntake.max_water_intake)) *
                          100
                      ),
                      100
                    )}%`,
                  }}
                  className={
                    "bg-[#57A8FF] rounded-full text-center p-2 font-bold leading-none text-xs text-blue-100"
                  }
                >
                  <View className="flex flex-row items-center justify-end gap-1">
                    <Text className="text-white font-bold">
                      {Math.round(
                        (Number(fetchWaterIntake.user_water_intake) /
                          Number(fetchWaterIntake.max_water_intake)) *
                          1000
                      ) / 10}
                    </Text>
                    <Text className="text-blue-100 rounded-xl font-bold">
                      %
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex flex-row justify-center items-center mt-8 gap-2">
                <Text className="text-center text-white font-bold text-xl">
                  {(Math.round(fetchWaterIntake.user_water_intake) * 10) / 10}{" "}
                  ml
                </Text>
                <Text className="text-[#AFAFC1] font-normal text-lg">
                  of {fetchWaterIntake.max_water_intake}ml
                </Text>
              </View>
            </>
          )
        )}
        {notificationError.length > 0 ? (
          <View className="bg-[#B22222] mt-3 p-2 rounded-md">
            <Text className="text-sm text-gray-200">{notificationError}</Text>
          </View>
        ) : notification?.message?.length > 0 ? (
          <Pressable
            className="bg-[#565967] px-5 py-4 rounded-lg mt-8 flex flex-col gap-4 min-[366px]:flex-row min-[366px]:gap-0 justify-between hover:bg-[#4a4c58] transition-colors"
            onPress={() => router.navigate("/NotificationsSummary")}
          >
            <View className="flex flex-row w-full">
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
        ) : null}
        {!userSafe?.activity ||
          userSafe?.activity.length === 0 ||
          userSafe?.creatine_intake === null ||
          (userSafe?.creatine_intake === 0 && (
            <Text
              className="text-light text-gray-300 text-xs mt-2"
              ellipsizeMode="tail"
            >
              Please complete your profile to receive water intake suggestions!
            </Text>
          ))}

        <View className="w-full mt-3">
          <View className="mt-6 w-full mx-auto flex flex-row justify-evenly gap-3">
            {userSafe?.activity &&
            userSafe.activity?.length > 0 &&
            userError.length === 0 ? (
              <View className="flex flex-col items-center">
                <ShoeIcon
                  height={80}
                  width={80}
                  fill={
                    userSafe.activity === "low"
                      ? "#4B9CD3"
                      : userSafe.activity === "moderate"
                      ? "#FF9F1C"
                      : "#E63946"
                  }
                />
                <View>
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    Activity:
                  </Text>
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    {userSafe.activity}
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
                {!!weather ? (
                  <View className="flex flex-row gap-1">
                    <Text className="text-[14px] font-bold text-[#AFAFC1]">
                      {weather.temperature_celsius}
                    </Text>
                    <Text className="text-[14px] font-bold text-[#AFAFC1]">
                      °C
                    </Text>
                  </View>
                ) : weatherError ? (
                  <View className="bg-[#B22222] mt-3 p-2 rounded-md">
                    <Text className="text-sm text-gray-200">
                      {weatherError}
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
                  {userSafe?.creatine_intake &&
                  userSafe.creatine_intake?.length > 0 &&
                  userError.length === 0 ? (
                    <Text className="text-[14px] font-bold text-[#AFAFC1]">
                      {Number(userSafe.creatine_intake)}
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
