import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { Pressable, TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const DailyGoal = (props: Props) => {
  const [dailyGoal, setDailyGoal] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (value: string) => {
    setDailyGoal(value);
    setError("");
  };

  const sendData = async () => {
    try {
      await axios.post("url", {});
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formSubmitHandler = () => {
    if (dailyGoal && dailyGoal.length > 0) {
      if (!isNaN(Number(dailyGoal))) {
        // typeof Number('asdf') does not work
        sendData();
      } else {
        setError("You must type in numbers.");
      }
    } else {
      setError("The field must not be empty.");
    }
  };

  const fetchDailyGoal = async () => {
    try {
      const response = await axios.get("url", {});
      if (response.status === 200) {
        setDailyGoal(response.data);
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // fetchDailyGoal()
  }, []);

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[60px]">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          Set your daily goal
        </Text>
        <View className="w-full mt-[50] px-2">
          <TextInput
            className='w-full max-w-lg mx-auto peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"'
            keyboardType="numeric"
            placeholder="Enter your daily goal(ml)"
            value={dailyGoal}
            onChange={(e: any) => handleInputChange(e.target.value)}
          />
          {error && error.length > 0 && (
            <View className="w-full mt-3">
              <View className="bg-[#B22222] p-2 rounded-md w-full max-w-lg mx-auto">
                <Text className="text-sm text-gray-200">{error}</Text>
              </View>
            </View>
          )}
          <View className="bg-[#565967] px-5 py-4 rounded-lg mt-4">
            <View className="">
              <Ionicons
                name="bulb"
                color={"#FBC02D"}
                size={15}
                className="mr-2"
              />
              <Text className="text-[#afafc1] font-light text-xs mt-3">
                <Text className="font-bold">How to calculate:</Text> Water
                intake (in ounces) = Body weight (in pounds) × 0.5
              </Text>
              <Text className="text-[#afafc1] font-light text-xs mt-2">
                For example, If you weigh 150 pounds: 150lbs × 0.5 = 75 ounces
              </Text>
              <Text className="text-[#afafc1] font-light text-xs mt-4">
                <Text className="font-bold">Exercise:</Text> Add 12–16 ounces
                for every 30 minutes of activity.
              </Text>
              <Text className="text-[#afafc1] font-light text-xs mt-4">
                <Text className="font-bold">Heat:</Text> If you're in a hot
                climate, aim to drink more to compensate for water lost through
                sweat.
              </Text>
            </View>
          </View>
          <Pressable
            onPress={formSubmitHandler}
            className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-sm font-bold text-white text-center">
              Continue
            </Text>
          </Pressable>
          <Link
            href="/Dashboard"
            className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
          >
            Cancel
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default DailyGoal;
