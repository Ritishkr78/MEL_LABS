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
        <Stack.Screen name="Videos" component={VideoListScreen} />
        <Stack.Screen name="Player" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
