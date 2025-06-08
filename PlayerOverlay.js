import React from "react";
import { View, Text, Button } from "react-native";
import CustomVideoControls from "./CustomVideoControls";
import ScreenshotToggle from "./ScreenshotToggle";

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
  screenshotAttempts,
  setScreenshotAttempts,
  showWarning,
  setShowWarning,
  styles,
  restricted,
  setRestricted,
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
      >
        <ScreenshotToggle
          restricted={restricted}
          setRestricted={setRestricted}
          setScreenshotAttempts={setScreenshotAttempts}
        />
      </View>
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
