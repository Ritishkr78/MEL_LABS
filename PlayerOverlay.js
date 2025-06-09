import React from "react";
import { View, Text, Button } from "react-native";
import CustomVideoControls from "./CustomVideoControls";

const PlayerOverlay = React.memo(function PlayerOverlay({
  visible,
  paused,
  onPlayPause,
  onSeek,
  onSeekBy,
  currentTime,
  duration,
  onRotate,
  onFullscreen,
  onSettings,
  restricted,
  setRestricted,
  showWarning,
  setScreenshotAttempts,
  setShowWarning,
  styles,
}) {
  if (!visible) return null;

  return (
    <>
      <CustomVideoControls
        paused={paused}
        onPlayPause={onPlayPause}
        onSeek={onSeek}
        onSeekBy={onSeekBy}
        currentTime={currentTime}
        duration={duration}
        onRotate={onRotate}
        onFullscreen={onFullscreen}
        onSettings={onSettings}
        restricted={restricted}
        setRestricted={setRestricted}
        setScreenshotAttempts={setScreenshotAttempts}
      />
      <View
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1001,
          elevation: 10,
          alignItems: "center",
        }}
      ></View>
      {showWarning && (
        <View style={styles.warningOverlay}>
          <Text style={styles.warningText}>⚠️ Screenshot is not allowed!</Text>
          <Button title="OK" onPress={() => setShowWarning(false)} />
        </View>
      )}
    </>
  );
});
export default PlayerOverlay;
