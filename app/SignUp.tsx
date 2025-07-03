import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import React, { useCallback, useState } from "react";
import { Link, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import axios from "axios";
import Loader from "@/assets/Loader";
import { useFocusEffect } from "@react-navigation/native";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { useContextState } from "./Context";

type Props = {};

const baseURL = "http://localhost:8000/api/";

const SignUp = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  const router = useRouter();

  const { token, contextLoading } = useContextState();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError("");
    // setMessage("")
  };

  const handleFullnameChange = (value: string) => {
    setFullname(value);
    setError("");
    // setMessage("")
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setError("");
    // setMessage("")
  };

  const sendData = async (
    fullname: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}register`, {
        fullname,
        email,
        password,
      });
      if (response.status === 201) {
        // setMessage(response.data);
        router.push("/Login");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formSubmitHandler = () => {
    if (email.length > 0 && password.length > 0 && fullname.length > 0) {
      sendData(fullname, email, password);
    } else {
      setError("Please fill out all the fields.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!contextLoading) {
        if (token) {
          router.navigate("/Dashboard");
          return;
        }
      }
    }, [contextLoading, token])
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
        <View className="flex flex-col mt-[58px]">
          <Text className="text-[18px] font-bold text-white text-center">
            Sign Up
          </Text>
          <View className="flex flex-col justify-center w-full max-w-lg gap-10 mx-auto mt-10">
            <View className="relative w-full">
              <FloatingLabelInput
                value={fullname}
                onChangeText={handleFullnameChange}
                label="Full Name"
                multiline={Platform.OS === "ios" || Platform.OS === "android"}
              />
            </View>
            <View className="relative w-full">
              <FloatingLabelInput
                value={email}
                onChangeText={handleEmailChange}
                label="Email"
                multiline={Platform.OS === "ios" || Platform.OS === "android"}
                keyboardType="email-address"
              />
            </View>
            <View className="relative w-full">
              <FloatingLabelInput
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={true}
                label="Password"
                classes="h-[48px]"
              />
            </View>
          </View>
          {error.length > 0 && (
            <View className="bg-[#B22222] p-2 rounded-md mt-6">
              <Text className="text-sm text-gray-200">{error}</Text>
            </View>
          )}
          {/* {message.length > 0 && (
            <View className="bg-[#3CB371] mt-6 p-2 rounded-md">
              <Text className="text-sm text-gray-200">{message}</Text>
            </View>
          )} */}
          {loading && <Loader className="mt-4" />}
          <Pressable
            onPress={formSubmitHandler}
            className="bg-[#816BFF] rounded-3xl mt-8 py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-sm font-bold text-white text-center">
              Register
            </Text>
          </Pressable>
          <View className="flex w-full mx-auto justify-center gap-1 flex-row mt-6">
            <Text className="text-[14px] text-white">
              Already have an account?
            </Text>
            <Link href="/Login" className="text-[#8BBEFF] text-[14px]">
              Log In
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
