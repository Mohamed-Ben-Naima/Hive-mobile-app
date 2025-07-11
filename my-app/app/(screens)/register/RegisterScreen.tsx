import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <StatusBar style="light" />
      <Text className="text-white text-2xl font-bold">Register Screen</Text>
      <TouchableOpacity onPress={() => router.back()} className="mt-4 p-2 bg-yellow-500 rounded">
        <Text className="text-black">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}