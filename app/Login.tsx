import { View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";

type Props = {};

const login = (props: Props) => {
  return (
    <View className="bg-[#1e1f3f] h-full w-full py-[80px]">
      <Stack.Screen options={{ headerShown: false }} />
      <Text className="text-[20px] font-bold text-white text-center">
        <WaterIcon />HydrationIQ
      </Text>
      <View className="flex flex-col mt-[58px] gap-[60px]">
      <Text className="text-[18px] font-bold text-white text-center">
            Log In
          </Text>
        <View className="flex flex-col justify-center w-full max-w-lg gap-8 mx-auto px-3">
          <View className="relative w-full">
            <TextInput
              className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
              placeholder=""
            />
            <Text className="z-2 text-white text-sm font-light pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all peer-focus:text-gray-400 peer-placeholder-shown:text-sm px-1 peer-focus:px-1 peer-placeholder-shown:px-0 peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
              Email
            </Text>
          </View>
          <View className="relative w-full">
            <TextInput
              secureTextEntry={true}
              className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
              placeholder=""
            />
            <Text className="z-2 text-white text-sm font-light pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all peer-focus:text-gray-400 peer-placeholder-shown:text-sm px-1 peer-focus:px-1 peer-placeholder-shown:px-0 peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
              Password
            </Text>
          </View>
        </View>
        <Pressable className='bg-[#816BFF] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors'>
          <Text className='text-sm font-bold text-white text-center'>Submit</Text>
        </Pressable>
        <View>
        <Link href='/+not-found' className="w-full text-center"><Text className="text-[14px] mx-auto text-white ">Forgot Password?</Text></Link>
    <View className="flex w-full mx-auto justify-center gap-1 flex-row mt-4">
              <Text className="text-[14px] text-white">Don't have an account?</Text>
              <Link href="/SignUp" className="text-[#8BBEFF] text-[14px]">
                Sign Up
              </Link>
            </View>
        </View>
      </View>
    </View>
  );
};

export default login;
