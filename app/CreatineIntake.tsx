import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import WaterIcon from "@/assets/WaterIcon";
import BottleIcon from "@/assets/BottleIcon";
import axios from "axios";

type Props = {};

const CreatineIntake = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [creatineIntake, setCreatineIntake] = useState("");
  const [backendIntakeVal, setBackendIntakeVal] = useState("");
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const sendData = async () => {
    try {
      const response = await axios.post("url", {});
      if (response.status === 200) {
        setMessage(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formSubmitHandler = () => {
    if (creatineIntake && creatineIntake.length > 0) {
      if (!isNaN(Number(creatineIntake))) {
        sendData();
      } else {
        setError("You must type in numbers.");
      }
    } else {
      setError("The field must not be empty.");
    }
  };

  const fetchCreatineIntake = async () => {
    try {
      const response = await axios.get("url", {});
      if (response.status === 200) {
        setCreatineIntake(response.data);
        setBackendIntakeVal(response.data);
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // fetchCreatineIntake()
  }, []);

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full max-w-lg mx-auto">
        <Modal
          animationType="slide"
          transparent={false}
          visible={isWebViewVisible}
          onRequestClose={() => setIsWebViewVisible(false)}
        >
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: "https://google.com" }}
              style={{ flex: 1 }}
            />
            {/* Close Button to return to the main page */}
            <Pressable
              style={{
                position: "absolute",
                top: 40,
                left: 20,
                backgroundColor: "#FF6347",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
              onPress={() => setIsWebViewVisible(false)}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
            </Pressable>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <View className="flex-1 justify-center items-center bg-opacity-80 bg-black">
            <View className="bg-[#2E2E5D] p-6 rounded-lg w-[90%] max-w-lg">
              <Text className="text-white text-lg font-bold mb-4">
                Enter Creatine Intake (g/day)
              </Text>

              <TextInput
                className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
                placeholder="e.g. 3"
                placeholderTextColor="#C9C9E3"
                keyboardType="numeric"
                onChangeText={(v) => {
                  setError("");
                  setCreatineIntake(v);
                }}
                value={creatineIntake}
              />
              {error.length > 0 && (
                <View className="bg-[#B22222] mt-3 p-2 rounded-md">
                  <Text className="text-sm text-gray-200">{error}</Text>
                </View>
              )}
              {message.length > 0 && (
                <View className="bg-[#3CB371] mt-3 p-2 rounded-md">
                  <Text className="text-sm text-gray-200">{message}</Text>
                </View>
              )}
              <Pressable
                onPress={() => {
                  formSubmitHandler();
                }}
                className="mt-4 py-2 hover:bg-[#448AFF] bg-[#2979FF] transition-colors rounded-lg w-full"
              >
                <Text className="text-white text-center font-semibold">
                  Submit
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="mt-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors rounded-lg w-full"
              >
                <Text className="text-white text-center font-semibold">
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
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
            Enter amount (g/day){" "}
            {backendIntakeVal && backendIntakeVal.length > 0 && (
              <Text className="text-xs text-gray-400 font-normal">
                Currently: {backendIntakeVal}g
              </Text>
            )}
          </Text>
          <Text className="text-white text-[12px] font-light mt-2">
            Most users take 3-5g/day
          </Text>
        </Pressable>
        <View className="bg-[#2E2E5D] px-3 py-5 flex flex-col gap-6 rounded-lg mt-10">
          <View className="flex flex-row justify-between items-center gap-4 w-full max-w-[300px] mx-auto">
            <BottleIcon height={70} width={70} fill={"white"} />
            <View className="flex flex-col gap-2">
              <Text className="text-white text-[14px] font-bold">
                HydrateFuel Creatine
              </Text>
              <Text className="text-white text-[14px] font-light">
                Recommended for beginners
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => setIsWebViewVisible(true)}
            className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-[14px] font-bold text-white text-center">
              Shop
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => router.push("/Profile")}
          className="text-white font-bold mt-6 text-center hover:underline active:underline"
        >
          Back
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CreatineIntake;
