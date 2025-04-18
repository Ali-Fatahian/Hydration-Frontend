import { View, Text, Pressable } from "react-native";
import React from "react";
import WaterIcon from "@/assets/WaterIcon";
import { Link, Stack, useRouter } from "expo-router";

type Props = {};

const NotificationsHistory = (props: Props) => {
  const router = useRouter();

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
          {/* Show different days and details from database */}
          <View>
            <Text className="text-white mb-2 font-bold">Yesterday</Text>
            <Text className="text-gray-200 text-[14px] mb-1">
              {/* For each notification */}
              Morning Hydration Tip: Start with 200ml
            </Text>
            <Text className="text-gray-200 mb-1">
              Morning Hydration Tip: Start with 200ml
            </Text>
            <Text className="text-gray-200 mb-1">
              Morning Hydration Tip: Start with 200ml
            </Text>
          </View>
          <View>
            <Text className="text-white mb-2 font-bold">Tuesday</Text>
            <Text className="text-gray-200 text-[14px] mb-1">
              {/* For each notification */}
              Morning Hydration Tip: Start with 200ml
            </Text>
            <Text className="text-gray-200 mb-1">
              Morning Hydration Tip: Start with 200ml
            </Text>
            <Text className="text-gray-200 mb-1">
              Morning Hydration Tip: Start with 200ml
            </Text>
          </View>
          <View>
            <Text className="text-white mb-2 font-bold">Tuesday</Text>
            <Text className="text-gray-200 text-[14px] mb-1">
              {/* For each notification */}
              Morning Hydration Tip: Start with 200ml
            </Text>
            <Text className="text-gray-200 mb-1">
              Morning Hydration Tip: Start with 200ml
            </Text>
            <Text className="text-gray-200 mb-1">
              Morning Hydration Tip: Start with 200ml
            </Text>
          </View>
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
