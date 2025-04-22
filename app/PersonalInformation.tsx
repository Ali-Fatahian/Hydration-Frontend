import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import WaterIcon from "@/assets/WaterIcon";
import axios from "axios";

type Props = {};

const PersonalInformation = (props: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const checkImageValidity = async (uri: string) => {
    try {
      // Check the image file info
      const fileInfo = await FileSystem.getInfoAsync(uri);

      // Verify file exists
      if (!fileInfo.exists) {
        Alert.alert("Invalid Image", "The file does not exist.");
        return;
      }

      const validExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".webp",
      ];
      const fileExtension = uri.slice(((uri.lastIndexOf(".") - 1) >>> 0) + 2);
      if (!validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
        Alert.alert("Invalid File Type", "The selected file is not an image.");
        return;
      }

      // Check if image size is reasonable (e.g., under 5MB)
      if (fileInfo.size > 5 * 1024 * 1024) {
        Alert.alert("Image Too Large", "Please select an image under 5MB.");
        return;
      }
    } catch (error) {
      console.error("Error checking image validity:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("url", {});
      if (response.status === 200) {
        setFullname(response.data.fullname);
        setEmail(response.data.email);
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const sendData = async (fullname: string, email: string, image: string) => {
    try {
      const response = await axios.post("url", {
        fullname,
        email,
        image,
      });
      if (response.status === 200) {
        setMessage(response.data);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formSubmitHandler = () => {
    if (fullname.length > 0 && email.length > 0 && image) {
      sendData(fullname, email, image);
    } else {
      setError("Please fill out all the fields.");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need permission to access your gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // crop tool
      aspect: [1, 1], // square crop
      quality: 1,
    });

    // If the user selects an image
    if (!result.canceled) {
      checkImageValidity(result.assets[0].uri);
      setImage(result.assets[0].uri);
    } else {
      Alert.alert("No image selected", "You must select an image!");
      return;
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center flex flex-row">
            HydrationIQ
          </Text>
        </View>
        <Text className="block mt-[60px] text-center text-white font-bold text-[16px]">
          Personal Information
        </Text>
        <View>
          <View className="flex items-center justify-center mt-6">
            <Pressable onPress={pickImage}>
              <Image
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: "white",
                  backgroundColor: "gray",
                }}
                source={
                  image
                    ? { uri: image }
                    : require("../assets/default-profile.png") // fallback image
                }
              />
            </Pressable>
            <Text className="text-white mt-2 text-sm">Tap image to change</Text>
          </View>
          <View className="mt-6">
            <Text className="text-white mb-2">Full Name</Text>
            <TextInput
              className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
              placeholder="User's Full Name"
              placeholderTextColor={"#9CA3AF"}
              value={fullname}
              onChange={(e: any) => {
                setFullname(e.target.value);
                setError("");
                setMessage("");
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="text-white mb-2">Email</Text>
            <TextInput
              className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
              placeholder="User's Email"
              placeholderTextColor={"#9CA3AF"}
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value);
                setError("");
                setMessage("");
              }}
            />
          </View>
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
        <Pressable
          onPress={() => formSubmitHandler()}
          className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-sm font-bold text-white text-center">
            Save Changes
          </Text>
        </Pressable>
        <Link
          href="/Profile"
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Back
        </Link>
      </View>
    </ScrollView>
  );
};

export default PersonalInformation;
