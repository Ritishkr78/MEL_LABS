import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoListScreen from "./VideoListScreen";
import VideoPlayerScreen from "./VideoPlayerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MelLabs Player"
          component={VideoListScreen}
          options={{
            title: "MelPlayer",
            headerStyle: {
              backgroundColor: "#1e1e1e",
            },
            headerTintColor: "yellow",
          }}
        />
        <Stack.Screen
          name="Player"
          component={VideoPlayerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
