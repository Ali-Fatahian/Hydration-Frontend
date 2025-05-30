// components/Loader.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";

type LoaderProps = {
  size?: "small" | "large" | number;
  color?: string;
  duration?: number;
  className?: string;
  children?: React.ReactNode; // optional content to show after loading
};

const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = "#3B82F6",
  //   duration = 2000,
  className = "",
  children,
}) => {
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => setLoading(false), duration);
  //     return () => clearTimeout(timer);
  //   }, [duration]);

  return (
    <View className={`justify-center items-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;
