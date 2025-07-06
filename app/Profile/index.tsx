import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Platform,
  Modal,
} from "react-native";
import * as Sharing from "expo-sharing";
import React, { useCallback, useState } from "react";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useContextState } from "../Context";
import axiosInstance from "@/axiosInstance";

const Profile = () => {
  const [error, setError] = useState("");
  const [downloadError, setDownloadError] = useState<string>("");
  const [userSafe, setUserSafe] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteUserError, setDeleteUserError] = useState("");
  const defaultImage = require("../../assets/images/default-profile.png");
  const IMAGE_BASE =
    Platform.OS === "web" || Platform.OS === 'ios'
      ? "http://localhost:8000"
      : "http://192.168.178.101:8000";

  const { token, contextLoading, user, shouldRefreshDashboard, logout } =
    useContextState();

  const downloadCSV = async () => {
    setDownloadError("");
    try {
      const response = await axiosInstance.get("user_details_csv");

      if (response.status !== 200) {
        setDownloadError("Something went wrong, please try again!");
      }

      if (Platform.OS === "web") {
        // On web, get CSV as text and create downloadable link
        const csv = response.data;
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "user_info.csv";
        anchor.click();

        URL.revokeObjectURL(url);
      } else {
        // On mobile, save to local file system and share
        const csv = response.data;
        const uri = FileSystem.documentDirectory + "user_info.csv";
        await FileSystem.writeAsStringAsync(uri, csv, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        await Sharing.shareAsync(uri);
      }
    } catch (error: any) {
      setDownloadError("Error downloading the CSV file!");
    }
  };

  const deleteUser = async () => {
    try {
      setDeleteUserError("");
      setModalVisible(false);
      const response = await axiosInstance.delete("delete_user");
      if (response.status === 204) {
        logout();
        router.navigate("/Login");
      } else {
        setDeleteUserError("Something went wrong, please try again!");
      }
    } catch (err: any) {
      setDeleteUserError(err.message);
    }
  };

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
              source={
                hasRemoteImage
                  ? { uri: `${IMAGE_BASE}${userSafe?.picture}` }
                  : defaultImage
              }
            />
            <Text className="text-[14px] font-bold text-gray-400">
              {userSafe.email}
            </Text>
          </View>
          <View className="flex flex-col gap-2 items-center mt-3">
            {modalVisible && (
              <View className="z-10 absolute left-0 top-0 w-full h-full bg-[#00000061]"></View>
            )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {}}
              className="z-20"
            >
              <View className="w-full max-w-md m-auto py-4 px-6 bg-white rounded-sm">
                <View>
                  <ScrollView className="max-h-[400px]">
                    <Text className="leading-8 text-justify mt-3">
                      Are you sure? After clicking on "Delete", you will lose
                      all your data.
                    </Text>
                  </ScrollView>
                  <Pressable
                    onPress={() => deleteUser()}
                    className="bg-[#ff2626] mt-6 rounded-3xl py-2 px-4 w-fit mx-auto hover:bg-[#e01616] transition-colors"
                  >
                    <Text className="text-white text-center">Accept</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setModalVisible(false);
                      setDeleteUserError("");
                    }}
                    className="bg-white mt-2 rounded-3xl py-2 px-4 w-fit mx-auto border-[1px] border-white hover:border-[#333] transition-colors"
                  >
                    <Text className="text-center">Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
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
                color="#E6E6E6"
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
                color="#E6E6E6" 
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
                color="#E6E6E6" 
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
                color="#E6E6E6" 
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
                color="#E6E6E6" 
              />
            </Pressable>
            {/* <Pressable
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
                color="#E6E6E6" 
              />
            </Pressable> */}
            {/* <Pressable
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
                color="#E6E6E6" 
              />
            </Pressable> */}
            <Pressable
              onPress={() => downloadCSV()}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <Text className="text-white text-[14px] font-bold">
                Download CSV
              </Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#E6E6E6" 
              />
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(true)}
              className="bg-[#2E2E4D] p-3 flex flex-row justify-between items-center w-full rounded-md cursor-pointer transition-colors hover:bg-[#36366c]"
            >
              <Text className="text-white text-[14px] font-bold">
                Delete Account
              </Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#E6E6E6" 
              />
            </Pressable>
            {downloadError && downloadError.length > 0 && (
              <View className="bg-[#B22222] mt-3 p-2 rounded-md">
                <Text className="text-sm text-gray-200">{downloadError}</Text>
              </View>
            )}
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
      {deleteUserError && deleteUserError.length > 0 && (
        <View className="bg-[#B22222] mt-3 p-2 rounded-md">
          <Text className="text-sm text-gray-200">{deleteUserError}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;
