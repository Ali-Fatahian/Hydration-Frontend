import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import "../global.css";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log("Checking auth...");
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token); // Log token to verify value
      setAuthenticated(!!token); // If token exists, authenticated = true
    } catch (err) {
      console.error("Error fetching token:", err);
    } finally {
      console.log("Authentication check complete.");
      setLoading(false); // Set loading to false after the auth check completes
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return null;
  }

  console.log("loading", loading);
  console.log("Auth", authenticated);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerStyle: {
              height: 40,
              backgroundColor: "#26274a",
              borderBottomWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 16,
              color: "white",
            },
            headerTintColor: "white",
          }}
        >
          {/* {!authenticated && ( */}
            {/* <React.Fragment> */}
              <Drawer.Screen name="index" options={{ title: "Welcome" }} />
              <Drawer.Screen name="SignUp" options={{ title: "Sign Up" }} />
              <Drawer.Screen name="Login" options={{ title: "Login" }} />
            {/* </React.Fragment>
          )} */}

          {/* {authenticated && (
            <React.Fragment> */}
              <Drawer.Screen
                name="Dashboard"
                options={{ title: "Dashboard" }}
              />
              <Drawer.Screen name="Profile" options={{ title: "Profile" }} />
              <Drawer.Screen
                name="NotificationsSummary"
                options={{ title: "Notifications" }}
              />
              <Drawer.Screen
                name="ConnectSmartBottle"
                options={{ title: "Connect Bottle" }}
              />
            {/* </React.Fragment>
          )} */}

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
    </GestureHandlerRootView>
  );
}
