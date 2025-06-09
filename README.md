# MEL_LABS  
## React Native Video Player App

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

## Getting Started

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install Dependencies

```sh
npm install
```
_or_
```sh
yarn install
```

### 3. Install Required Native Dependencies


If using Expo, run:
```sh
expo install react-native-video @react-navigation/native @react-navigation/native-stack expo-screen-orientation expo-screen-capture
```

---
if Not already installed Expo,run:
```sh
npm install -g expo-cli
```

## Building & Running the App

> **This project requires EAS Build. It will NOT work in Expo Go.**

### 1. Login to Expo

```sh
npx expo login
```

### 2. Configure EAS

```sh
npx eas build:configure
```

### 3. Build the App

```sh
npx eas build --platform android
# or
npx eas build --platform ios
```

---

## Running on an Emulator

### Android

1. **Start your Android emulator** (via Android Studio or `emulator` command).
2. **Build the app** as above. After the build completes, download the APK from the Expo build page.
3. **Install the APK on the emulator:**
   - Make sure `adb` is in your PATH (comes with Android Studio).
   - Run:
     ```sh
     adb install path/to/your-app.apk
     ```
   - Or, drag and drop the APK onto the emulator window.
4. **Open the app** from the emulator’s app drawer.

### iOS

- Use Xcode Simulator (macOS only).
- Build for iOS, download the `.app` or `.ipa`, and install via Xcode or Apple Configurator.

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

## Troubleshooting

- If you encounter issues with `node_modules`, try deleting the folder and running `npm install` again.  
  For Windows:
  ```sh
  rmdir /s /q node_modules
  npm install
  ```
- If you see errors related to native dependencies, ensure you are using EAS Build and not Expo Go.

---

## License

MIT
