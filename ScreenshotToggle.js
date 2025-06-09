import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import * as ScreenCapture from "expo-screen-capture";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ScreenshotToggle({
  restricted,
  setRestricted,
  setScreenshotAttempts,
  setShowWarning,
}) {
  const [message, setMessage] = useState("");
  const subscriptionRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
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
      setShowWarning(true);
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, [restricted]);

  const handleToggle = () => {
    setRestricted((prev) => !prev);
    const next = !restricted;
    setMessage(next ? "Screenshot\ndisabled" : "Screenshot\nenabled");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
      {message ? (
        <View
          style={{
            marginLeft: 12,
            maxWidth: screenWidth * 0.5,
            backgroundColor: "transparent",
            borderRadius: 8,
            paddingVertical: 6,
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{ color: "#fff", fontSize: 14, textAlign: "center" }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {message}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
