import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or use any icon library you prefer

export default function VideoHeader({ visible, video, onBack }) {
  if (!visible) return null;

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {typeof video === "string" ? video.split("/").pop() : "Video"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40, // adjust for status bar height if needed
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 2001,
    height: 80,
  },
  backButton: {
    padding: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    flex: 1,
  },
});
