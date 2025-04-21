import { View, Text, Pressable, Animated, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WaterIcon from "@/assets/WaterIcon";
import { Link, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const defaultData = {
  id: 1,
  data_created: "2025-4-20",
  notifications: [
    { id: 1, text: "Time to drink water - 300ml", seen: false },
    { id: 2, text: "Time to drink water - 300ml", seen: false },
    { id: 3, text: "Time to drink water - 300ml", seen: true },
  ],
};

const defaultAIMessage =
  "You are most likely to respond to reminders at 8-10 pm. Want to focus on reminders around this time?";

type Props = {};

const NotificationsSummary = (props: Props) => {
  const [data, setData] = useState(defaultData);
  const [suggestion, setSuggestion] = useState(defaultAIMessage);
  const [error, setError] = useState("");
  const [aiError, setAiError] = useState("");
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setExpanded((expanded) => !expanded);
  };

  const postData = async (id: number) => {};

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("url", {});
      if (response.status === 200) {
        setData(response.data);
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchAISuggestion = async () => {
    try {
      const response = await axios.get("url", {});
      if (response.status === 200) {
        setSuggestion(response.data);
      } else {
        setAiError("Something went wrong, please try again.");
      }
    } catch (err: any) {
      setAiError(err.message);
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? contentHeight : 0,
      duration: 300,
      useNativeDriver: false, // false because we animate height
    }).start();

    fetchNotifications();
    fetchAISuggestion();
  }, [expanded, contentHeight]);

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
          Today's Notifications
        </Text>
        <View className="bg-[#2E2E4D] p-3 flex flex-col w-full gap-4 rounded-md mt-4">
          <View className="flex flex-row gap-2">
            <Ionicons
              name="calendar-clear-outline"
              color={"#E4CCFF"}
              size={18}
            />
            <View className="flex flex-row">
              <Text className="mr-1 text-white">Today's reminders:</Text>
              {data && Object.keys(data).length > 0 ? (
                <Text className="text-white">{Object.keys(data).length}</Text>
              ) : (
                <Text className="text-white">0</Text>
              )}
            </View>
          </View>
          <View className="flex flex-row gap-2">
            <Ionicons name="eye-outline" color={"#E4CCFF"} size={18} />
            <View className="flex flex-row">
              <Text className="mr-1 text-white">Viewed:</Text>
              {data && Object.keys(data).length > 0 ? (
                <Text className="text-white">
                  {data.notifications.filter((obj) => obj.seen === true).length}
                </Text>
              ) : (
                <Text className="text-white">0</Text>
              )}
            </View>
          </View>
        </View>
        <Pressable
          className="flex flex-row justify-between bg-[#2E2E4D] p-3 cursor-pointer transition-colors rounded-md mt-2 hover:bg-[#36366c]"
          onPress={toggleAccordion}
          style={{ transitionDuration: "200ms" }}
        >
          <Text className="text-white">Details</Text>
          <Ionicons
            name={expanded ? "arrow-up-outline" : "arrow-down-outline"}
            color={"#fff"}
            size={18}
          />
        </Pressable>
        {/* Start of notifications */}
        <Animated.View
          style={[
            {
              overflow: "hidden",
              height: animation,
            },
          ]}
        >
          <View
            ref={contentRef}
            onLayout={(event) => {
              const height = event.nativeEvent.layout.height;
              setContentHeight(height);
            }}
          >
            <View className="flex flex-col rounded-md mt-1 gap-1">
              {data && Object.keys(data).length > 0
                ? data.notifications.map((n) => (
                    <Pressable
                      onPress={() => postData(n.id)}
                      key={n.id}
                      className="p-3 hover:bg-[#51518A] bg-[#3F3F6B] rounded-md transition-colors flex flex-row justify-between"
                    >
                      <Text className="text-[#afafc1] font-light text-xs">
                        {n.text}
                      </Text>
                      {n.seen === false ? (
                        <Ionicons
                          color={"#afafc1"}
                          size={16}
                          name="square-outline"
                        />
                      ) : (
                        <Ionicons
                          color={"#afafc1"}
                          size={14}
                          name="checkbox-outline"
                        />
                      )}
                    </Pressable>
                  ))
                : error.length > 0 && (
                    <View className="bg-[#B22222] p-2 rounded-md">
                      <Text className="text-sm text-gray-200">{error}</Text>
                    </View>
                  )}
            </View>
          </View>
        </Animated.View>
        <View className="bg-[#2E2E4D] p-3 w-full rounded-md mt-4">
          <Text className="text-white font-bold">AI Suggestions</Text>
          {suggestion && suggestion.length > 0 ? (
            <Text className="text-gray-400 text-sm mt-2">{suggestion}</Text>
          ) : (
            aiError.length > 0 && (
              <View className="bg-[#B22222] p-2 rounded-md mt-2">
                <Text className="text-sm text-gray-200">{aiError}</Text>
              </View>
            )
          )}
        </View>
        <Pressable
          onPress={() => router.navigate("/NotificationsHistory")}
          className="bg-[#816BFF] mt-[40px] rounded-3xl py-3 px-20 w-fit mx-auto hover:bg-[#735cf5] active:bg-[#5943d6] transition-colors"
        >
          <Text className="text-sm font-bold text-white text-center">
            Notifications History
          </Text>
        </Pressable>
        <Link
          href="/Dashboard"
          className="text-white text-[14px] mt-3 font-light text-center hover:underline active:underline"
        >
          Dashboard
        </Link>
      </View>
    </ScrollView>
  );
};

export default NotificationsSummary;
