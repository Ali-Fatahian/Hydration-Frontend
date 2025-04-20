import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { Link, Stack, useRouter } from "expo-router";
import axios from "axios";

const defaultData = [
  {
    id: 3,
    date_created: "2025-4-19",
    notifications: [
      "Morning Hydration Tip: Start with 200ml",
      "Morning Hydration Tip: Start with 200ml",
      "Morning Hydration Tip: Start with 200ml",
    ],
  },
  {
    id: 2,
    date_created: "2025-4-18",
    notifications: [
      "Morning Hydration Tip: Start with 200ml",
      "Morning Hydration Tip: Start with 200ml",
      "Morning Hydration Tip: Start with 200ml",
    ],
  },
  {
    id: 1,
    date_created: "2025-4-17",
    notifications: [
      "Morning Hydration Tip: Start with 200ml",
      "Morning Hydration Tip: Start with 200ml",
      "Morning Hydration Tip: Start with 200ml",
    ],
  },
];

type Props = {};

const NotificationsHistory = (props: Props) => {
  const [notifications, setNotifications] = useState(defaultData);
  const router = useRouter();
  const [error, setError] = useState("");
  const today = new Date();

  const fetchData = async () => {
    try {
      const response = await axios.get("url", {});
      if (response.status === 200) {
        setNotifications(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
      <Stack.Screen options={{ headerShown: false }} />
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
        <View className="bg-[#2D2F50] flex flex-col gap-5 p-3 rounded-md mt-6 max-h-[216px] overflow-y-scroll">
          {notifications && notifications.length > 0
            ? notifications.map((n) => (
                <View key={n.id}>
                  <Text className="text-white mb-2 font-bold">
                    {today.getDate() - Number(n.date_created.slice(n.date_created.length - 2)) === 1
                      ? "Yesterday"
                      : n.date_created}
                  </Text>
                  {n.notifications.map((x, i) => (
                    <Text key={i} className="text-gray-200 text-[14px] mb-1">{x}</Text>
                  ))}
                </View>
              ))
            : error.length > 0 && (
                <View className="bg-[#B22222] p-2 rounded-md">
                  <Text className="text-sm text-gray-200">{error}</Text>
                </View>
              )}
        </View>
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
    </View>
  );
};

export default NotificationsHistory;
