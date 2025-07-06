import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import WaterIcon from "@/assets/WaterIcon";
import axios from "axios";
import Loader from "@/assets/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { useContextState } from "./Context";

type Props = {};

const PasswordResetConfirm = (props: Props) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { uid, token } = useLocalSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { token: contextToken, contextLoading } = useContextState();

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setError("");
  };

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    setError("");
  };

  const sendData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${
          Platform.OS === "web" || Platform.OS === "ios"
            ? "http://localhost:8000/api/password_reset_confirm"
            : "http://192.168.178.101:8000/api/password_reset_confirm"
        }`,
        {
          uid,
          token,
          password,
        }
      );
      if (response.status === 200) {
        setMessage(response.data["message"]);
      }
    } catch (err: any) {
      setError(err.response.data["error"]);
    }
    setLoading(false);
  };

  const formSubmitHandler = () => {
    if (password.length === 0 || passwordConfirm.length === 0) {
      setError("Please fill out all the fields");
      return;
    }
    if (password !== passwordConfirm) {
      setError("The password fields must be the same");
      return;
    }
    sendData();
  };

  useFocusEffect(
    useCallback(() => {
      if (!contextLoading) {
        if (contextToken) {
          router.navigate("/Dashboard");
          return;
        }
      }
    }, [contextLoading, contextToken])
  );

  return (
    <ScrollView className="bg-[#1e1f3f] h-full w-full py-[80px]">
      <View className="w-full max-w-lg mx-auto">
        <View className="flex justify-center w-full flex-row gap-1">
          <WaterIcon />
          <Text className="text-[20px] font-bold text-white text-center">
            HydrationIQ
          </Text>
        </View>
        <View className="flex flex-col mt-[58px] gap-4">
          <Text className="text-[18px] font-bold text-white text-center">
            Reset Your Password
          </Text>
          <View className="flex flex-col mt-6 justify-center w-full max-w-lg gap-8 mx-auto">
            <View className="px-4 flex gap-14">
              <View className="relative w-full">
                <TextInput
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={true}
                  className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
                  placeholder=""
                />
                <Text className="z-2 text-white text-sm font-light pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all peer-focus:text-gray-400 peer-placeholder-shown:text-sm px-1 peer-focus:px-1 peer-placeholder-shown:px-0 peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                  Password
                </Text>
              </View>
              <View className="relative w-full">
                <TextInput
                  value={passwordConfirm}
                  onChangeText={handlePasswordConfirmChange}
                  secureTextEntry={true}
                  className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-3 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
                  placeholder=""
                />
                <Text className="z-2 text-white text-sm font-light pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all peer-focus:text-gray-400 peer-placeholder-shown:text-sm px-1 peer-focus:px-1 peer-placeholder-shown:px-0 peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
                  Confirm Password
                </Text>
              </View>
            </View>
          </View>
          {error.length > 0 && (
            <View className="px-4">
              <Text className="text-sm text-gray-200 bg-[#B22222] p-2 rounded-md">
                {error}
              </Text>
            </View>
          )}
          {message.length > 0 && (
            <View className="px-4">
              <Text className="text-sm text-gray-200 bg-[#3CB371] p-2 rounded-md">
                {message}
              </Text>
            </View>
          )}
          {loading && <Loader className="mt-2" />}
          <Pressable
            onPress={formSubmitHandler}
            className="bg-[#816BFF] mt-6 rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
          >
            <Text className="text-sm font-bold text-white text-center">
              Submit
            </Text>
          </Pressable>
          <View>
            <Link
              href="/Login"
              className="w-full text-center text-[14px] mx-auto text-white"
            >
              Back
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PasswordResetConfirm;
