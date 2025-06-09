# MEL_LABS
# React Native Video Player App

A React Native app for browsing and playing videos, featuring a custom video player with overlays, screenshot prevention, fullscreen support, and orientation lock.  
**Note:** This project uses [EAS Build](https://docs.expo.dev/build/introduction/) and will **not** run in Expo Go.

---

## Features

- Video list screen for browsing available videos
- Custom video player with:
  - Play/pause, seek, and fullscreen controls
  - Overlay for screenshot prevention and watermark
  - Orientation lock and settings modal
- Navigation using React Navigation

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. **Install required native dependencies:**
   - [react-native-video](https://github.com/react-native-video/react-native-video)
   - [@react-navigation/native](https://reactnavigation.org/)
   - [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/)
   - [expo-screen-orientation](https://docs.expo.dev/versions/latest/sdk/screen-orientation/)
   - [expo-screen-capture](https://docs.expo.dev/versions/latest/sdk/screen-capture/)

   If using Expo, run:
   ```sh
   expo install react-native-video @react-navigation/native @react-navigation/native-stack expo-screen-orientation expo-screen-capture
   ```

---

## Building & Running

> **This project requires EAS Build. It will NOT work in Expo Go.**

1. **Login to Expo:**
   ```sh
   npx expo login
   ```

2. **Configure EAS:**
   ```sh
   npx eas build:configure
   ```

3. **Build your app:**
   ```sh
   npx eas build --platform android
   npx eas build --platform ios
   ```

4. **Install the built app on your device or emulator.**

---

## File Structure

```
base1/
  App.js
  VideoListScreen.js
  VideoPlayerScreen.js
  PlayerOverlay.js
  CustomVideoControls.js
  WatermarkOverlay.js
  SettingsScreen.js
  ...
```

---

## Usage

- Launch the app.
- Browse the video list and tap a video to play.
- Use the custom controls to play/pause, seek, rotate, or go fullscreen.
- Settings and screenshot prevention overlays are included.

---

## License

MIT

---

**Note:**  
If you encounter issues with `node_modules`, try deleting the folder and running `npm install` again.  
For Windows, use:
```sh
rmdir /s /q node_modules
npm install
```
