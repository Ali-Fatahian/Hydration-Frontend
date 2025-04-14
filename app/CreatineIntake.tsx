import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import BottleIcon from "@/assets/BottleIcon";

type Props = {};

const CreatineIntake = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter()

  return (
    <View className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full max-w-lg mx-auto">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <Text className="p-2 pb-0 bg-white">This is a modal!</Text> // This
          will open an input field for the amount of creatine intake
          <Pressable
            onPress={() => setModalVisible(false)}
            className="cursor-pointer p-2 pt-0 bg-white"
          >
            <Text className="hover:underline">Close</Text>
          </Pressable>
        </Modal>
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          Creatine Intake
        </Text>
        <Text className="text-center mt-10 text-[#C9C9E3] text-[14px]">
          Enter your daily creatine intake to help us personalize hydration and
          supplement tips
        </Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          className="mt-5 p-3 rounded-lg bg-[#2D2F50] hover:bg-[#373964] transition-colors cursor-pointer"
        >
          <Text className="text-white font-bold text-[14px]">
            Enter amount (g/day)
          </Text>
          <Text className="text-white text-[12px] font-light mt-2">
            Most users take 3-5g/day
          </Text>
        </Pressable>
        <View className="bg-[#2E2E5D] px-3 py-5 flex flex-col gap-6 rounded-lg mt-10">
          <View className="flex flex-row justify-between items-center gap-4 w-full max-w-[300px] mx-auto">
            <BottleIcon />
            <View className="flex flex-col gap-2">
              <Text className="text-white text-[14px] font-bold">
                HydrateFuel Creatine
              </Text>
              <Text className="text-white text-[14px] font-light">
                Recommended for beginners
              </Text>
            </View>
          </View>
          <Pressable className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors">
            <Text className="text-[14px] font-bold text-white text-center">
              Shop
            </Text>
          </Pressable>
        </View>
        <Pressable className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors">
          <Text className="text-sm font-bold text-white text-center">
            Continue
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/Profile')} // router.back() ||
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Back
        </Pressable>
      </View>
    </View>
  );
};

export default CreatineIntake;
