import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Linking,
  Alert,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { useContextState } from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [privacyTextVisible, setPrivacyTextVisible] = useState(false);

  const { token, contextLoading } = useContextState();

  const handleFirstLaunchCheck = async () => {
    if (!contextLoading) {
      if (token) {
        router.navigate("/Dashboard");
        return;
      }

      try {
        const hasLaunchedBefore = await AsyncStorage.getItem("first_launch");
        if (hasLaunchedBefore === "true") {
          setModalVisible(false);
        } else {
          setModalVisible(true);
        }
      } catch (e) {
        console.error("Failed to check first launch status:", e);
        setModalVisible(true);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleFirstLaunchCheck();
    }, [contextLoading, token])
  );

  const handleAcceptPrivacy = async () => {
    setModalVisible(false);
    try {
      await AsyncStorage.setItem("first_launch", "true");
    } catch (e) {
      console.error("Failed to set first launch status:", e);
    }
  };

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px] px-4">
      <View className="w-full max-w-lg mx-auto">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert(
              "Consent Required",
              "You must accept the Privacy Policy to use the app."
            );
          }}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-80">
            {" "}
            <View className="w-full max-w-md py-4 px-6 bg-white rounded-lg mx-4">
              {" "}
              <ScrollView className="max-h-[70vh]">
                {" "}
                <Text className="text-lg font-bold text-gray-900 mb-2">
                  Privacy Policy & GDPR Consent
                </Text>
                <Text className="leading-6 text-justify text-gray-700 text-sm">
                  {" "}
                  By continuing to use this app, you confirm that you have read
                  and understood our Privacy Policy. We collect and process
                  personal data such as your weight, creatine intake, and
                  hydration logs to provide personalized hydration
                  recommendations. This data is stored securely and never shared
                  with third parties without your consent.
                </Text>
                <Text className="leading-6 text-justify mt-3 text-gray-700 text-sm">
                  In accordance with the General Data Protection Regulation
                  (GDPR), you have the right to access, correct, delete, or
                  export your data at any time. You may also withdraw your
                  consent to data processing by deleting your account. By
                  tapping "Accept," you agree to the processing of your data as
                  described.
                </Text>
                {privacyTextVisible && (
                  <View>
                    <Text className="leading-6 text-justify mt-6 text-gray-700 text-sm">
                      This app collects and processes personal data—including
                      hydration logs, creatine intake, weight, and activity
                      level—for the purpose of calculating personalized
                      hydration recommendations. In compliance with the General
                      Data Protection Regulation (GDPR), your data is processed
                      based on your explicit consent and stored securely using
                      encryption and HTTPS. We do not share your data with third
                      parties and do not use it for advertising. You have the
                      right to access, correct, export, or delete your data at
                      any time, and you may withdraw consent by deleting your
                      account. Technical data may be used anonymously to improve
                      app performance. This app is intended for users aged 16
                      and older; we do not knowingly collect personal data from
                      children. By continuing, you confirm that you have read
                      and agreed to this Privacy Policy. For questions or data
                      requests, contact us at:
                    </Text>
                    <Text
                      className="text-blue-600 underline mt-2 text-sm"
                      onPress={() =>
                        Linking.openURL(
                          "mailto:hydrationiq.team@gmail.com"
                        ).catch((err) =>
                          console.error("Failed to open email client:", err)
                        )
                      }
                    >
                      hydrationiq.team@gmail.com
                    </Text>
                  </View>
                )}
              </ScrollView>
              <Pressable
                onPress={handleAcceptPrivacy}
                className="bg-[#448AFF] mt-6 rounded-3xl py-2 w-[200px] mx-auto active:bg-[#2979FF] transition-colors"
              >
                <Text className="text-white text-center">Accept</Text>
              </Pressable>
              <Pressable
                onPress={() => setPrivacyTextVisible(true)}
                className="bg-white mt-2 rounded-3xl py-2 w-[200px] mx-auto border-[1px] border-gray-300 active:border-[#5943d6] transition-colors" // Changed border color
              >
                <Text className="text-gray-800 text-center">
                  View Privacy Policy
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
              className="bg-[#816BFF] mt-6 rounded-3xl py-3 px-20 w-fit mx-auto active:bg-[#735cf5] transition-colors"
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
