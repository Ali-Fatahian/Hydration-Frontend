import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { useRouter } from "expo-router";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContextState } from "./Context";

type Props = {};

const EnterGender = (props: Props) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [userId, setUserId] = useState<null | string>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { token, contextLoading } = useContextState();

  const fetchUserInfo = async () => {
    try {
      const userId = await AsyncStorage.getItem("id");
      setUserId(userId);
      const response = await axiosInstance.get(`users/${userId}`);
      if (response.status === 200) {
        setSelectedGender(response.data["gender"]);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  const sendData = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch(`users/${userId}`, {
        gender: selectedGender.toLowerCase(),
      });
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formSubmitHandler = () => {
    if (
      selectedGender === "male" ||
      (selectedGender === "female" && userId !== null)
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
    fetchUserInfo();
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
          {selectedGender.length > 0 &&
            ["male", "female"].map((gender) => (
              <Pressable
                key={gender}
                onPress={() => {
                  setError("");
                  setSelectedGender(gender);
                }}
              >
                <Text
                  className={`cursor-pointer ${
                    selectedGender === gender ? "bg-[#448AFF]" : "bg-[#2D2F4E]"
                  } text-white rounded-lg py-3 px-10 w-fit mx-auto hover:bg-[#2979FF] active:bg-[#5943d6] transition-colors`}
                >
                  {`${gender.slice(0, 1).toUpperCase()}${gender.slice(1)}`}
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
          Back
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EnterGender;
