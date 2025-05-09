import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/assets/Loader";
import { useFocusEffect } from "@react-navigation/native";

type Props = {};

const PasswordResetRequest = (props: Props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      router.navigate("/Dashboard");
      return;
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError("");
  };

  const sendData = async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.178.101:8000/api/password_reset", {
          email
        })
      if (response.status === 200) {
        setMessage(response.data["message"]);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formSubmitHandler = () => {
    if (email.length > 0) {
      sendData(email.toLowerCase());
    } else {
      setError("Please fill out all the fields.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAuth();
    }, [])
  );

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[80px]">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center">
            HydrationIQ
          </Text>
        </View>
        <View className="flex flex-col mt-[58px] gap-4">
          <Text className="text-[18px] font-bold text-white text-center">
            Reset Your Password
          </Text>
          <View className="flex flex-col mt-6 justify-center w-full max-w-lg gap-8 mx-auto">
            <View className="relative w-full">
              <TextInput
                onChangeText={handleEmailChange}
                value={email}
                className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
                placeholder=""
              />
              <Text className="z-2 text-white text-sm font-light pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all peer-focus:text-gray-400 peer-placeholder-shown:text-sm px-1 peer-focus:px-1 peer-placeholder-shown:px-0 peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                Email
              </Text>
            </View>
          </View>
          {error.length > 0 && (
            <View className="bg-[#B22222] p-2 rounded-md">
              <Text className="text-sm text-gray-200">{error}</Text>
            </View>
          )}
          {message.length > 0 && (
            <View className="bg-[#3CB371] p-2 rounded-md">
              <Text className="text-sm text-gray-200">{message}</Text>
            </View>
          )}
          {loading && <Loader className="mt-2" />}
          <Pressable
            onPress={formSubmitHandler}
            className="bg-[#816BFF] mt-6 rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-sm font-bold text-white text-center">
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default PasswordResetRequest;
