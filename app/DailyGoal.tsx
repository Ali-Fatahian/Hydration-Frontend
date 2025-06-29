import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import { useContextState } from "./Context";

type Props = {};

const DailyGoal = (props: Props) => {
  const [userConsumption, setUserConsumption] = useState("");
  const [dailyGoal, setDailyGoal] = useState<{
    id: string;
    user_water_intake: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { token, contextLoading, setShouldRefreshDashboard } =
    useContextState();

  const router = useRouter();

  const handleInputChange = (value: string) => {
    setUserConsumption(value);
    setError("");
    setMessage("");
  };

  const sendData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(
        `water_intake_details/${dailyGoal?.id}`,
        {
          user_water_intake: userConsumption,
        }
      );
      setShouldRefreshDashboard(new Date().toString());
      if (response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const formSubmitHandler = () => {
    if (userConsumption && userConsumption.length > 0) {
      if (!isNaN(Number(userConsumption))) {
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
      const response = await axiosInstance.get("water_intake");
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
    if (!contextLoading) {
      if (!token) {
        router.navigate("/Login");
        return;
      }
    }
    fetchDailyGoal();
  }, [contextLoading, token]);

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px]">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          Water Intake
        </Text>
        <View className="w-full mt-[50] px-2">
          <TextInput
            className='w-full max-w-lg mx-auto peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"'
            keyboardType="numeric"
            placeholder={
              dailyGoal?.user_water_intake
                ? String(Number(dailyGoal.user_water_intake))
                : `Enter your today's water intake(ml)`
            }
            placeholderTextColor={"#9CA3AF"}
            value={userConsumption}
            onChange={(e: any) => handleInputChange(e.target.value)}
          />
          {error && error.length > 0 && (
            <View className="w-full mt-3">
              <View className="bg-[#B22222] p-2 rounded-md w-full max-w-lg mx-auto">
                <Text className="text-sm text-gray-200">{error}</Text>
              </View>
            </View>
          )}
          {message.length > 0 && (
            <View className="bg-[#3CB371] mt-3 p-2 rounded-md">
              <Text className="text-sm text-gray-200">{message}</Text>
            </View>
          )}
          <View className="bg-[#565967] px-5 py-4 rounded-lg mt-4">
            <View className="">
              {/* <Ionicons
                name="bulb"
                color={"#FBC02D"}
                size={15}
                className="inline-block"
              /> */}
              {/* <Text className="text-[#afafc1] font-light text-xs mt-3">
                <Text className="font-bold">How to calculate:</Text> Water
                intake (in ounces) = Body weight (in pounds) × 0.5
              </Text> */}
              {/* <Text className="text-[#afafc1] font-light text-xs mt-2">
                For example, If you weigh 150 pounds: 150lbs × 0.5 = 75 ounces
              </Text> */}
              {/* <Text className="text-[#afafc1] font-light text-xs mt-4">
                <Text className="font-bold">Exercise:</Text> Add 12–16 ounces
                for every 30 minutes of activity.
              </Text> */}
              <Text className="text-[#afafc1] font-light text-xs inline-block">
                Only use this if you are not using a connected water bottle.
              </Text>
            </View>
          </View>
          {loading && <Loader className="mt-4" />}
          <Pressable
            onPress={formSubmitHandler}
            className="bg-[#816BFF] mt-6 rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-sm font-bold text-white text-center">
              Submit
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/Dashboard")}
            className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
          >
            Back
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default DailyGoal;
