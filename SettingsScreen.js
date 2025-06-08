import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
} from "react-native";

export default function SettingsScreen({ username, setUsername, onClose }) {
  const [securityEnabled, setSecurityEnabled] = useState(false);

  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        <Text style={styles.header}>Settings</Text>
        <Text style={styles.label}>Watermark Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#888"
        />
        <View style={styles.section}>
          <Text style={styles.label}>Security Options</Text>
          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Enable Security</Text>
            <Switch
              value={securityEnabled}
              onValueChange={setSecurityEnabled}
            />
          </View>
        </View>
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#222",
    padding: 24,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
    elevation: 10,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    alignSelf: "center",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 24,
    color: "#222",
    width: "100%",
  },
  section: {
    marginBottom: 24,
    width: "100%",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  optionLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
