import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { Stack, useRouter } from "expo-router";

type Props = {};
type Gender = "Male" | "Female";

const EnterGender = (props: Props) => {
  const [selectedGender, setSelectedGender] = useState<Gender>("Male");
  const router = useRouter();

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
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
          {(["Male", "Female"] as Gender[]).map((gender) => (
            <Pressable key={gender} onPress={() => setSelectedGender(gender)}>
              <Text
                className={`cursor-pointer ${
                  selectedGender === gender ? "bg-[#448AFF]" : "bg-[#2D2F4E]"
                } text-white rounded-lg py-3 px-10 w-fit mx-auto hover:bg-[#2979FF] active:bg-[#5943d6] transition-colors`}
              >
                {gender}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={() => router.navigate("/Dashboard")}
          className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 mt-10 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-[14px] font-bold text-white text-center">
            Continue
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/Profile")} // router.back() ||
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Cancel
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default EnterGender;
