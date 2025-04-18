import { View, Text, Pressable, UIManager, Platform } from "react-native";
import React, { useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { Link, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const NotificationsSummary = (props: Props) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

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
          Today's Notifications
        </Text>
        <View className="bg-[#2E2E4D] p-3 flex flex-col w-full gap-4 rounded-md mt-4">
          <View className="flex flex-row gap-2">
            <Ionicons
              name="calendar-clear-outline"
              color={"#E4CCFF"}
              size={18}
            />
            <View className="grid grid-cols-2">
              <Text className="mr-1 text-white">Today's reminders:</Text>
              <Text className="text-white">3</Text>
            </View>
          </View>
          <View className="flex flex-row gap-2">
            <Ionicons name="eye-outline" color={"#E4CCFF"} size={18} />
            <View className="grid grid-cols-2">
              <Text className="mr-1 text-white">Viewed:</Text>
              <Text className="text-white">3</Text>
            </View>
          </View>
        </View>
        <Pressable
          className="flex flex-row justify-between bg-[#2E2E4D] p-3 cursor-pointer transition-colors rounded-md mt-2 hover:bg-[#36366c]"
          onPress={toggleAccordion}
        >
          <Text className="text-white">Details</Text>
          <Ionicons name="arrow-down-outline" color={"#fff"} size={18} />
        </Pressable>
        {/* Start of notifications */}
        {expanded && (
          <View className="flex flex-col rounded-md mt-1 gap-1">
            <Pressable className="p-3 hover:bg-[#51518A] bg-[#3F3F6B] rounded-md transition-colors flex flex-row justify-between">
              <Text className="text-[#afafc1] font-light text-xs">
                Time to drink water - 300ml
              </Text>
              <Ionicons color={"#afafc1"} size={16} name="square-outline" />
              {/* When checked <Ionicons color={'#afafc1'} size={14} name='checkbox-outline' /> */}
            </Pressable>
            <Pressable className="p-3 hover:bg-[#51518A] bg-[#3F3F6B] rounded-md transition-colors flex flex-row justify-between">
              <Text className="text-[#afafc1] font-light text-xs">
                Time to drink water - 300ml
              </Text>
              <Ionicons color={"#afafc1"} size={16} name="square-outline" />
              {/* When checked <Ionicons color={'#afafc1'} size={14} name='checkbox-outline' /> */}
            </Pressable>
            <Pressable className="p-3 hover:bg-[#51518A] bg-[#3F3F6B] rounded-md transition-colors flex flex-row justify-between">
              <Text className="text-[#afafc1] font-light text-xs">
                Time to drink water - 300ml
              </Text>
              <Ionicons color={"#afafc1"} size={16} name="square-outline" />
              {/* When checked <Ionicons color={'#afafc1'} size={14} name='checkbox-outline' /> */}
            </Pressable>
          </View>
        )}
        <View className="bg-[#2E2E4D] p-3 w-full rounded-md mt-4">
          <Text className="text-white font-bold">AI Suggestions</Text>
          <Text className="text-gray-400 text-sm mt-2">
            You are most likely to respond to reminders at 8-10 pm. Want to
            focus on reminders around this time?
          </Text>
        </View>
        <Pressable
          onPress={() => router.navigate("/NotificationsHistory")}
          className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-sm font-bold text-white text-center">
            Notifications History
          </Text>
        </Pressable>
        <Link
          href="/Dashboard"
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Dashboard
        </Link>
      </View>
    </View>
  );
};

export default NotificationsSummary;
