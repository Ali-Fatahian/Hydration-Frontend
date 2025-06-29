import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { router } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useContextState } from "../Context";


const Profile = () => {
  const [error, setError] = useState("");
  const [userSafe, setUserSafe] = useState<any>(null);
  const defaultImage = require("../../assets/images/default-profile.png");
  const IMAGE_BASE = 'http://localhost:8000'

  const { token, contextLoading, user, shouldRefreshDashboard } =
    useContextState();

  const hasRemoteImage =
    !!userSafe?.picture && userSafe.picture.trim().length > 0;
  useFocusEffect(
    useCallback(() => {
      if (!contextLoading) {
        if (!token) {
          router.navigate("/Login");
          return;
        }
      }
      const loadUserFromStorage = async () => {
        try {
          if (!user) {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
              const parsed = JSON.parse(storedUser);
              setUserSafe(parsed);
            }
          } else {
            setUserSafe(user);
          }
        } catch (err) {
          console.error(setError("Failed to load user."));
        }
      };

      loadUserFromStorage();
      console.log(`${IMAGE_BASE}${userSafe?.picture}`)
    }, [contextLoading, token, shouldRefreshDashboard])
  );

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
      {userSafe && error.length === 0 ? (
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
              source={hasRemoteImage ? { uri: `${IMAGE_BASE}${userSafe?.picture}` } : defaultImage}
            />
            <Text className="text-[14px] font-bold text-gray-400">
              {userSafe.email}
            </Text>
          </View>
          <View className="flex flex-col gap-2 items-center mt-3">
            <Pressable
              onPress={() => router.navigate("/Profile/PersonalInformation")}
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
              onPress={() => router.navigate("/Profile/EnterGender")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View className="flex flex-row gap-1">
                <Text className="text-white text-[14px] font-bold">
                  Gender:
                </Text>
                <Text className="text-white text-[14px] font-bold">
                  {userSafe.gender
                    ? `${userSafe.gender
                        .slice(0, 1)
                        .toUpperCase()}${userSafe.gender.slice(1)}`
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
              onPress={() => router.push("/Profile/EnterWeight")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View className="flex flex-row gap-1">
                <Text className="text-white text-[14px] font-bold">
                  Weight (kg):
                </Text>
                <Text className="text-white text-[14px] font-bold">
                  {userSafe.weight ? Number(userSafe.weight) : "Not Set"}
                </Text>
              </View>
              <Ionicons
                name="arrow-forward"
                size={18}
                className="text-[#E6E6E6]"
              />
            </Pressable>
            <Pressable
              onPress={() => router.navigate("/Profile/EnterActivityLevel")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View className="flex flex-row gap-1">
                <Text className="text-white text-[14px] font-bold">
                  Activity Level:
                </Text>
                <Text className="text-white text-[14px] font-bold">
                  {userSafe.activity ? userSafe.activity : "Not Set"}
                </Text>
              </View>
              <Ionicons
                name="arrow-forward"
                size={18}
                className="text-[#E6E6E6]"
              />
            </Pressable>
            <Pressable
              onPress={() => router.navigate("/Profile/CreatineIntake")}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <View className="flex flex-row gap-1">
                <Text className="text-white text-[14px] font-bold">
                  Creatine:
                </Text>
                {userSafe.creatine_intake ? (
                  <Text className="text-white text-[14px] font-bold">
                    {Number(userSafe.creatine_intake)}g/day
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
