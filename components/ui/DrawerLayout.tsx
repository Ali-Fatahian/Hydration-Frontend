import CustomDrawerContent from "@/components/CustomDrawerContent";
import Drawer from "expo-router/drawer";
import { Platform } from "react-native";
import { useContextState } from "../../app/Context";

export default function DrawerLayout() {
  const { token } = useContextState();
  const authenticated = !!token;
  return (
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
        name="EnterActivityLevel"
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
  );
}
