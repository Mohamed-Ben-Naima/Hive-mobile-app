
import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Platform, Animated, InteractionManager } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
import '../../global.css'

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
const HiveBackground = React.memo(() => (
  <View className="absolute inset-0" style={{ zIndex: 1 }}>
    {/* Enhanced base gradient */}
    <View className="absolute inset-0 bg-gradient-to-b from-yellow-500/15 via-yellow-400/5 to-black/98" />
    
    {/* Optimized honeycomb pattern - reduced opacity */}
    <View className="absolute inset-0 opacity-15">
      <View className="flex-row justify-center items-center h-full">
        <View className="w-44 h-44 border-2 border-yellow-400/30 rounded-full" />
      </View>
    </View>
    
    {/* Strategic decorative elements - reduced opacity and size */}
    <View className="absolute top-16 right-12 w-20 h-20 border-2 border-yellow-400/20 rounded-full" />
    <View className="absolute bottom-32 left-10 w-16 h-16 border-2 border-yellow-400/15 rounded-full" />
    <View className="absolute top-1/3 left-1/3 w-12 h-12 border-2 border-yellow-400/10 rounded-full" />
    <View className="absolute top-1/2 right-1/3 w-8 h-8 border border-yellow-400/15 rounded-full" />
    <View className="absolute bottom-1/4 right-1/4 w-10 h-10 border border-yellow-400/10 rounded-full" />
    
    {/* Enhanced glow effects - reduced opacity */}
    <View className="absolute top-12 left-12 w-6 h-6 bg-yellow-400/10 rounded-full" />
    <View className="absolute bottom-24 right-24 w-4 h-4 bg-yellow-400/12 rounded-full" />
    <View className="absolute top-1/3 right-1/2 w-3 h-3 bg-yellow-400/8 rounded-full" />
    
    {/* Additional subtle elements - very low opacity */}
    <View className="absolute top-1/4 left-1/6 w-2 h-2 bg-yellow-400/6 rounded-full" />
    <View className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-yellow-400/8 rounded-full" />
  </View>
));

HiveBackground.displayName = 'HiveBackground';

