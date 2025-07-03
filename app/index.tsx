import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Linking,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import { useContextState } from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const Index = (props: Props) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(true);
  const [privacyVisible, setPrivacyVisible] = useState(false);

  const { token, contextLoading } = useContextState();
  const checkForFirsLaunch = async () => {
    const res = await AsyncStorage.getItem("first_launch");
    if (!!res) {
      router.navigate("/Login");
    } else {
      AsyncStorage.setItem("first_launch", "True");
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
      checkForFirsLaunch();
    }, [contextLoading, token])
  );

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px] px-4">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex flex-col justify-between h-[100%]">
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {}}
          >
            <View className="w-full max-w-md m-auto py-4 px-6 bg-white rounded-sm">
              <View>
                <ScrollView className="max-h-[400px]">
                  <Text className="text-lg font-bold">
                    Privacy Policy & GDPR Consent
                  </Text>
                  <Text className="leading-8 text-justify">
                    By continuing to use this app, you confirm that you have
                    read and understood our Privacy Policy. We collect and
                    process personal data such as your weight, creatine intake,
                    and hydration logs to provide personalized hydration
                    recommendations. This data is stored securely and never
                    shared with third parties without your consent.
                  </Text>
                  <Text className="leading-8 text-justify mt-3">
                    In accordance with the General Data Protection Regulation
                    (GDPR), you have the right to access, correct, delete, or
                    export your data at any time. You may also withdraw your
                    consent to data processing by deleting your account. By
                    tapping "Accept," you agree to the processing of your data
                    as described.
                  </Text>
                  <Text
                    className={`leading-8 text-justify mt-6 text-gray-700 ${
                      privacyVisible ? "flex" : "hidden"
                    } `}
                  >
                    This app collects and processes personal data—including
                    hydration logs, creatine intake, weight, and activity
                    level—for the purpose of calculating personalized hydration
                    recommendations. In compliance with the General Data
                    Protection Regulation (GDPR), your data is processed based
                    on your explicit consent and stored securely using
                    encryption and HTTPS. We do not share your data with third
                    parties and do not use it for advertising. You have the
                    right to access, correct, export, or delete your data at any
                    time, and you may withdraw consent by deleting your account.
                    Technical data may be used anonymously to improve app
                    performance. This app is intended for users aged 16 and
                    older; we do not knowingly collect personal data from
                    children. By continuing, you confirm that you have read and
                    agreed to this Privacy Policy. For questions or data
                    requests, contact us at:
                  </Text>
                  <Text
                    className="text-blue-600 hover:underline"
                    onPress={() =>
                      Linking.openURL("mailto:hydrationiq.team@gmail.com")
                    }
                  >
                    hydrationiq.team@gmail.com
                  </Text>
                </ScrollView>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  className="bg-[#448AFF] mt-6 rounded-3xl py-2 w-[200px] mx-auto hover:bg-[#2979FF] transition-colors"
                >
                  <Text className="text-white text-center">Accept</Text>
                </Pressable>
                <Pressable
                  onPress={() => setPrivacyVisible(true)}
                  className="bg-white mt-2 rounded-3xl py-2 w-[200px] mx-auto border-[1px] border-white hover:border-[#5943d6] transition-colors"
                >
                  <Text className="text-gray-800 text-center">
                    View Privacy Policy
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>

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
