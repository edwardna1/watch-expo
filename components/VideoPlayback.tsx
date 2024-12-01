import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { View, TouchableOpacity, Text } from "react-native";

export const VideoPlayback = ({ url }) => {
  const player = useVideoPlayer(url, (player) => {
    player.loop = true; // Enable looping
    player.play(); // Auto-play video
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="mb-4">
      <VideoView
        style={{ width: "100%", height: 200, borderRadius: 10 }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
};