export default function WelcomeScreen() {
  const router = useRouter();
  
  // Optimized animation refs with better initial values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.7)).current;
  const buttonSlideAnim = useRef(new Animated.Value(120)).current;
  const loginButtonScale = useRef(new Animated.Value(1)).current;
  const registerButtonScale = useRef(new Animated.Value(1)).current;
  const titleSlideAnim = useRef(new Animated.Value(40)).current;
  const taglineSlideAnim = useRef(new Animated.Value(30)).current;

  // Reset animations when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Reset animation values
      fadeAnim.setValue(0);
      slideAnim.setValue(60);
      logoScaleAnim.setValue(0.7);
      buttonSlideAnim.setValue(120);
      titleSlideAnim.setValue(40);
      taglineSlideAnim.setValue(30);
      loginButtonScale.setValue(1);
      registerButtonScale.setValue(1);

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
      // Initial fade and slide - faster
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800, // Reduced from 1200
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600, // Reduced from 1000
          useNativeDriver: true,
        }),
      ]),
      // Logo animation - faster
      Animated.timing(logoScaleAnim, {
        toValue: 1,
        duration: 500, // Reduced from 800
        useNativeDriver: true,
      }),
      // Content animations - faster
      Animated.parallel([
        Animated.timing(titleSlideAnim, {
          toValue: 0,
          duration: 400, // Reduced from 600
          useNativeDriver: true,
        }),
        Animated.timing(taglineSlideAnim, {
          toValue: 0,
          duration: 400, // Reduced from 600
          useNativeDriver: true,
        }),
      ]),
      // Button animations - faster
      Animated.timing(buttonSlideAnim, {
        toValue: 0,
        duration: 500, // Reduced from 700
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, logoScaleAnim, titleSlideAnim, taglineSlideAnim, buttonSlideAnim]);

  // Optimized padding calculations
  const bottomPadding = useMemo(() => 
    Platform.OS === 'ios' ? getResponsiveSpacing(40) : getResponsiveSpacing(30), 
    [getResponsiveSpacing]
  );
  const topPadding = useMemo(() => 
    Constants.statusBarHeight + getResponsiveSpacing(20), 
    [getResponsiveSpacing]
  );

  // Optimized button handlers with better feedback
  const handleLoginPress = useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(loginButtonScale, {
          toValue: 0.92,
          duration: 60, // Reduced from 80
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.85,
          duration: 100, // Reduced from 150
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(loginButtonScale, {
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
      router.push('/screens/LoginScreen');
    });
  }, [router, loginButtonScale, fadeAnim]);

  const handleRegisterPress = useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(registerButtonScale, {
          toValue: 0.92,
          duration: 60, // Reduced from 80
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.85,
          duration: 100, // Reduced from 150
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(registerButtonScale, {
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
      router.push('/screens/RegisterScreen');
    });
  }, [router, registerButtonScale, fadeAnim]);

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
      <StatusBar style="light" />

      {/* Optimized Background */}
      <HiveBackground />

      {/* Main Content Container - Fixed Layout */}
      <View className="flex-1 w-full" style={{ zIndex: 2 }}>
        {/* Top Section - Logo and Title */}
        <Animated.View 
          className="flex-1 items-center justify-center px-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingTop: getResponsiveSpacing(20),
            paddingBottom: getResponsiveSpacing(30),
          }}
        >
          {/* Logo Section - Better Positioning */}
          <Animated.View
            style={{
              transform: [{ scale: logoScaleAnim }],
              alignItems: 'center',
              marginBottom: getResponsiveSpacing(35),
              maxHeight: height * 0.4,
            }}
          >
            <Image
              source={require('../../assets/images/tea-n-hive-logo.png')}
              className="w-full h-auto"
              style={{
                aspectRatio: 750 / 1000,
                maxWidth: width * 0.65,
                maxHeight: height * 0.35,
                resizeMode: 'contain',
              }}
              fadeDuration={300}
            />
          </Animated.View>

          {/* App Title - Better Spacing */}
          <Animated.Text
            style={{ 
              fontSize: getResponsiveFontSize(42),
              opacity: fadeAnim,
              transform: [{ translateY: titleSlideAnim }],
              marginBottom: getResponsiveSpacing(15),
            }}
            className="text-yellow-400 font-black tracking-widest text-center"
          >
            TEA N HIVE
          </Animated.Text>

          {/* Tagline - Improved Layout */}
          <Animated.Text
            style={{ 
              fontSize: getResponsiveFontSize(18),
              opacity: fadeAnim,
              transform: [{ translateY: taglineSlideAnim }],
              marginBottom: getResponsiveSpacing(20),
              paddingHorizontal: getResponsiveSpacing(20),
            }}
            className="text-gray-200 font-medium text-center leading-relaxed"
          >
            Your exclusive network for trading excellence
          </Animated.Text>

          {/* Decorative Element - Better Positioning */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: taglineSlideAnim }],
              marginBottom: getResponsiveSpacing(30),
            }}
            className="w-16 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-full"
          />
        </Animated.View>

        {/* Bottom Section - Buttons */}
        <Animated.View 
          className="w-full px-8"
          style={{
            transform: [{ translateY: buttonSlideAnim }],
            opacity: fadeAnim,
            paddingBottom: getResponsiveSpacing(20),
          }}
        >
          {/* Login Button - Better Spacing */}
          <Animated.View
            style={{
              transform: [{ scale: loginButtonScale }],
              marginBottom: getResponsiveSpacing(16),
            }}
          >
            <TouchableOpacity
              className="w-full py-5 rounded-3xl overflow-hidden"
              onPress={handleLoginPress}
              activeOpacity={0.85}
              style={{
                backgroundColor: '#FBBF24',
                elevation: 16,
                shadowColor: '#F59E0B',
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                minHeight: 60,
              }}
            >
              {/* Enhanced Button Background */}
              <View className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500" />
              
              {/* Enhanced Light Effect */}
              <View className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent" />
              
              {/* Enhanced Button Content */}
              <View className="flex-row items-center justify-center py-3">
                {/* Enhanced Icon */}
                <View className="w-5 h-5 rounded-full bg-black/25 mr-3 border border-white/30" />
                
                <Text
                  style={{ 
                    fontSize: getResponsiveFontSize(18),
                    fontWeight: '900',
                  }}
                  className="text-black tracking-widest"
                >
                  LOGIN
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Register Button - Better Spacing */}
          <Animated.View
            style={{
              transform: [{ scale: registerButtonScale }],
              marginBottom: getResponsiveSpacing(16),
            }}
          >
            <TouchableOpacity
              className="w-full py-5 rounded-3xl border-2 border-yellow-400/70 overflow-hidden"
              onPress={handleRegisterPress}
              activeOpacity={0.85}
              style={{
                backgroundColor: 'transparent',
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
                {/* Enhanced Icon */}
                <View className="w-5 h-5 rounded-full border-2 border-yellow-400 mr-3 bg-yellow-400/15" />
                
                <Text
                  style={{ 
                    fontSize: getResponsiveFontSize(18),
                    fontWeight: '900',
                  }}
                  className="text-yellow-400 tracking-widest"
                >
                  REGISTER
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer Text - Better Positioning */}
          <Animated.Text
            style={{
              opacity: fadeAnim,
              fontSize: getResponsiveFontSize(12),
              textAlign: 'center',
              marginTop: getResponsiveSpacing(10),
            }}
            className="text-gray-400 font-medium"
          >
            Join the hive of successful traders
          </Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
}
