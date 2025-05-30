import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { Link, useRouter } from "expo-router";
import axiosInstance from "@/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NotificationType = {
  id: number;
  message: string;
  seen: boolean;
  date_created: string;
};

type NotificationsType = {
  [date: string]: NotificationType[]; // e.g., "2025-05-05": [...]
};

type Props = {};

const NotificationsHistory = (props: Props) => {
  const [notifications, setNotifications] = useState<NotificationsType | null>(
    null
  );
  const router = useRouter();
  const [error, setError] = useState("");
  const today = new Date();

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.navigate("/Login");
      return;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("notifications");
      if (response.status === 200) {
        setNotifications(response.data);
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

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
          Notifications History
        </Text>
        <Text className="text-gray-300 text-xs text-center mt-2">
          Last 7 days (Scroll to see more)
        </Text>
        <ScrollView className="bg-[#2D2F50] flex flex-col gap-5 p-3 rounded-md mt-6 max-h-[216px] overflow-y-scroll">
          {notifications && Object.keys(notifications).length > 0
            ? Object.entries(notifications).map(([date, items], i) => (
                <View key={i}>
                  <Text className="text-white mb-2 font-bold">
                    {today.getDate() - Number(date.slice(date.length - 2)) === 1
                      ? "Yesterday"
                      : date}
                  </Text>
                  {items.map((notification, i) => (
                    <Text key={i} className="text-gray-200 text-[14px] mb-1">
                      {notification.message}
                    </Text>
                  ))}
                </View>
              ))
            : error.length > 0 && (
                <View className="bg-[#B22222] p-2 rounded-md">
                  <Text className="text-sm text-gray-200">{error}</Text>
                </View>
              )}
        </ScrollView>
        <Pressable
          onPress={() => router.navigate("/Dashboard")}
          className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-sm font-bold text-white text-center">
            Dashboard
          </Text>
        </Pressable>
        <Link
          href="/NotificationsSummary"
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Back
        </Link>
      </View>
    </ScrollView>
  );
};

export default NotificationsHistory;
