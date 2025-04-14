import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Ionicons } from "@expo/vector-icons"

type Props = {};

const bottleIcon = require('../assets/bottle-svgrepo-com.svg')

const Dashboard = (props: Props) => {
  return (
    <View className="bg-[#1e1f3f] h-full w-full py-[60px] px-2">
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
      <Text className="text-center text-white font-bold mt-8 text-xl">1200ml <Text className="text-[#AFAFC1] font-normal">of 3000ml</Text></Text>
      <Text className="bg-[#565967] px-5 py-4 text-[#afafc1] font-light text-xs rounded-lg mt-8"><Ionicons name='bulb' color={'#FBC02D'} size={15} className="mr-2" />It's hot today — add 300ml to your daily goal.</Text>
      <View className="mt-3 w-full grid grid-cols-3 justify-center gap-3">
      </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
    color: 'white',
  }
})