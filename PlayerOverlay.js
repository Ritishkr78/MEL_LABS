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
      />
    </>
  );
});
export default PlayerOverlay;
