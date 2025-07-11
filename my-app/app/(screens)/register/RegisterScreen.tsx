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
import AuthTextInput from '../../components/common/AuthTextInput'; // Path relative to app/(screens)/register/

export default function RegisterScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // State for form inputs
  // Removed: const [firstName, setFirstName] = useState<string>('');
  // Removed: const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');
  // State for potential form errors (for future validation)
  const [errors, setErrors] = useState<{
    // Removed: firstName?: string;
    // Removed: lastName?: string;
    email?: string;
    password?: string;
    verifyPassword?: string;
  }>({});

  // Responsive scaling for fonts and spacing based on screen height
  const baseHeight = 800; // Reference height (e.g., iPhone X / Pixel 2 XL)
  const scale = height / baseHeight;

  const getResponsiveFontSize = (baseSize: number): number => Math.round(baseSize * scale);
  const getResponsiveSpacing = (baseSize: number): number => Math.round(baseSize * scale);

  // Dynamic max width for content container to prevent stretching on very wide screens
  const contentContainerMaxWidth = width > 500 ? getResponsiveSpacing(420) : '100%';

  // Handle registration logic (placeholder for now)
  const handleRegister = () => {
    // Basic client-side validation (for demo purposes)
    const newErrors: {
      email?: string;
      password?: string;
      verifyPassword?: string;
    } = {};

    // Removed: if (!firstName) newErrors.firstName = 'First Name is required.';
    // Removed: if (!lastName) newErrors.lastName = 'Last Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (!verifyPassword) newErrors.verifyPassword = 'Verify Password is required.';
    if (password && verifyPassword && password !== verifyPassword) {
      newErrors.verifyPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log('Validation errors:', newErrors); // Log errors
      return;
    }

    setErrors({}); // Clear errors if validation passes
    console.log('Registration attempt:', { email, password, verifyPassword }); // Removed firstName, lastName from log
    // No actual registration functionality, just logs
    router.back(); // For testing purposes, go back to Landing or Login
  };

  return (
    // Main container: full screen, deep black background.
    <View className="flex-1 bg-black">
      {/* Status Bar: Light style for visibility on dark background */}
      <StatusBar style="light" />

      {/* Subtle gradient overlay for visual depth and elegance */}
      <View className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

      {/* Back Button (ABSOLUTELY positioned relative to the main View for fixed placement) */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-0 left-0 p-4 z-20"
        style={{ paddingTop: Constants.statusBarHeight + getResponsiveSpacing(10), paddingLeft: getResponsiveSpacing(10) }}
      >
        <Text className="text-yellow-400 text-lg font-semibold">Back</Text>
      </TouchableOpacity>

      {/* KeyboardAvoidingView to push content up when keyboard appears */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0} // Set to 0 for both platforms, let ScrollView padding handle it
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            justifyContent: 'center', // Vertically centers content within the scrollable area
            alignItems: 'center', // Horizontally centers content
            paddingHorizontal: getResponsiveSpacing(24), // Consistent horizontal padding
            // Padding for the top (fixed header area) and bottom (safe area/keyboard space)
            paddingTop: Constants.statusBarHeight + getResponsiveSpacing(60), // Combine spacer height with status bar
            paddingBottom: getResponsiveSpacing(30), // Fixed responsive bottom padding
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
                shadowOffset: { width: 0, height: getResponsiveSpacing(8) },
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
              <Text className="text-white">Join the </Text>
              <Text className="text-yellow-400">Hive</Text>
            </Text>
            <Text
              className="text-zinc-400 text-center font-medium mt-2"
              style={{ fontSize: getResponsiveFontSize(14), lineHeight: getResponsiveFontSize(20) }}
            >
              Create your account & start buzzing !
            </Text>
          </View>

          {/* Form Inputs Block - Grouped for cohesion */}
          <View className="w-full space-y-5" style={{ maxWidth: contentContainerMaxWidth }}>
            {/* Removed First Name Input */}
            {/* Removed Last Name Input */}

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
              icon="envelope"
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
              icon='lock'
            />

            <AuthTextInput
              label="Verify Password"
              placeholder="••••••••"
              secureTextEntry
              value={verifyPassword}
              onChangeText={setVerifyPassword}
              responsiveScale={scale}
              error={errors.verifyPassword}
              accessibilityLabel="Verify Password input"
              icon='lock'
            />
          </View>

          {/* Register Button - Primary action, distinct spacing */}
          <TouchableOpacity
            className="w-full bg-yellow-500 rounded-xl py-3 mt-10 shadow-lg"
            onPress={handleRegister}
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
              REGISTER
            </Text>
          </TouchableOpacity>

          {/* Login Link - Secondary action, distinct spacing */}
          <TouchableOpacity
            className="w-full py-3 mt-4"
            onPress={() => router.push("/login")} // Navigate to login screen
            activeOpacity={0.85}
            style={{
              maxWidth: getResponsiveSpacing(340),
              alignSelf: "center",
            }}
          >
            <Text className="text-center font-semibold text-yellow-400 tracking-wide" style={{ fontSize: getResponsiveFontSize(16) }}>
              Already have an account? <Text className="underline">Login here</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}