
import React from 'react';
import { View } from 'react-native';

import "../global.css";
import WelcomeScreen from './screens/WelcomeScreen';

export default function index() {

  return (
    <View className="flex-1 bg-black" >
      <WelcomeScreen />
    </View>
  );
}
