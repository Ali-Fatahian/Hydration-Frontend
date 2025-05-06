import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/axiosInstance";
import { useFocusEffect } from "@react-navigation/native";

const Profile = () => {
  const [user, setUser] = useState<{
    picture: string;
    email: string;
    gender: string;
    weight: string;
    creatine_intake: string;
  } | null>(null);
  const [error, setError] = useState("");

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.navigate("/Login");
      return;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      const response = await axiosInstance.get(`users/${userId}`);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAuth();
      fetchUserInfo();
    }, [])
  );

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
      {user && error.length === 0 ? (
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
            <Image
              style={{
                width: 128,
                height: 128,
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: "white",
                backgroundColor: "#b5b3b3",
              }}
              source={
                user.picture
                  ? { uri: user.picture }
                  : require("../assets/default-profile.png") // fallback image
              }
            />
            <Text className="text-[14px] font-bold text-gray-400">
              {user.email}
            </Text>
          </View>
          <View className="flex flex-col gap-2 items-center mt-3">
            <Pressable
              onPress={() => router.navigate("/PersonalInformation")}
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
              onPress={() => router.navigate("/EnterGender")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View className="flex flex-row gap-1">
                <Text className="text-white text-[14px] font-bold">
                  Gender:
                </Text>
                <Text className="text-white text-[14px] font-bold">
                  {user.gender
                    ? `${user.gender
                        .slice(0, 1)
                        .toUpperCase()}${user.gender.slice(1)}`
                    : "Not Set"}
                </Text>
              </View>
              <Ionicons
                name="arrow-forward"
                size={18}
                className="text-[#E6E6E6]"
              />
            </Pressable>
            <Pressable
              onPress={() => router.navigate("/EnterWeight")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View className="flex flex-row gap-1">
                <Text className="text-white text-[14px] font-bold">
                  Weight (kg):
                </Text>
                <Text className="text-white text-[14px] font-bold">
                  {user.weight ? Number(user.weight) : "Not Set"}
                </Text>
              </View>
              <Ionicons
                name="arrow-forward"
                size={18}
                className="text-[#E6E6E6]"
              />
            </Pressable>
            <Pressable
              onPress={() => router.navigate("/CreatineIntake")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View className="flex flex-row gap-1">
                <Text className="text-white text-[14px] font-bold">
                  Creatine:
                </Text>
                {user.creatine_intake ? (
                  <Text className="text-white text-[14px] font-bold">
                    {Number(user.creatine_intake)}g/day
                  </Text>
                ) : (
                  <Text className="text-white text-[14px] font-bold">
                    Not Set
                  </Text>
                )}
              </View>
              <Ionicons
                name="arrow-forward"
                size={18}
                className="text-[#E6E6E6]"
              />
            </Pressable>
            <Pressable
              onPress={() => router.navigate("/ConnectSmartBottle")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View>
                <Text className="text-white text-[14px] font-bold">
                  Connect Smart Bottle
                </Text>
              </View>
              <Ionicons
                name="arrow-forward"
                size={18}
                className="text-[#E6E6E6]"
              />
            </Pressable>
            <Pressable
              onPress={() => router.navigate("/EnableNotification")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View className="flex flex-row gap-1">
                <Text className="text-white text-[14px] font-bold">
                  Notifications:
                </Text>
                <Text className="text-white text-[14px] font-bold">
                  Enabled
                </Text>
              </View>
              <Ionicons
                name="arrow-forward"
                size={18}
                className="text-[#E6E6E6]"
              />
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              AsyncStorage.clear();
              router.navigate("/Login");
            }}
            className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-sm font-bold text-white text-center">
              Log Out
            </Text>
          </Pressable>
        </View>
      ) : (
        error.length > 0 && (
          <View className="bg-[#B22222] mt-3 p-2 rounded-md">
            <Text className="text-sm text-gray-200">{error}</Text>
          </View>
        )
      )}
    </ScrollView>
  );
};

export default Profile;
