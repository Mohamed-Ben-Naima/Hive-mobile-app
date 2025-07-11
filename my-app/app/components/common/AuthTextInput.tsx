import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TextInputProps, useWindowDimensions, View, ViewStyle } from 'react-native';


interface AuthTextInputProps extends TextInputProps {
  label: string;
  responsiveScale: number;
  error?: string;
  containerStyle?: ViewStyle; // Allows external styling for the outer container View
  icon?: keyof typeof FontAwesome.glyphMap;
}

const AuthTextInput: React.FC<AuthTextInputProps> = ({
  label,
  responsiveScale,
  error,
  style, // This prop is for additional styles passed to the TextInput itself
  containerStyle, // For the outer View
  icon,
  ...rest // Captures all other standard TextInput props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { height } = useWindowDimensions();

  const getResponsiveFontSize = (baseSize: number): number => {
    const baseHeight = 800;
    const scale = height / baseHeight;
    return Math.round(baseSize * scale);
  };

  const getResponsiveSpacing = (baseSize: number): number => {
    const baseHeight = 800;
    const scale = height / baseHeight;
    return Math.round(baseSize * scale);
  };

  // Define the base styles for the TextInput.
  // All static, non-dynamic styles should be here or in className.
  const textInputBaseStyle = {
    fontSize: getResponsiveFontSize(16),
    height: getResponsiveSpacing(50),
    borderWidth: 1,
    borderRadius: getResponsiveSpacing(8), // Explicitly set responsive border radius
  };

  // Define dynamic styles (border color and shadow) based on focus state.
  // These will be conditionally applied.
  const dynamicFocusStyle = StyleSheet.create({
    focused: {
      borderColor: '#FBBF24', // yellow-500
      shadowColor: "#FBBF24", // yellow-500 for shadow
      shadowOffset: { width: 0, height: 0 }, // Inner shadow effect
      shadowOpacity: 0.2,
      shadowRadius: 5,
      ...(Platform.OS === "android" && { elevation: 3 }), // Android elevation for focus
    },
    unfocused: {
      borderColor: '#52525B', // zinc-700
    },
  });

  return (
    // Outer View for the whole input component, including label and error.
    <View className="w-full mb-4" style={containerStyle}>
      <Text
        className="text-zinc-300 font-semibold mb-2"
        style={{ fontSize: getResponsiveFontSize(14) }}
        >
        {label}
      </Text>
      <View style={{ position: 'relative', justifyContent: 'center' }}>
        {icon && (
          <FontAwesome
            name={icon}
            size={getResponsiveFontSize(20)} // Responsive icon size
            color="#A1A1AA" // zinc-400 color for the icon
            style={{ position: 'absolute', left: getResponsiveSpacing(15), zIndex: 1 }}
          />
        )}
        <TextInput
          // ONLY STATIC NativeWind classes here. No dynamic border/shadow classes.
          className="bg-zinc-800 text-white py-3 px-4"
          // Apply styles using an array: base styles, then conditional dynamic styles, then any external styles.
          style={[
            textInputBaseStyle,
            isFocused ? dynamicFocusStyle.focused : dynamicFocusStyle.unfocused, // Apply dynamic styles based on focus
            icon ? { paddingLeft: getResponsiveSpacing(45) } : {}, // Add left padding if icon exists
            style // Apply any external styles passed via the 'style' prop last
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#A1A1AA"
          {...rest} // Pass all other standard TextInput props
        />
      </View>
      {error && (
        <Text className="text-red-500 mt-1 text-sm" style={{ fontSize: getResponsiveFontSize(12) }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default AuthTextInput;