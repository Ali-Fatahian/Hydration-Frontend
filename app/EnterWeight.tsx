import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Pressable, TextInput } from "react-native-gesture-handler";
import KGIcon from "@/assets/KGIcon";

type Props = {};

const EnterWeight = (props: Props) => {
  const router = useRouter();

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          Weight
        </Text>
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Please enter your weight in kg and click continue
        </Text>
        <View className="mt-10 w-full max-w-sm mx-auto relative">
          <KGIcon
            fill="#52525F"
            height={30}
            width={30}
            classes="absolute left-[3px] top-[5px]"
          />
          <TextInput
            className="transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light pr-5 pl-9 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
            placeholder="Weight..."
            keyboardType="numeric"
            placeholderTextColor={"#B0B0C3"}
          />
        </View>
        <Pressable
          onPress={() => router.navigate("/Dashboard")}
          className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 mt-10 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-[14px] font-bold text-white text-center">
            Continue
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/Dashboard")}
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Cancel
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EnterWeight;
