import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  Linking,
  Platform, // Import Platform for image base URL
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import BottleIcon from "@/assets/BottleIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import { useContextState } from "../Context";

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
  // Removed userSafe local state, will rely on `user` from context
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const IMAGE_BASE =
    Platform.OS === "web" || Platform.OS === "ios"
      ? "http://localhost:8000"
      : "http://192.168.178.101:8000"; // Assuming creatine.picture might be relative

  const {
    token,
    contextLoading,
    updateUserInContext,
    updateUserInStorage,
    setShouldRefreshDashboard,
    setShouldRefreshWaterIntake, // **IMPORTANT: Add this**
    user, // Rely on user from context as the primary source
  } = useContextState();

  // Initialize creatineIntake from context's user state
  useEffect(() => {
    if (!contextLoading) {
      if (!token) {
        router.navigate("/Login");
        return;
      }
    }

    const initializeCreatineIntake = async () => {
      let currentUser = user;
      if (!currentUser) {
        // Fallback: If context user is not yet available, try AsyncStorage
        try {
          const storedUser = await AsyncStorage.getItem("user");
          if (storedUser) {
            currentUser = JSON.parse(storedUser);
          }
        } catch (err) {
          console.error(
            "Failed to load user from storage for initialization:",
            err
          );
        }
      }

      if (currentUser?.creatine_intake) {
        setCreatineIntake(String(currentUser.creatine_intake));
      } else {
        setCreatineIntake(""); // Default if no creatine intake found
      }
    };

    initializeCreatineIntake();
    fetchCreatineList(); // Fetch creatine list when component mounts or token/context changes
  }, [contextLoading, token, user]); // Depend on user from context for initialization and refetch

  const sendData = async () => {
    // Rely on `user` from context for user ID
    if (!user?.id) {
      setError("User information missing. Please log in again.");
      setLoading(false); // Ensure loading is off if there's an early exit
      return;
    }
    if (
      !creatineIntake ||
      isNaN(Number(creatineIntake)) ||
      Number(creatineIntake) < 0
    ) {
      // Add validation for non-negative
      setError("Please enter a valid number for creatine intake (e.g., 3, 5).");
      setLoading(false); // Ensure loading is off
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    try {
      // Use user.id from context directly, no trailing slash as per your preference
      const response = await axiosInstance.patch(
        `users/${user.id}`,
        {
          creatine_intake: Number(creatineIntake), // Ensure it's sent as a number
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (response.status === 200) {
        // Create an updated user object based on current context user
        const updatedUser = {
          ...user, // Use 'user' from context, not userSafe
          creatine_intake: creatineIntake,
        };

        // 1. Update user in global context
        updateUserInContext(updatedUser);
        // 2. Update user in AsyncStorage
        await updateUserInStorage(updatedUser);

        // 3. Trigger refreshes for Dashboard and WaterIntakeLoader
        setShouldRefreshDashboard((prev: number) => prev + 1); // Increment the number
        setShouldRefreshWaterIntake((prev: number) => prev + 1); // **IMPORTANT: Increment this too**

        setMessage(`Successfully set to ${creatineIntake}g/day`);
        // Optional: router.replace("/Profile"); if you want to go back
      } else {
        setError("Failed to update creatine intake. Please try again.");
      }
    } catch (err: any) {
      console.error("Error updating creatine intake:", err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const formSubmitHandler = () => {
    sendData(); // Validation is now within sendData
  };

  const fetchCreatineList = async () => {
    setFetchError(""); // Clear previous fetch errors
    try {
      const response = await axiosInstance.get("creatine_products");
      if (response.status === 200) {
        setCreatineList(response.data);
      } else {
        setFetchError(
          "Something went wrong fetching products. Please try again."
        );
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
    return Math.round(discountedPrice * 2) / 2; // Round every .5
  }

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
              {fetchError.length > 0 && (
                <View className="bg-[#B22222] p-2 rounded-md mb-4">
                  <Text className="text-sm text-gray-200">{fetchError}</Text>
                </View>
              )}
              {creatineList.length > 0 && fetchError.length === 0
                ? creatineList.map((creatine) => (
                    <View
                      className="w-full mt-6 first:mt-0 border-b border-gray-600 pb-4"
                      key={creatine.id}
                    >
                      {" "}
                      {/* Added border for visual separation */}
                      <View className="flex-row items-center gap-4">
                        {" "}
                        {/* Use flex-row for image and text */}
                        <Image
                          source={{ uri: `${IMAGE_BASE}${creatine.picture}` }}
                          resizeMode="contain"
                          className="w-20 h-20 rounded-md"
                        />
                        <View className="flex-1">
                          {" "}
                          {/* Take remaining space */}
                          <Text className="text-white font-bold">{`${creatine.product_name} by ${creatine.company_name}`}</Text>
                          <Text
                            className="text-light text-gray-300 text-xs mt-1"
                            ellipsizeMode="tail"
                            numberOfLines={2}
                          >
                            {creatine.description}
                          </Text>
                          <Text className="text-xs text-gray-400 mt-2">
                            {creatine.size} grams
                          </Text>
                          <View className="flex flex-row justify-start gap-4 mt-2 items-center">
                            <Text className="text-sm text-gray-200">
                              {calculateDiscount(
                                creatine.price,
                                creatine.discount
                              ).toFixed(2)}{" "}
                              € {/* Display with 2 decimal places */}
                            </Text>
                            <Text className="px-3 py-1 bg-red-500 rounded-md text-white text-xs">
                              {" "}
                              {/* Added text-white to discount text */}
                              {creatine.discount}% Discount
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Pressable
                        className="mt-4 py-2 bg-[#2979FF] transition-colors rounded-lg w-full max-w-[250px] mx-auto active:bg-[#448AFF]" // active state for consistency
                        onPress={
                          () =>
                            Linking.openURL(
                              `${creatine.link}?${creatine.partner_id}`
                            ).catch((err) =>
                              console.error("Failed to open URL:", err)
                            ) // Add error handling for linking
                        }
                      >
                        <Text className="text-white text-center">
                          Visit Store
                        </Text>
                      </Pressable>
                    </View>
                  ))
                : fetchError.length === 0 && ( // Only show "No products" if no error and empty list
                    <Text className="text-white text-center mt-10">
                      No creatine products available.
                    </Text>
                  )}
              <Pressable
                onPress={() => setModalVisible(false)}
                className="mt-6 py-2 bg-gray-600 active:bg-gray-500 transition-colors rounded-lg w-full"
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
          className="transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 justify-center h-12 mt-4 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
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
          onPress={formSubmitHandler} // Simplified onPress
          className="mt-4 py-2 bg-[#2979FF] transition-colors rounded-lg w-full active:bg-[#448AFF]" // Added active state
          disabled={loading} // Disable button while loading
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Submitting..." : "Submit"}
          </Text>
        </Pressable>
        <View className="bg-[#2E2E5D] px-3 py-5 flex flex-col gap-6 rounded-lg mt-10">
          <View className="flex flex-row justify-between items-center gap-4 w-full max-w-[300px] mx-auto">
            <BottleIcon height={70} width={70} fill={"white"} />
            <View className="flex flex-col gap-2 flex-1">
              {" "}
              {/* Added flex-1 to allow text to wrap */}
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
            className="bg-[#816BFF] cursor-pointer rounded-3xl py-3 px-20 w-fit mx-auto active:bg-[#735cf5] transition-colors" // Added active state
          >
            <Text className="text-[14px] font-bold text-white text-center">
              Shop
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => router.push("/Profile")}
          className="text-white font-bold mt-6 text-center active:underline" // Added active state for consistency
        >
          <Text className="text-[14px] font-bold text-white text-center">
            Back
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CreatineIntake;
