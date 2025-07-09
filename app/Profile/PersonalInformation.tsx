import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Image,
  Platform, // Import Platform for image base URL
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import WaterIcon from "@/assets/WaterIcon";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Still needed for initial user loading if context not ready
import axiosInstance from "@/axiosInstance";
import Loader from "@/assets/Loader";
import { useContextState } from "../Context";

type Props = {};

const PersonalInformation = (props: Props) => {
  // Use a different name for local image state to distinguish from user.picture
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // General API error
  const [formError, setFormError] = useState(""); // Validation errors for form fields
  const [message, setMessage] = useState(""); // Success messages
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Define IMAGE_BASE for displaying remote images
  const IMAGE_BASE =
    Platform.OS === "web" || Platform.OS === "ios"
      ? "http://localhost:8000"
      : "http://192.168.178.101:8000";

  const {
    token,
    contextLoading,
    user, // The user object from global context (primary source of truth)
    updateUserInContext,
    updateUserInStorage,
    setShouldRefreshDashboard,
    setShouldRefreshWaterIntake, // **IMPORTANT: Add this**
  } = useContextState();

  // This useEffect will load user data either from context or AsyncStorage as a fallback
  // and initialize the local form states (fullname, email, selectedImageUri)
  useEffect(() => {
    if (!contextLoading) {
      if (!token) {
        router.navigate("/Login");
        return;
      }
    }

    const loadUserData = async () => {
      let currentUser = user;
      if (!currentUser) {
        // Fallback to AsyncStorage if context user isn't immediately available
        try {
          const storedUser = await AsyncStorage.getItem("user");
          if (storedUser) {
            currentUser = JSON.parse(storedUser);
          }
        } catch (err) {
          console.error("Failed to load user from storage:", err);
          setError("Failed to load profile data.");
        }
      }

      if (currentUser) {
        setEmail(currentUser.email);
        setFullname(currentUser.fullname);
        // Set the image URI from the user's picture, if available
        if (currentUser.picture) {
          setSelectedImageUri(`${IMAGE_BASE}${currentUser.picture}`); // Prepend base URL for display
        }
      }
    };

    loadUserData();
  }, [contextLoading, token, user]); // Dependencies: react to changes in context loading, token, or context user

  const checkImageValidity = async (uri: string) => {
    setError(""); // Clear general API errors for image check
    setFormError(""); // Clear form validation errors
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);

      if (!fileInfo.exists) {
        setFormError("The selected image file does not exist.");
        return false;
      }

      const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
      const fileExtension = uri.split(".").pop()?.toLowerCase(); // Get extension safely
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        setFormError(
          "The selected file is not a valid image type (JPG, PNG, GIF, BMP, WEBP)."
        );
        return false;
      }

      if (fileInfo.size > 5 * 1024 * 1024) {
        // 5MB limit
        setFormError("Image is too large. Please select an image under 5MB.");
        return false;
      }
      return true; // Image is valid
    } catch (err: any) {
      console.error("Error checking image validity:", err);
      setFormError("Failed to validate image. Please try again.");
      return false;
    }
  };

  const sendData = async () => {
    // Rely on `user` from context for user ID
    if (!user?.id) {
      setError("User information missing. Please log in again.");
      setLoading(false);
      return;
    }

    // Basic form validation
    if (!fullname.trim()) {
      setFormError("Full name cannot be empty.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors
    setFormError(""); // Clear previous form validation errors
    setMessage(""); // Clear previous success messages

    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);

      if (selectedImageUri && !selectedImageUri.startsWith(IMAGE_BASE)) {
        // Only append if a new image was picked (not already a remote URL)
        const isValidImage = await checkImageValidity(selectedImageUri);
        if (!isValidImage) {
          setLoading(false);
          return; // Stop if image is invalid
        }

        const fileInfo = await FileSystem.getInfoAsync(selectedImageUri);
        if (fileInfo.exists) {
          const fileUri = fileInfo.uri;
          const fileExtension = fileUri.split(".").pop();
          const mimeType = `image/${fileExtension}`;

          // Append image file as 'picture'
          formData.append("picture", {
            uri: fileUri,
            name: `profile_${user.id}.${fileExtension}`, // More specific filename
            type: mimeType,
          } as any); // Type assertion for FormData.append for files
        } else {
          setFormError("Selected image file does not exist locally.");
          setLoading(false);
          return;
        }
      } else if (selectedImageUri === null && user.picture) {
        // If user had a picture but then cleared it (logic not present for clearing, but good to handle)
        // Or if the user implicitly removes it by not selecting a new one, and you want to explicitly clear it on the backend.
        // This might require a specific backend endpoint or value like `null` for 'picture'
        // formData.append("picture", ""); // Example: send empty string to clear image
      }

      const response = await axiosInstance.patch(`users/${user.id}`, formData, {
        // Use user.id from context
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
          Authorization: `Token ${token}`, // Ensure token is passed
        },
      });

      if (response.status === 200) {
        setMessage("Profile updated successfully!");

        // Construct the updated user object using the current context user
        const updatedUser = {
          ...user,
          email: email,
          fullname: fullname,
          // If a new image was uploaded, response.data should contain the new picture path
          picture: response.data.picture || null, // Update with the new picture URL from backend or null
        };

        // 1. Update user in global context
        updateUserInContext(updatedUser);
        // 2. Update user in AsyncStorage
        await updateUserInStorage(updatedUser);

        // 3. Trigger refreshes for Dashboard (and Profile if needed) and WaterIntakeLoader
        setShouldRefreshDashboard((prev: number) => prev + 1);
        setShouldRefreshWaterIntake((prev: number) => prev + 1);

        // Update local image state to reflect the new remote URL from the backend
        if (response.data.picture) {
          setSelectedImageUri(`${IMAGE_BASE}${response.data.picture}`);
        } else {
          setSelectedImageUri(null); // Clear if picture was removed
        }
      } else {
        setError("Failed to save changes. Please try again.");
      }
    } catch (err: any) {
      console.error("Error sending data:", err);
      // More specific error messages from backend if available
      setError(
        err.response?.data?.detail ||
          err.message ||
          "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need permission to access your gallery to set a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      const isValid = await checkImageValidity(selectedUri);
      if (isValid) {
        setSelectedImageUri(selectedUri); // Set the local URI
        setError(""); // Clear any previous general errors
        setFormError(""); // Clear any previous form validation errors
      }
    } else if (result.canceled) {
      // User cancelled, do nothing or show a passive message
    } else {
      Alert.alert(
        "Image Selection Error",
        "No image was selected or an error occurred."
      );
    }
  };

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[40px] px-2">
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
                  selectedImageUri
                    ? { uri: selectedImageUri }
                    : require("../../assets/images/default-profile.png") // fallback image
                }
              />
            </Pressable>
            <Text className="text-white mt-2 text-sm">Tap image to change</Text>
          </View>
          <View className="mt-6">
            <Text className="text-white mb-2">Full Name</Text>
            <TextInput
              className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 h-12 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964] justify-center"
              placeholder={user ? user.fullname : "Full Name"}
              placeholderTextColor={"#9CA3AF"}
              value={fullname}
              onChangeText={(v: string) => {
                // Type as string
                setFullname(v);
                setError("");
                setFormError("");
                setMessage("");
              }}
            />
          </View>
          <View className="mt-4">
            <Text className="text-white mb-2">Email</Text>
            <TextInput
              className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 h-12 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964] justify-center"
              placeholder={user ? user.email : "Email"}
              placeholderTextColor={"#9CA3AF"}
              value={email}
              onChangeText={(v: string) => {
                // Type as string
                setEmail(v);
                setError("");
                setFormError("");
                setMessage("");
              }}
            />
            {formError.length > 0 && (
              <View className="bg-[#B22222] mt-3 p-2 rounded-md">
                <Text className="text-sm text-gray-200">{formError}</Text>
              </View>
            )}
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
        {loading && <Loader className="mt-4 mb-[-20px]" />}
        <Pressable
          onPress={sendData} // Simplified onPress
          className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto active:bg-[#735cf5] transition-colors" // Added active state
          disabled={loading} // Disable button while loading
        >
          <Text className="text-sm font-bold text-white text-center">
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </Pressable>
        <Link
          href="/Profile"
          className="mt-3 text-white text-[14px] font-light text-center active:underline" // Added active state
        >
          Back
        </Link>
      </View>
    </ScrollView>
  );
};

export default PersonalInformation;
