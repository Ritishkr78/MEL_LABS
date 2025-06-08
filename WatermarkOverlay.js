import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const WatermarkOverlay = React.memo(function WatermarkOverlay({
  username = "MelLabs",
}) {
  const [watermarkTime, setWatermarkTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkTime(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View pointerEvents="none">
      <Text
        style={{
          backgroundColor: "rgba(0,0,0,0.25)",
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 8,
          opacity: 0.7,
          textAlign: "left",
          marginTop: 5,
        }}
      >
        {`User: ${username}\n${new Date(watermarkTime).toLocaleString()}`}
      </Text>
    </View>
  );
});

export default WatermarkOverlay;
