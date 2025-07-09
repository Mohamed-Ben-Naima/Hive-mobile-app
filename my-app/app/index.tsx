import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import '../global.css';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-3xl font-bold">
        Hello NativeWind!
      </Text>
      <Text className="text-yellow-300 mt-4 text-lg">
        Trader Hive Mobile App
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}