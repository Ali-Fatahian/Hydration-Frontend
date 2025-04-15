import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Ionicons } from "@expo/vector-icons";
import ShoeIcon from "@/assets/ShoeIcon";
import BottleIcon from "@/assets/BottleIcon";

type Props = {};

const Dashboard = (props: Props) => {
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
          Track your hydration
        </Text>
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Monitor your water intake and stay on top of your hydration goals.
        </Text>
        <View className="w-full bg-[#BBBBBB] rounded-full dark:bg-gray-700 mt-8">
          <View className="bg-[#57A8FF] text-xs text-blue-100 text-center p-2 font-bold leading-none rounded-full w-[85%]">
            85%
          </View>
        </View>
        <Text className="text-center text-white font-bold mt-8 text-xl">
          1200ml <Text className="text-[#AFAFC1] font-normal">of 3000ml</Text>
        </Text>
        <Text className="bg-[#565967] px-5 py-4 text-[#afafc1] font-light text-xs rounded-lg mt-8">
          <Ionicons name="bulb" color={"#FBC02D"} size={15} className="mr-2" />
          It's hot today — add 300ml to your daily goal.
        </Text>
        <View className="w-full mt-3">
          <View className="mt-6 w-full mx-auto grid grid-cols-3 justify-center gap-3">
            <View className="flex flex-col items-center">
              <ShoeIcon height={80} width={80} fill="#635994" />
              <View>
                <Text className="text-[14px] font-bold text-[#AFAFC1]">
                  Activity:
                </Text>
                <Text className="text-[14px] font-bold text-[#AFAFC1]">
                  Moderate
                </Text>
              </View>
            </View>
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
                <View className="flex flex-row gap-1">
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    30
                  </Text>
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    °C
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-col items-center gap-3">
              <BottleIcon height={70} width={70} fill={"#7B61FF"} />
              <View>
                <Text className="text-[14px] font-bold text-[#AFAFC1]">
                  Creatine:
                </Text>
                <View className="flex flex-row gap-1">
                  <Text className="text-[14px] font-bold text-[#AFAFC1]">
                    5
                  </Text>
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
    </View>
  );
};

export default Dashboard;
