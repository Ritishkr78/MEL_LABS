import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import * as ScreenCapture from "expo-screen-capture";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ScreenshotToggle({ restricted, setRestricted }) {
  // const [screenshotAttempts, setScreenshotAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const subscriptionRef = useRef(null);

  useEffect(() => {
    // Remove previous listener if exists
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }

    if (restricted) {
      ScreenCapture.preventScreenCaptureAsync();
    } else {
      ScreenCapture.allowScreenCaptureAsync();
    }

    subscriptionRef.current = ScreenCapture.addScreenshotListener(() => {
      setScreenshotAttempts((prev) => prev + 1);
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, [restricted]);

  // Show message for 2 seconds when toggled
  const handleToggle = () => {
    setRestricted((prev) => !prev);
    const next = !restricted;
    setMessage(next ? "Screenshot disabled" : "Screenshot enabled");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {message ? (
        <Text style={{ color: "#fff", fontSize: 14 }}>{message}</Text>
      ) : null}
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(34,34,34,0.85)",
          padding: 10,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleToggle}
      >
        <MaterialCommunityIcons
          name={restricted ? "lock" : "lock-open-variant"}
          size={28}
          color={restricted ? "#e74c3c" : "#2ecc71"}
        />
      </TouchableOpacity>
    </View>
  );
}
