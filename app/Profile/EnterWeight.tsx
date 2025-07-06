import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import { useContextState } from "../Context";

type Props = {};

const EnterWeight = (props: Props) => {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [userSafe, setUserSafe] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    token,
    contextLoading,
    user,
    setShouldRefreshDashboard,
    updateUserInContext,
    updateUserInStorage,
  } = useContextState();

  const sendData = async () => {
    setLoading(true);
    try {
      const userId = userSafe?.id ?? (await AsyncStorage.getItem("id"));
      const response = await axiosInstance.patch(`users/${userId}`, {
        weight,
      });
      const updatedUser = {
        ...userSafe,
        weight: weight,
      };
      updateUserInContext(updatedUser);
      await updateUserInStorage(updatedUser);
      setShouldRefreshDashboard(new Date().toString());

      if (response.status === 200) {
        setMessage(
          `Successfully set to ${String(Number(response.data["weight"]))}`
        );
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formSubmitHandler = () => {
    if (weight && weight.length > 0) {
      if (!isNaN(Number(weight))) {
        sendData();
      } else {
        setError("You must type in numbers.");
      }
    } else {
      setError("The field must not be empty.");
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
          }
        } else {
          setUserSafe(user);
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
          Weight
        </Text>
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Please enter your weight in kg and click submit
        </Text>
        <View className="mt-10 w-full max-w-sm mx-auto relative">
          <TextInput
            className="transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light pr-5 pl-9 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
            placeholder="Weight..."
            keyboardType="numeric"
            placeholderTextColor={"#B0B0C3"}
            value={weight}
            onChangeText={(text: string) => {
              setWeight(text);
              setError("");
              setMessage("");
            }}
          />
          {error.length > 0 && (
            <View className="bg-[#B22222] mt-3 p-2 rounded-md">
              <Text className="text-sm text-gray-200">{error}</Text>
            </View>
          )}
          {message.length > 0 && (
            <View className="bg-[#3CB371] mt-3 p-2 rounded-md">
              <Text className="text-sm text-gray-200">{message}</Text>
            </View>
          )}
          {loading && <Loader className="mt-4 mb-[-20px]" />}
        </View>
        <Pressable
          onPress={() => formSubmitHandler()}
          className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 mt-10 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-[14px] font-bold text-white text-center">
            Submit
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.navigate("/Profile")}
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

export default EnterWeight;
