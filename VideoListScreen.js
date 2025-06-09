import React from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const videos = [
  {
    id: "1",
    title: "Big Buck Bunny",
    duration: "9:56",
    thumbnail: require("./assets/thumbnails/BigBuckBunny.jpg"),
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    title: "Elephant Dream",
    duration: "10:53",
    thumbnail: require("./assets/thumbnails/ElephantsDream.jpg"),
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    title: "Sintel",
    duration: "14:47",
    thumbnail: require("./assets/thumbnails/Sintel.jpg"),
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
];

export default function VideoListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Player", {
          video: item.video,
          title: item.title,
        })
      }
    >
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#5E5E5E" }}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#222",
    borderRadius: 10,
    overflow: "hidden",
  },
  thumbnail: {
    width: 120,
    height: 70,
  },
  info: {
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 16,
  },
  duration: {
    color: "white",
    fontSize: 12,
  },
});
