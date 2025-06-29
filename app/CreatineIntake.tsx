import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import BottleIcon from "@/assets/BottleIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import { useContextState } from "./Context";

type Props = {};

type creatineType = {
  id: number;
  company_name: string;
  product_name: string;
  picture: string;
  price: number;
  discount: number;
  size: string;
  link: string;
  partner_id: string;
  description: string;
};

const CreatineIntake = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [creatineIntake, setCreatineIntake] = useState("");
  const [creatineList, setCreatineList] = useState<creatineType[] | []>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { token, contextLoading, updateUser, setShouldRefreshDashboard } =
    useContextState();

  const sendData = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("id");
      const response = await axiosInstance.patch(`users/${userId}`, {
        creatine_intake: creatineIntake,
      });
      updateUser({ creatine_intake: creatineIntake });
      setShouldRefreshDashboard(new Date().toString());
      if (response.status === 200) {
        setMessage(
          `Successfully set to ${String(
            Number(response.data["creatine_intake"])
          )}`
        );
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
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

  const fetchCreatineList = async () => {
    try {
      const response = await axiosInstance.get("creatine_products");
      if (response.status === 200) {
        setCreatineList(response.data);
      } else {
        setFetchError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setFetchError(err.message);
    }
  };

  function calculateDiscount(
    originalPrice: number,
    discountPercentage: number
  ) {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
    return Math.round(discountedPrice * 2) / 2; // Round evey .5
  }

  useEffect(() => {
    if (!contextLoading) {
      if (!token) {
        router.navigate("/Login");
        return;
      }
    }
    fetchCreatineList();
  }, [contextLoading, token]);

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[50px] px-2">
      <View className="w-full max-w-lg mx-auto">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View className="flex-1 justify-center items-center bg-opacity-80 bg-black">
            <ScrollView className="bg-[#2E2E5D] p-6 rounded-sm max-w-lg flex-1">
              {creatineList.length > 0 &&
                fetchError.length === 0 &&
                creatineList.map((creatine) => (
                  <View className="w-full mt-6 first:mt-0" key={creatine.id}>
                    <View className="w-full">
                      <Image
                        source={{ uri: creatine.picture }}
                        resizeMode="contain"
                        className="w-20 aspect-[.5] rounded-md"
                      />
                      <View className="w-full">
                        <Text className="text-white font-bold mt-3">{`${creatine.product_name} by ${creatine.company_name}`}</Text>
                        <Text
                          className="text-light text-gray-300 text-xs mt-2"
                          ellipsizeMode="tail"
                        >
                          {creatine.description}
                        </Text>
                        <Text className="text-xs text-gray-400 mt-3">
                          {creatine.size} grams
                        </Text>
                        <View className="flex flex-row justify-start gap-4 mt-3">
                          <Text className="text-sm text-gray-200">
                            {calculateDiscount(
                              creatine.price,
                              creatine.discount
                            )}{" "}
                            €
                          </Text>
                          <Text className="px-3 py-1 bg-red-500 rounded-md">
                            {creatine.discount}% Discount
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Pressable
                      className="mt-4 py-2 hover:bg-[#448AFF] bg-[#2979FF] transition-colors rounded-lg w-full max-w-[250px] mx-auto"
                      onPress={() =>
                        Linking.openURL(
                          `${creatine.link}?${creatine.partner_id}`
                        )
                      }
                    >
                      <Text className="text-white text-center">Continue</Text>
                    </Pressable>
                  </View>
                ))}
              <Pressable
                onPress={() => setModalVisible(false)}
                className="mt-6 py-2 bg-gray-600 hover:bg-gray-500 transition-colors rounded-lg w-full"
              >
                <Text className="text-white text-center font-semibold">
                  Close
                </Text>
              </Pressable>
            </ScrollView>
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
        <Text className="mt-10 text-[#C9C9E3] text-[14px]">
          Enter your daily creatine intake to help us personalize hydration and
          supplement tips
        </Text>
        <TextInput
          className="transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 mt-4 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
          placeholder="e.g. 3"
          placeholderTextColor="#C9C9E3"
          keyboardType="numeric"
          onChangeText={(v) => {
            setError("");
            setMessage("");
            setCreatineIntake(v);
          }}
          value={creatineIntake}
        />
        <View className="bg-[#565967] px-5 py-4 rounded-lg mt-4">
          <Text className="text-[#afafc1] font-light text-xs inline-block">
            Most users take 3-5g daily.
          </Text>
        </View>
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
        {loading && <Loader className="mt-3" />}
        <Pressable
          onPress={() => {
            formSubmitHandler();
          }}
          className="mt-4 py-2 hover:bg-[#448AFF] bg-[#2979FF] transition-colors rounded-lg w-full"
        >
          <Text className="text-white text-center font-semibold">Submit</Text>
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
            onPress={() => setModalVisible(true)}
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
