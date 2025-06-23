import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { useContextState } from "./Context";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();

  const { token, contextLoading } = useContextState();

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
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px] px-4">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex flex-col justify-between h-[100%]">
          <View className="flex flex-col justify-center [&>*]:text-center gap-[70px]">
            <View className="flex justify-center w-full flex-row gap-1">
              <WaterIcon />
              <Text className="text-[20px] font-bold text-white">
                HydrationIQ
              </Text>
            </View>
            <Text className="text-[20px] font-bold text-white">
              Welcome to HydrateIQ
            </Text>
            <Text className="font-light text-[#C9C9E3]">
              Your AI-driven hydration assistant
            </Text>
          </View>
          <View className="w-full">
            <Pressable
              onPress={() => router.navigate("/Login")}
              className="bg-[#816BFF] mt-6 rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
            >
              <Text className="text-[18px] font-bold text-white text-center">
                Get Started
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;
