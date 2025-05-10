import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { Link, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/assets/Loader";
import { useFocusEffect } from "@react-navigation/native";
import FloatingLabelInput from "@/components/FloatingLabelInput";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
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
    // setMessage("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setError("");
    // setMessage("");
  };

  const sendData = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        // http://192.168.178.101:8000 for phone on the same network
        email,
        password,
      });
      if (response.status === 200) {
        // setMessage(response.data);
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data["token"])
        );
        await AsyncStorage.setItem("id", JSON.stringify(response.data["id"]));
        router.push("/Dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formSubmitHandler = () => {
    if (email.length > 0 && password.length > 0) {
      sendData(email.toLowerCase(), password);
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
    <ScrollView className="bg-[#1e1f3f] h-full w-full px-4 py-[50px]">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center">
            HydrationIQ
          </Text>
        </View>
        <View className="flex flex-col mt-[58px] gap-4">
          <Text className="text-[18px] font-bold text-white text-center">
            Log In
          </Text>
          <View className="flex flex-col mt-10 justify-center w-full max-w-lg gap-10 mx-auto">
            <View className="relative w-full">
              <FloatingLabelInput
                label="Email"
                keyboardType="email-address"
                onChangeText={handleEmailChange}
                value={email}
                multiline={true}
              />
            </View>
            <View className="relative w-full">
              <FloatingLabelInput
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
                label="Password"
                keyboardType="default"
              />
            </View>
          </View>
          {error.length > 0 && (
            <View className="bg-[#B22222] p-2 rounded-md">
              <Text className="text-sm text-gray-200">{error}</Text>
            </View>
          )}
          {/* {message.length > 0 && (
            <View className="bg-[#3CB371] p-2 rounded-md">
              <Text className="text-sm text-gray-200">{message}</Text>
            </View>
          )} */}
          {loading && <Loader className="mt-2" />}
          <Pressable
            onPress={formSubmitHandler}
            className="bg-[#816BFF] mt-6 rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-sm font-bold text-white text-center">
              Submit
            </Text>
          </Pressable>
          <View className="mt-4">
            <Link href="/PasswordResetRequest" className="w-full text-center">
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
