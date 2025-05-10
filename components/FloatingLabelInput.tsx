import { TextInput, View, Text } from "react-native";
import React, { useState, useEffect } from "react";

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "email-address" | "numeric";
  secureTextEntry?: boolean;
  multiline?: boolean;
};

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  multiline
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  // Update state when the input is focused/unfocused
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Check if there is any text in the input field
  const shouldFloat = isFocused || value.length > 0;

  const labelStyle = shouldFloat
    ? { top: -24, left: 10, color: "#fff" } // Floating label styles
    : { top: 14, left: 20, color: "#9ca3af" }; // Default label styles

  return (
    <View className="relative w-full">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        className="peer transition-all bg-[#2D2F50] border border-[#3D3F6E] focus:border-none font-light px-5 py-4 w-full text-sm text-white rounded-md outline-none select-all focus:bg-[#373964]"
        placeholder=""
      />
      <Text
        className="z-2 absolute left-5 transition-all text-sm"
        style={labelStyle}
      >
        {label}
      </Text>
    </View>
  );
};

export default FloatingLabelInput;
