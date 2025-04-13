import { View, Text } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Pressable, TextInput } from "react-native-gesture-handler";

type Props = {};

const DailyGoal = (props: Props) => {
  return (
    <View className="bg-[#1e1f3f] h-full w-full py-[60px]">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
        <Text className="text-[20px] font-bold text-white text-center flex flex-row">
          HydrationIQ
        </Text>
        </View>
      <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
        Set your daily goal
      </Text>
      <View className="w-full mt-[50] px-2">
        <TextInput
          className='w-full max-w-lg mx-auto peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"'
          keyboardType="numeric"
          placeholder="Enter your daily goal(ml)"
        />
        <Pressable className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors">
          <Text className="text-sm font-bold text-white text-center">
            Continue
          </Text>
        </Pressable>
        <Link
          href="/Dashboard"
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Cancel
        </Link>
      </View>
    </View>
  );
};

export default DailyGoal;
