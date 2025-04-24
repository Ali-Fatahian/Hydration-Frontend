import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import axios from "axios";

type Props = {};

const ActivityLevel = (props: Props) => {
  const [choice, setChoice] = useState(99);
  const [error, setError] = useState("");
  const router = useRouter();

  const options = [
    "Low (sedentary)",
    "Moderate (Some Exercise)",
    "Hight (Very Active)",
  ];

  const sendData = async (choice: number) => {
    try {
      await axios.post("url", {
        choice,
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formSubmitHandler = () => {
    if (choice > 3 || choice < 0) {
      setError("Please choose one of the options");
    } else {
      sendData(choice);
    }
  };

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[60px] px-1">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          How active are you?
        </Text>
        <View className="overflow-hidden w-full mt-6">
          {options.map((item, index) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setChoice(index);
                setError("");
              }}
              className={`px-4 py-3 transition-colors bg-[#373759] hover:bg-[#313151] active:bg-[#313151] my-2 rounded-lg w-full max-w-lg mx-auto ${
                index !== options.length - 1 ? "border-b border-[#3a3c55]" : ""
              } ${choice === index && "bg-[#57A8FF] hover:bg-[#4e97e5]"}`}
            >
              <Text className="text-gray-200 text-[14px] text-center">
                {item}
              </Text>
            </TouchableOpacity>
          ))}
          {error.length > 0 && (
            <View className="w-full mt-1">
              <View className="bg-[#B22222] p-2 rounded-md w-full max-w-lg mx-auto">
                <Text className="text-sm text-gray-200">{error}</Text>
              </View>
            </View>
          )}
        </View>
        <Pressable
          onPress={formSubmitHandler}
          className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-sm font-bold text-white text-center">
            Continue
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/Dashboard")}
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Cancel
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ActivityLevel;
