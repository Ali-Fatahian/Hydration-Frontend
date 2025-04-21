import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import axios from "axios";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setError("");
  };

  const sendData = async (email: string, password: string) => {
    try {
      await axios.post("url", {
        email,
        password,
      });
      router.navigate("/Dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formSubmitHandler = () => {
    if (email.length > 0 && password.length > 0) {
      sendData(email, password);
    } else {
      setError("Please fill out all the fields.");
    }
  };

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[80px]">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center">
            HydrationIQ
          </Text>
        </View>
        <View className="flex flex-col mt-[58px] gap-[60px]">
          <Text className="text-[18px] font-bold text-white text-center">
            Log In
          </Text>
          <View className="flex flex-col justify-center w-full max-w-lg gap-8 mx-auto px-3">
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
            <View className="relative w-full">
              <TextInput
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
                className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
                placeholder=""
              />
              <Text className="z-2 text-white text-sm font-light pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all peer-focus:text-gray-400 peer-placeholder-shown:text-sm px-1 peer-focus:px-1 peer-placeholder-shown:px-0 peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                Password
              </Text>
            </View>
            {error.length > 0 && (
              <View className="bg-[#B22222] p-2 rounded-md">
                <Text className="text-sm text-gray-200">{error}</Text>
              </View>
            )}
          </View>
          <Pressable
            onPress={formSubmitHandler}
            className="bg-[#816BFF] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-sm font-bold text-white text-center">
              Submit
            </Text>
          </Pressable>
          <View>
            <Link href="/+not-found" className="w-full text-center">
              <Text className="text-[14px] mx-auto text-white ">
                Forgot Password?
              </Text>
            </Link>
            <View className="flex w-full mx-auto justify-center gap-1 flex-row mt-4">
              <Text className="text-[14px] text-white">
                Don't have an account?
              </Text>
              <Link href="/SignUp" className="text-[#8BBEFF] text-[14px]">
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
