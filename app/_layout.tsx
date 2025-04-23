import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useDrawerStatus } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer"; // Import expo-router's Drawer
import "../global.css";

export default function Layout() {
  // const drawerStatus = useDrawerStatus();
  // const isDrawerOpen = drawerStatus === "open";

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
        <Drawer.Screen name="index" options={{ title: "Welcome" }} />
        <Drawer.Screen name="SignUp" options={{ title: "Sign Up" }} />
        <Drawer.Screen name="Login" options={{ title: "Login" }} />
        <Drawer.Screen name="Dashboard" options={{ title: "Dashboard" }} />
        <Drawer.Screen name="Profile" options={{ title: "Profile" }} />
        <Drawer.Screen
          name="NotificationsSummary"
          options={{ title: "Notifications" }}
        />
        <Drawer.Screen
          name="ConnectSmartBottle"
          options={{ title: "Connect Bottle" }}
        />
        <Drawer.Screen
          name="AIInsights"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="EnterGender"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="ActivityLevel"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="CreatineIntake"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="EnterWeight"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="DailyGoal"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="EnableNotification"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="PersonalInformation"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="NotificationsHistory"
          options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
