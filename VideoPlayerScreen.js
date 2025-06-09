import {
  View,
  StyleSheet,
  Text,
  Modal,
  Button,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import VideoHeader from "./VideoHeader";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";
import * as ScreenOrientation from "expo-screen-orientation";
import * as ScreenCapture from "expo-screen-capture";
// import ScreenshotToggle from "./ScreenshotToggle";
import PlayerOverlay from "./PlayerOverlay";
import SettingsScreen from "./SettingsScreen";
import WatermarkOverlay from "./WatermarkOverlay";

export default function VideoPlayerScreen({ route }) {
  const { video } = route.params;

  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const videoRef = useRef(null);
  const [screenshotAttempts, setScreenshotAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef(null);
  const [username, setUsername] = useState("MelLabs");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [restricted, setRestricted] = useState(true);
  const onProgress = (data) => setCurrentTime(data.currentTime);
  const onLoad = (data) => setDuration(data.duration);
  const seek = (time) => videoRef.current?.seek(time);
  const seekBy = (delta) =>
    seek(Math.max(0, Math.min(currentTime + delta, duration)));

  // Show controls and reset timer
  const showControls = () => {
    setControlsVisible((visible) => {
      const next = !visible;
      if (next) {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setControlsVisible(false), 20000);
      } else {
        if (hideTimer.current) clearTimeout(hideTimer.current);
      }
      return next;
    });
  };

  useEffect(() => {
    StatusBar.setHidden(!controlsVisible, "fade");
    StatusBar.setBarStyle("light-content", true);
    if (controlsVisible) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setControlsVisible(false), 20000);
    }
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      StatusBar.setHidden(false, "fade");
      StatusBar.setBarStyle("light-content", true);
    };
  }, [controlsVisible]);

  const handlePlayPause = useCallback(() => setPaused((p) => !p), []);
  const handleSeekBy = useCallback((delta) => seekBy(delta), [seekBy]);
  const handleSeek = useCallback((time) => seek(time), [seek]);
  const handleFullscreen = useCallback(() => setFullscreen((f) => !f), []);
  // settings
  const handleSettings = useCallback(() => {
    setPaused(true);
    setSettingsVisible(true);
  }, []);

  const handleRotate = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    if (
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
  };

  // screenshot prevention
  useEffect(() => {
    let subscription;
    if (restricted) {
      ScreenCapture.preventScreenCaptureAsync();
      subscription = ScreenCapture.addScreenshotListener(() => {
        setScreenshotAttempts((prev) => prev + 1);
        setShowWarning(true);
        setPaused(true);
      });
    } else {
      ScreenCapture.allowScreenCaptureAsync();
    }
    return () => {
      if (subscription) subscription.remove();
      ScreenCapture.allowScreenCaptureAsync();
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, [restricted]);

  const navigation = useNavigation();
  const VideoArea = (
    <View
      style={fullscreen ? styles.fullscreenVideoWrapper : styles.videoWrapper}
    >
      <Video
        ref={videoRef}
        source={typeof video === "string" ? { uri: video } : video}
        style={fullscreen ? styles.fullscreenVideo : styles.video}
        resizeMode="contain"
        repeat
        paused={paused}
        // controls={false}
        onProgress={onProgress}
        onLoad={onLoad}
        onBuffer={() => {}}
        ignoreSilentSwitch="ignore"
        progressUpdateInterval={500}
      />
      <TouchableWithoutFeedback onPress={showControls}>
        <View style={StyleSheet.absoluteFill}>
          <VideoHeader
            visible={controlsVisible}
            video={video}
            onBack={() => navigation.goBack()}
          />
          <PlayerOverlay
            restricted={restricted}
            setRestricted={setRestricted}
            setScreenshotAttempts={setScreenshotAttempts}
            visible={controlsVisible}
            paused={paused}
            onPlayPause={handlePlayPause}
            onSeek={handleSeek}
            onSeekBy={handleSeekBy}
            currentTime={currentTime}
            duration={duration}
            onFullscreen={handleFullscreen}
            onSettings={handleSettings}
            onRotate={handleRotate}
            styles={styles}
          />
          <View
            style={{
              position: "absolute",
              top: 90,
              left: 10,
              zIndex: 2000,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={styles.overlayText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              🔒 Screenshot attempts: {screenshotAttempts}
            </Text>
            <WatermarkOverlay username={username} />
          </View>
          {showWarning && (
            <View style={styles.warningOverlay}>
              <Text style={styles.warningText}>
                ⚠️ Screenshot is not allowed!
              </Text>
              <Button title="OK" onPress={() => setShowWarning(false)} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
  // console.log(screenshotAttempts);

  return (
    <View style={styles.container}>
      {fullscreen ? (
        <Modal
          visible={fullscreen}
          animationType="fade"
          supportedOrientations={["landscape", "portrait"]}
          onRequestClose={() => setFullscreen(false)}
        >
          {StatusBar.setHidden(true, "fade")}
          {VideoArea}
        </Modal>
      ) : (
        <>
          {StatusBar.setHidden(false)}
          {VideoArea}
        </>
      )}
      <Modal
        visible={settingsVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <SettingsScreen
          username={username}
          setUsername={setUsername}
          onClose={() => setSettingsVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  videoWrapper: {
    flex: 1,
    position: "relative",
  },
  fullscreenVideoWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    zIndex: 1000,
  },
  video: {
    marginBottom: 10,
    width: "100%",
    height: "90%",
  },
  fullscreenVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlayText: {
    backgroundColor: "transparent",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "ultralight",
    marginTop: 10,
    alignSelf: "stretch", // makes it take full width of parent
    minWidth: 180, // optional: set a minimum width
    maxWidth: 300, // optional: set a maximum width
  },
  warningOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  warningText: {
    color: "yellow",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
