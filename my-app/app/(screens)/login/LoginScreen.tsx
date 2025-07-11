import Constants from 'expo-constants'; // To get status bar height for safe area
import { useRouter } from 'expo-router'; // For navigation
import { StatusBar } from 'expo-status-bar'; // For status bar styling
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

// Import the custom AuthTextInput component
import AuthTextInput from '../../components/common/AuthTextInput'; // Path relative to app/(screens)/login/

export default function LoginScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // State for form inputs
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // State for potential form errors (for future validation)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Responsive scaling for fonts and spacing based on screen height
  const baseHeight = 800; // Reference height (e.g., iPhone X / Pixel 2 XL)
  const scale = height / baseHeight;

  const getResponsiveFontSize = (baseSize: number): number => Math.round(baseSize * scale);
  const getResponsiveSpacing = (baseSize: number): number => Math.round(baseSize * scale);

  // Dynamic max width for content container to prevent stretching on very wide screens
  const contentContainerMaxWidth = width > 500 ? getResponsiveSpacing(420) : '100%';

  // Calculate dynamic padding for safe areas and visual balance
  // These paddings are applied to the ScrollView's content container
  const topContentPadding = getResponsiveSpacing(40); // Initial padding from the top of the scrollable content
  const bottomContentPadding = getResponsiveSpacing(30); // Padding at the bottom of the scrollable content

  // Handle login logic (placeholder for now)
  const handleLogin = () => {
    // Basic client-side validation (for demo purposes)
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log('Validation errors:', newErrors); // Log errors
      return;
    }

    setErrors({}); // Clear errors if validation passes
    console.log('Login attempt:', { email, password });
    // No actual login functionality, just logs
    router.back(); // For testing purposes, go back to Landing
  };

  return (
    // Main container: full screen, deep black background.
    <View className="flex-1 bg-black">
      {/* Status Bar: Light style for visibility on dark background */}
      <StatusBar style="light" />

      {/* Subtle gradient overlay for visual depth and elegance */}
      <View className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

      {/* KeyboardAvoidingView to push content up when keyboard appears */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? getResponsiveSpacing(0) : getResponsiveSpacing(0)}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1, // Ensures ScrollView content expands to fill available space
            justifyContent: 'center', // Vertically centers content within the scrollable area
            alignItems: 'center', // Horizontally centers content
            paddingHorizontal: getResponsiveSpacing(24), // Consistent horizontal padding
            paddingTop: topContentPadding, // Apply top padding here
            paddingBottom: bottomContentPadding, // Apply bottom padding here
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Prevents keyboard from dismissing on tap outside inputs
        >
          {/* Back Button (Absolute position for fixed placement relative to screen) */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-0 left-0 p-4 z-10"
            style={{ paddingTop: Constants.statusBarHeight + getResponsiveSpacing(10), paddingLeft: getResponsiveSpacing(10) }}
          >
            <Text className="text-yellow-400 text-lg font-semibold">Back</Text>
          </TouchableOpacity>

          {/* Logo Section - Centered and with strategic spacing */}
          <View className="items-center" style={{ marginBottom: getResponsiveSpacing(25) }}>
            <Image
              source={require('../../../assets/images/logo/tea-n-hive-logo.png')} // Corrected logo path
              className="w-full h-auto" // Use w-full and h-auto for responsive scaling
              style={{
                aspectRatio: 750 / 1000, // Maintain aspect ratio of your logo
                maxWidth: getResponsiveSpacing(180), // Slightly larger logo for presence
                maxHeight: getResponsiveSpacing(180),
                resizeMode: 'contain',
                shadowColor: "#FFD700",
                shadowOffset: { width: 0, height: getResponsiveSpacing(8) }, // Deeper shadow
                shadowOpacity: 0.35,
                shadowRadius: getResponsiveSpacing(12),
                ...(Platform.OS === "android" && { elevation: getResponsiveSpacing(7) }),
              }}
              accessibilityLabel="Tea N Hive Logo"
            />
          </View>

          {/* Title and Tagline Section - Clear visual hierarchy */}
          <View className="items-center mb-10" style={{ maxWidth: contentContainerMaxWidth }}>
            <Text
              className="font-extrabold text-center"
              style={{
                fontSize: getResponsiveFontSize(32),
                textShadowColor: 'rgba(255, 215, 0, 0.4)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 5,
              }}
            >
              <Text className="text-white">Start </Text>
              <Text className="text-yellow-400">Buzzing</Text>
            </Text>
            <Text
              className="text-zinc-400 text-center font-medium mt-2"
              style={{ fontSize: getResponsiveFontSize(14), lineHeight: getResponsiveFontSize(20) }}
            >
              Enter your credentials to access your exclusive trading network.
            </Text>
          </View>

          {/* Form Inputs Block - Grouped for cohesion */}
          <View className="w-full space-y-5" style={{ maxWidth: contentContainerMaxWidth }}>
            <AuthTextInput
              label="Email Address"
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              responsiveScale={scale}
              error={errors.email}
              accessibilityLabel="Email address input"
            />

            <AuthTextInput
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              responsiveScale={scale}
              error={errors.password}
              accessibilityLabel="Password input"
            />

            {/* Forgot Password Link - Aligned to the right */}
            <TouchableOpacity onPress={() => console.log('Forgot Password Pressed')} className="self-end mt-1">
              <Text className="text-yellow-400 font-semibold" style={{ fontSize: getResponsiveFontSize(14) }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button - Primary action, distinct spacing */}
          <TouchableOpacity
            className="w-full bg-yellow-500 rounded-xl py-3 mt-10 shadow-lg" // Increased top margin for separation
            onPress={handleLogin}
            activeOpacity={0.85}
            style={{
              maxWidth: getResponsiveSpacing(340),
              alignSelf: "center",
              shadowColor: "#F59E0B",
              shadowOffset: { width: 0, height: getResponsiveSpacing(8) },
              shadowOpacity: 0.5,
              shadowRadius: getResponsiveSpacing(12),
              ...(Platform.OS === "android" && { elevation: getResponsiveSpacing(10) }),
            }}
          >
            <Text className="text-center font-bold text-black tracking-wider" style={{ fontSize: getResponsiveFontSize(18) }}>
              LOGIN
            </Text>
          </TouchableOpacity>

          {/* Register Link - Secondary action, distinct spacing */}
          <TouchableOpacity
            className="w-full py-3 mt-4" // Margin top to separate from Login button
            onPress={() => router.push("/register")}
            activeOpacity={0.85}
            style={{
              maxWidth: getResponsiveSpacing(340),
              alignSelf: "center",
            }}
          >
            <Text className="text-center font-semibold text-yellow-400 tracking-wide" style={{ fontSize: getResponsiveFontSize(16) }}>
              Don&apos;t have an account? <Text className="underline">Join the Hive</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

//TODO: Implement form validation and error handling
//TODO: Fix the keyboard avoiding view behavior 
//TODO: Add a loading indicator when the user is logging in
//TODO: Add a forgot password link