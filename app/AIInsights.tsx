import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Ionicons } from "@expo/vector-icons";
import BottleIcon from "@/assets/BottleIcon";

type Props = {};

const AIInsights = (props: Props) => {
  const router = useRouter();

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
          AI Insights
        </Text>
        <View className="flex flex-col gap-6 mt-10">
          <Pressable
            onPress={() => router.navigate("/+not-found")}
            className="bg-[#2E2E4D] text-[14px] text-[#B0B0C3] p-3 flex flex-row w-full gap-2 rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
          >
            <Ionicons name="bulb" color={"#FBC02D"} size={18} />
            You've hit your hydration goal 5 out of 7 days this week! Keep it up
          </Pressable>
          <Pressable
            onPress={() => router.navigate("/+not-found")}
            className="bg-[#2E2E4D] p-3 flex flex-row w-full gap-2 rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={"#E4CCFF"}
              size={18}
            />
            <View className="text-[14px] font-bold text-[#B0B0C3]">
              Smart Notification summary
              <Text className="text-[14px] text-[#B0B0C3] mt-1">
                3 reminders sent today.<Text className="ml-2">2 viewed.</Text>
              </Text>
            </View>
          </Pressable>
          <View className="bg-[#2E2E4D] p-3 flex flex-row w-full gap-2 rounded-md">
            <BottleIcon height={32} width={32} fill={"#E4CCFF"} />
            <View className="text-[14px] font-bold text-[#B0B0C3]">
              Creatine Effect on Hydration
              <Text className="text-[14px] text-[#B0B0C3] mt-1">
                Your 5g/day creatine intake increases hydration needs by 500ml
              </Text>
            </View>
          </View>
        </View>
        <Pressable className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 mt-10 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors">
          <Text className="text-[14px] font-bold text-white text-center">
            Back to Dashboard
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AIInsights;
