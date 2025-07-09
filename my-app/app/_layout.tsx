import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: "Welcome",
        }}
      />
      <Stack.Screen 
        name="login" 
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen 
        name="register" 
        options={{
          title: "Register",
        }}
      />
    </Stack>
  );
}