import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, Platform, InteractionManager } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Optimized responsive calculations
const responsiveScale = useMemo(() => Math.min(width, height) / 400, [width, height]);

const getResponsiveFontSize = useCallback((baseSize: number): number => {
  return Math.round(baseSize * responsiveScale * 0.8);
}, [responsiveScale]);

const getResponsiveSpacing = useCallback((baseSize: number): number => {
  return Math.round(baseSize * responsiveScale);
}, [responsiveScale]);

// Optimized background component with proper layering
const RegisterBackground = React.memo(() => (
  <View className="absolute inset-0" style={{ zIndex: 1 }}>
    {/* Enhanced base gradient */}
    <View className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-yellow-400/5 to-black/95" />
    
    {/* Subtle decorative elements - reduced opacity */}
    <View className="absolute top-20 left-8 w-12 h-12 border border-yellow-400/15 rounded-full" />
    <View className="absolute bottom-32 right-6 w-8 h-8 border border-yellow-400/10 rounded-full" />
    <View className="absolute top-1/2 left-1/4 w-6 h-6 border border-yellow-400/8 rounded-full" />
    
    {/* Subtle glow effects - reduced opacity */}
    <View className="absolute top-16 right-16 w-3 h-3 bg-yellow-400/8 rounded-full" />
    <View className="absolute bottom-24 left-16 w-2 h-2 bg-yellow-400/6 rounded-full" />
  </View>
));

RegisterBackground.displayName = 'RegisterBackground';

export default function RegisterScreen() {
  const router = useRouter();
  
  // Optimized animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const contentScaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  // Reset animations when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Reset animation values
      fadeAnim.setValue(0);
      slideAnim.setValue(40);
      contentScaleAnim.setValue(0.9);
      buttonScaleAnim.setValue(1);

      // Start animations after a brief delay
      const timer = setTimeout(() => {
        startAnimations();
      }, 100);

      return () => clearTimeout(timer);
    }, [])
  );

  // Optimized animation sequence
  const startAnimations = useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700, // Reduced from 1000
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600, // Reduced from 800
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(contentScaleAnim, {
        toValue: 1,
        duration: 400, // Reduced from 600
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, contentScaleAnim]);

  // Optimized button handler
  const handleGoBack = useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(buttonScaleAnim, {
          toValue: 0.92,
          duration: 60, // Reduced from 80
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 100, // Reduced from 150
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonScaleAnim, {
          toValue: 1,
          duration: 80, // Reduced from 120
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 150, // Reduced from 200
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      router.back();
    });
  }, [router, buttonScaleAnim, fadeAnim]);

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      {/* Optimized Background */}
      <RegisterBackground />

      {/* Enhanced Gradient Overlay */}
      <View className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black/85" />

      {/* Optimized Main Content - Fixed Layout */}
      <View className="flex-1 w-full" style={{ zIndex: 2 }}>
        {/* Top Section - Header */}
        <Animated.View 
          className="flex-1 items-center justify-center px-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingTop: getResponsiveSpacing(40),
            paddingBottom: getResponsiveSpacing(30),
          }}
        >
          {/* Enhanced Header Section */}
          <Animated.View
            style={{
              transform: [{ scale: contentScaleAnim }],
              alignItems: 'center',
              marginBottom: getResponsiveSpacing(40),
            }}
          >
            <Text
              style={{ fontSize: getResponsiveFontSize(36) }}
              className="text-yellow-400 font-black tracking-widest text-center mb-6"
            >
              REGISTER
            </Text>
            
            <View className="w-14 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full mb-8" />
            
            <Text
              style={{ fontSize: getResponsiveFontSize(16) }}
              className="text-gray-200 font-medium text-center leading-relaxed"
            >
              Join the exclusive trading network
            </Text>
          </Animated.View>

          {/* Enhanced Register Form Placeholder */}
          <Animated.View 
            className="w-full bg-black/40 rounded-3xl p-6 border border-yellow-500/25"
            style={{
              transform: [{ scale: contentScaleAnim }],
              elevation: 8,
              shadowColor: '#F59E0B',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Text
              style={{ fontSize: getResponsiveFontSize(18) }}
              className="text-yellow-400 font-bold text-center mb-4"
            >
              Registration Form Coming Soon
            </Text>
            <Text
              style={{ fontSize: getResponsiveFontSize(14) }}
              className="text-gray-300 text-center leading-relaxed"
            >
              Account creation, verification, and onboarding features will be implemented here
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Bottom Section - Button */}
        <Animated.View
          className="w-full px-8"
          style={{
            transform: [{ scale: buttonScaleAnim }],
            paddingBottom: getResponsiveSpacing(30),
          }}
        >
          {/* Enhanced Back Button */}
          <TouchableOpacity
            className="w-full py-5 rounded-3xl border-2 border-yellow-400/70 shadow-lg shadow-yellow-600/25"
            onPress={handleGoBack}
            activeOpacity={0.85}
            style={{
              elevation: 12,
              shadowColor: '#F59E0B',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              minHeight: 60,
            }}
          >
            {/* Enhanced Button Background */}
            <View className="absolute inset-0 bg-gradient-to-r from-yellow-500/15 via-yellow-400/10 to-yellow-300/15" />
            
            {/* Enhanced Light Effect */}
            <View className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent" />
            
            {/* Enhanced Button Content */}
            <View className="flex-row items-center justify-center py-3">
              <View className="w-5 h-5 rounded-full border-2 border-yellow-400 mr-3 bg-yellow-400/15" />
              
              <Text
                style={{ fontSize: getResponsiveFontSize(18) }}
                className="text-yellow-400 font-black text-center tracking-widest"
              >
                GO BACK
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
} 