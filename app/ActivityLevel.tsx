import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";

type Props = {};

const ActivityLevel = (props: Props) => {
  const options = [
    "Low (sedentary)",
    "Moderate (Some Exercise)",
    "Hight (Very Active)",
  ];

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
        How active are you?
      </Text>
      <View className="overflow-hidden w-full mt-6">
        {options.map((item, index) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              alert(item);
              // setOpen(false);
            }}
            className={`px-4 py-3 transition-colors bg-[#373759] hover:bg-[#313151] active:bg-[#313151] my-2 rounded-lg w-full max-w-lg mx-auto ${
              index !== options.length - 1 ? "border-b border-[#3a3c55]" : ""
            }`}
          >
            <Text className="text-gray-200 text-[14px] text-center">
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Pressable className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors">
        <Text className="text-sm font-bold text-white text-center">
          Continue
        </Text>
      </Pressable>
    </View>
  );
};

export default ActivityLevel;
