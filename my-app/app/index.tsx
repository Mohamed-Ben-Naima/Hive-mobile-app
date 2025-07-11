import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import LandingScreen from './(screens)/landing';

export default function App() {
  return (
    <View className="flex-1">
      <LandingScreen />
      <StatusBar style="auto" />
    </View>
  );
}