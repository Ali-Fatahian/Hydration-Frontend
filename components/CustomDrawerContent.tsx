import { useContextState } from "@/app/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { View } from "react-native";

const CustomDrawerContent = (props: any) => {
  const router = useRouter();

  const { logout, token } = useContextState()

  const handleLogout = async () => {
    await logout()
    router.replace("/Login");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      {token && <DrawerItem
        label="Log Out"
        onPress={handleLogout}
        labelStyle={{ color: "red", marginBottom: 5 }}
      />}
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
