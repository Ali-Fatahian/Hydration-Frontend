import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useCallback, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import "../global.css";
import { useFocusEffect } from "@react-navigation/native";
import { ContextProvider } from "./Context";
import DrawerLayout from "../components/ui/DrawerLayout";

export default function Layout() {
  const linking = {
    prefixes: [
      Linking.createURL("/"),
      "myapp://",
      // , "https://yourfrontend.com"
    ],
    config: {
      screens: {
        PasswordResetConfirm: "PasswordResetConfirm", // Matches the filename
      },
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ContextProvider>
          <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
            <DrawerLayout />
          </SafeAreaView>
        </ContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
