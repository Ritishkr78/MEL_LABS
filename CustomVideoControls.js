import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import formatTime from "./FormatTime";

const CustomVideoControls = React.memo(function CustomVideoControls({
  paused,
  onPlayPause,
  onSeek,
  onSeekBy,
  currentTime,
  duration,
  onFullscreen,
  onSettings,
  onRotate,
}) {
  return (
    <View style={styles.controlsContainer}>
      <View style={styles.seekControls}>
        <TouchableOpacity
          onPress={() => onSeekBy(-10)}
          style={styles.seekButton}
        >
          <Text style={styles.seekButtonText}>⏪ 10s</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause} style={styles.playPauseButton}>
          <Text style={styles.playPauseText}>{paused ? "▶️" : "⏸"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSeekBy(10)}
          style={styles.seekButton}
        >
          <Text style={styles.seekButtonText}>10s ⏩</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.seekBarContainer}>
        <Slider
          style={styles.seekBar}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={onSeek}
          minimumTrackTintColor="#FFF"
          maximumTrackTintColor="#888"
          thumbTintColor="#FFF"
        />
        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={onRotate} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>🔄</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onFullscreen} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>⛶</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettings} style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
    paddingBottom: 20,
    zIndex: 1000,
  },
  seekControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  seekButton: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
  },
  seekButtonText: {
    color: "white",
    fontSize: 18,
  },
  playPauseButton: {
    backgroundColor: "#444",
    borderRadius: 30,
    padding: 20,
  },
  playPauseText: {
    color: "white",
    fontSize: 32,
  },
  seekBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  seekBar: { flex: 1, height: 40 },
  timeText: { color: "#fff", marginLeft: 10 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  bottomButton: {
    marginLeft: 20,
    padding: 10,
    backgroundColor: "#222",
    borderRadius: 8,
  },
  bottomButtonText: {
    color: "white",
    fontSize: 22,
  },
});
export default CustomVideoControls;
