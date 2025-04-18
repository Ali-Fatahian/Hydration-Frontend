import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import DefaultProfile from "@/assets/DefaultProfile";

type Props = {};

const PersonalInformation = (props: Props) => {
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
          Personal Information
        </Text>
        <View>
          <View className="flex flex-col gap-4 justify-center items-center w-full mt-6">
            <DefaultProfile />
          </View>
          <View className="mt-6">
            <Text className="text-white mb-2">Full Name</Text>
            <TextInput
              className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light placeholder:text-gray-400 px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
              placeholder="User's Full Name"
            />
          </View>
          <View className="mt-4">
            <Text className="text-white mb-2">Email</Text>
            <TextInput
              className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light placeholder:text-gray-400 px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
              placeholder="User's Email"
            />
          </View>
        </View>
        <Pressable
          onPress={() => router.navigate("/PersonalInformation")}
          className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-sm font-bold text-white text-center">
            Save Changes
          </Text>
        </Pressable>
        <Link
          href="/Profile"
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Back
        </Link>
      </View>
    </View>
  );
};

export default PersonalInformation;
