import { View, Text, Pressable } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import DefaultProfile from "@/assets/DefaultProfile";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
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
          Profile
        </Text>
        <View className="flex flex-col gap-4 justify-center items-center w-full mt-6">
          <DefaultProfile />
          <Text className="text-[14px] font-bold text-gray-400">
            John_doe@gmail.com
          </Text>
        </View>
        <View className="flex flex-col gap-2 items-center mt-3">
          <Pressable
            onPress={() => router.navigate("/+not-found")}
            className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
          >
            <View>
              <Text className="text-white text-[14px] font-bold">
                Personal Information
              </Text>
            </View>
            <Ionicons
              name="arrow-forward"
              size={18}
              className="text-[#E6E6E6]"
            />
          </Pressable>
          <Pressable
            onPress={() => router.navigate("/+not-found")}
            className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
          >
            <View className="flex flex-row gap-1">
              <Text className="text-white text-[14px] font-bold">Gender:</Text>
              <Text className="text-white text-[14px] font-bold">Male</Text>
            </View>
            <Ionicons
              name="arrow-forward"
              size={18}
              className="text-[#E6E6E6]"
            />
          </Pressable>
          <Pressable
            onPress={() => router.navigate("/+not-found")}
            className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
          >
            <View className="flex flex-row gap-1">
              <Text className="text-white text-[14px] font-bold">
                Weight (kg):
              </Text>
              <Text className="text-white text-[14px] font-bold">80</Text>
            </View>
            <Ionicons
              name="arrow-forward"
              size={18}
              className="text-[#E6E6E6]"
            />
          </Pressable>
          <Pressable
            onPress={() => router.navigate("/+not-found")}
            className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
          >
            <View className="flex flex-row gap-1">
              <Text className="text-white text-[14px] font-bold">
                Creatine:
              </Text>
              <Text className="text-white text-[14px] font-bold">5g/day</Text>
            </View>
            <Ionicons
              name="arrow-forward"
              size={18}
              className="text-[#E6E6E6]"
            />
          </Pressable>
          <Pressable
            onPress={() => router.navigate("/+not-found")}
            className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
          >
            <View>
              <Text className="text-white text-[14px] font-bold">
                Reconnect Smart Phone
              </Text>
            </View>
            <Ionicons
              name="arrow-forward"
              size={18}
              className="text-[#E6E6E6]"
            />
          </Pressable>
          <Pressable
            onPress={() => router.navigate("/+not-found")}
            className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
          >
            <View className="flex flex-row gap-1">
              <Text className="text-white text-[14px] font-bold">
                Notifications:
              </Text>
              <Text className="text-white text-[14px] font-bold">Enabled</Text>
            </View>
            <Ionicons
              name="arrow-forward"
              size={18}
              className="text-[#E6E6E6]"
            />
          </Pressable>
        </View>
        <Pressable className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors">
          <Text className="text-sm font-bold text-white text-center">
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
