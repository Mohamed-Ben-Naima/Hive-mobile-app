import Constants from "expo-constants"; // To get status bar height for safe area
import { useRouter } from "expo-router"; // For navigation
import { StatusBar } from "expo-status-bar"; // For status bar styling
import React from "react";
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function LandingScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // Responsive scaling for fonts and spacing based on screen height
  // Using a base height of 800 (e.g., iPhone X / Pixel 2 XL) as a reference.
  const baseHeight = 800;
  const scale = height / baseHeight;

  // Function to get responsive font size
  const getResponsiveFontSize = (baseSize: number): number =>
    Math.round(baseSize * scale);
  // Function to get responsive spacing (padding/margin)
  const getResponsiveSpacing = (baseSize: number): number =>
    Math.round(baseSize * scale);

  // Dynamic image size based on screen width for better responsiveness
  const imageSize =
    width > 400 ? getResponsiveSpacing(260) : getResponsiveSpacing(180);

  // Dynamic max width for content container to prevent stretching on very wide screens (e.g., tablets)
  const contentContainerMaxWidth =
    width > 500 ? getResponsiveSpacing(420) : "100%";

  // Calculate dynamic padding for safe areas (status bar, bottom navigation gestures) and overall visual balance.
  const topInsetPadding = Constants.statusBarHeight + getResponsiveSpacing(20);
  const bottomInsetPadding =
    Platform.OS === "ios" ? getResponsiveSpacing(30) : getResponsiveSpacing(20);

  return (
    // Main container: Takes full screen, deep black background.
    <View className="flex-1 bg-black">
      {/* Status Bar: Light style for visibility on dark background */}
      <StatusBar style="light" />

      {/* Subtle gradient overlay for visual depth and elegance */}
      <View className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

      {/* Main content wrapper: Positioned absolutely to overlay the background.
          Uses flex-col and 'justify-around' for even distribution of content sections.
          'items-center' centers content horizontally. */}
      <View
        className="absolute inset-0 flex-col items-center justify-around w-full px-6" // Changed justify-between to justify-around
        style={{
          paddingTop: topInsetPadding,
          paddingBottom: bottomInsetPadding,
        }}
      >
        {/* Top Content Area: Contains the image, title, and tagline.
            This view now acts as a content block, centered by its parent's 'items-center'. */}
        <View
          className="w-full items-center"
          style={{ maxWidth: contentContainerMaxWidth }}
        >
          {/* Main illustration image */}
          <Image
            source={require("../../../assets/images/landing/International trade-amico.png")} // Corrected path relative to my-app/app/screens/landing/
            style={{
              width: imageSize,
              height: imageSize,
              marginBottom: getResponsiveSpacing(32), // Responsive margin below image
              shadowColor: "#FFD700", // Gold shadow for a luxurious glow
              shadowOffset: { width: 0, height: getResponsiveSpacing(8) },
              shadowOpacity: 0.35, // Increased opacity for more visible shadow
              shadowRadius: getResponsiveSpacing(20), // Increased radius for softer, larger glow
              ...(Platform.OS === "android" && {
                elevation: getResponsiveSpacing(10),
              }), // Android shadow, increased elevation
            }}
            resizeMode="contain" // Ensures the whole image fits within its bounds
            accessibilityLabel="International trade illustration" // Accessibility best practice
          />

          {/* Welcome Title: Large, bold, and luxurious gold/white text with subtle drop shadow. */}
          <Text
            className="font-extrabold mb-2 text-center"
            style={{
              fontSize: getResponsiveFontSize(36), // Responsive font size
              textShadowColor: "rgba(255, 215, 0, 0.4)", // Subtle gold text shadow for depth, increased opacity
              textShadowOffset: { width: 0, height: 3 }, // Slightly larger offset
              textShadowRadius: 6, // Slightly larger radius
            }}
          >
            <Text className="text-yellow-400">Welcome to </Text>
            <Text className="text-white">Tea & Hive</Text>
            <Text className="text-yellow-400">!</Text>
          </Text>

          {/* Tagline/Description: Subtle zinc colors, responsive font, and relaxed leading. */}
          <Text
            className="text-zinc-300 mb-8 text-center font-medium"
            style={{
              fontSize: getResponsiveFontSize(16), // Responsive font size
              lineHeight: getResponsiveFontSize(24), // Responsive line height for readability
            }}
          >
            Your gateway to{" "}
            <Text className="text-yellow-400 font-semibold">exclusive</Text>{" "}
            trading insights.{"\n"}
            <Text className="text-zinc-400">
              Join our premium community and start your journey!
            </Text>
          </Text>
        </View>

        {/* Action Buttons Section: Vertically stacked and full-width for easy tapping. */}
        <View className="w-full items-center">
          {/* Get Started Button (Primary Action): Solid yellow background, pronounced shadow. */}
          <TouchableOpacity
            className="w-full bg-yellow-500 rounded-xl py-3 mb-4 shadow-lg"
            onPress={() => router.push("/register")}
            activeOpacity={0.85}
            style={{
              maxWidth: getResponsiveSpacing(340),
              shadowColor: "#F59E0B",
              shadowOffset: { width: 0, height: getResponsiveSpacing(8) },
              shadowOpacity: 0.5,
              shadowRadius: getResponsiveSpacing(12),
              ...(Platform.OS === "android" && {
                elevation: getResponsiveSpacing(10),
              }),
            }}
          >
            <Text
              className="text-center font-bold text-black tracking-wider"
              style={{ fontSize: getResponsiveFontSize(18) }}
            >
              Get Started
            </Text>
          </TouchableOpacity>

          {/* Already have an account? Button (Secondary Action): Outlined in gold. */}
          <TouchableOpacity
            className="w-full border border-yellow-500 rounded-xl py-3"
            onPress={() => router.push("/login")}
            activeOpacity={0.85}
            style={{
              maxWidth: getResponsiveSpacing(340),
            }}
          >
            <Text
              className="text-center font-semibold text-yellow-400 tracking-wide"
              style={{ fontSize: getResponsiveFontSize(18) }}
            >
              Already have an account?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Copyright Footer: Positioned at the very bottom, responsive padding. */}
        {/* Removed absolute positioning from here as it's now part of the flex-col layout */}
        <View
          className="items-center"
          style={{
            paddingBottom: getResponsiveSpacing(10),
            marginTop: getResponsiveSpacing(20),
          }}
        >
          <Text className="text-xs text-zinc-500 text-center">
            © {new Date().getFullYear()} Trader Hive. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}
