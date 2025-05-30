import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import React, { useCallback, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import "../global.css";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { useFocusEffect } from "@react-navigation/native";
import { Platform } from "react-native";

export default function Layout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setAuthenticated(!!token);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAuth();
    }, [])
  );

  if (loading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerStyle: {
                borderBottomWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                height: Platform.OS === "web" ? 40 : 0,
              },
              headerShadowVisible: false,
              headerTitleStyle: {
                fontSize: 16,
                color: "white",
              },
              headerTintColor: "white",
              headerTransparent: true,
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                title: "Welcome",
                drawerItemStyle: {
                  display: authenticated ? "none" : "flex",
                },
              }}
            />
            <Drawer.Screen
              name="SignUp"
              options={{
                title: "Sign Up",
                drawerItemStyle: {
                  display: authenticated ? "none" : "flex",
                },
              }}
            />
            <Drawer.Screen
              name="Login"
              options={{
                title: "Login",
                drawerItemStyle: {
                  display: authenticated ? "none" : "flex",
                },
              }}
            />

            <Drawer.Screen
              name="Dashboard"
              options={{
                title: "Dashboard",
                drawerItemStyle: {
                  display: authenticated ? "flex" : "none",
                },
              }}
            />
            <Drawer.Screen
              name="Profile"
              options={{
                title: "Profile",
                drawerItemStyle: {
                  display: authenticated ? "flex" : "none",
                },
              }}
            />
            <Drawer.Screen
              name="NotificationsSummary"
              options={{
                title: "Notifications",
                drawerItemStyle: {
                  display: authenticated ? "flex" : "none",
                },
              }}
            />
            <Drawer.Screen
              name="ConnectSmartBottle"
              options={{
                title: "Connect Bottle",
                drawerItemStyle: {
                  display: authenticated ? "flex" : "none",
                },
              }}
            />

            <Drawer.Screen
              name="AIInsights"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="EnterGender"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="ActivityLevel"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="CreatineIntake"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="EnterWeight"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="DailyGoal"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="EnableNotification"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="+not-found"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="PersonalInformation"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="NotificationsHistory"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="PasswordResetRequest"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
            <Drawer.Screen
              name="PasswordResetConfirm"
              options={{
                headerShown: false,
                drawerItemStyle: { display: "none" },
              }}
            />
          </Drawer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
