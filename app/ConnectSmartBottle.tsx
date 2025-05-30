import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const ConnectSmartBottle = (props: Props) => {
  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px]">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          Connect Smart Bottle
        </Text>
        <Ionicons
          name="bluetooth"
          size={60}
          color={"#7B61FF"}
          className="mt-10 text-center"
        />
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Turn on your smart bottle's Bluetooth to sync with HydrateIQ.
        </Text>
        <Pressable className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors">
          <Text className="text-sm font-bold text-white text-center">
            Connect Via Bluetooth
          </Text>
        </Pressable>
        <Text className="text-[#AAAAAA] text-[14px] mt-4 text-center hover:underline">
          <Link href="/Profile">Skip for now</Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default ConnectSmartBottle;
