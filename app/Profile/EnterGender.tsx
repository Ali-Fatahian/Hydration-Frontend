import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { useRouter } from "expo-router";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContextState } from "../Context";

type Props = {};

const EnterGender = (props: Props) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [userSafe, setUserSafe] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    token,
    contextLoading,
    user,
    updateUserInContext,
    updateUserInStorage,
    setShouldRefreshDashboard,
  } = useContextState();

  const sendData = async () => {
    if (!userSafe?.id) return setError("No user ID found.");
    setLoading(true);
    try {
      await axiosInstance.patch(`users/${userSafe.id}`, {
        gender: selectedGender.toLowerCase(),
      });
      const updatedUser = {
        ...userSafe,
        gender: selectedGender.toLowerCase(),
      };
      updateUserInContext(updatedUser);
      await updateUserInStorage(updatedUser);
      setShouldRefreshDashboard(new Date().toString());
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formSubmitHandler = () => {
    if (
      selectedGender === "male" ||
      (selectedGender === "female" && userSafe !== null)
    ) {
      sendData();
    } else {
      setError("Invalid data!");
    }
  };

  useEffect(() => {
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
            setSelectedGender(parsed.gender || "");
          }
        } else {
          setUserSafe(user);
          setSelectedGender(user.gender || "");
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUserFromStorage();
  }, [contextLoading, token]);

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px] px-2">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          Gender
        </Text>
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Please choose and click continue
        </Text>
        <View className="flex flex-col min-[270px]:flex-row gap-4 mt-10 max-w-sm mx-auto">
          {["male", "female"].map((gender) => (
            <Pressable key={gender}>
              <Text
                onPress={() => {
                  setError("");
                  setSelectedGender(gender);
                }}
                className={`cursor-pointer ${
                  selectedGender &&
                  selectedGender.length > 0 &&
                  selectedGender === gender
                    ? "bg-[#448AFF]"
                    : "bg-[#2D2F4E]"
                } text-white rounded-lg py-3 px-10 w-fit mx-auto hover:bg-[#2979FF] transition-colors`}
              >
                {`${gender.charAt(0).toUpperCase() + gender.slice(1)}`}
              </Text>
            </Pressable>
          ))}
        </View>
        {error.length > 0 && (
          <View className="bg-[#B22222] p-2 rounded-md mt-6">
            <Text className="text-sm text-gray-200">{error}</Text>
          </View>
        )}
        {loading && <Loader className="mt-6" />}
        <Pressable
          onPress={() => formSubmitHandler()}
          className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 mt-10 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-[14px] font-bold text-white text-center">
            Submit
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/Profile")}
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          <Text className="text-[14px] font-bold text-white text-center">
            Back
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EnterGender;
