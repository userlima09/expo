import { useVideoPlayer, VideoView, VideoSource } from 'expo-video';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const bigBuckBunnySource: VideoSource = 'http://127.0.0.1:8083/video.mp4';

const elephantsDreamSource: VideoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

export default function PreloadingVideoPlayerScreen() {
  const player1 = useVideoPlayer(bigBuckBunnySource, (player) => {
    player.play();
  });

  // const player2 = useVideoPlayer(elephantsDreamSource, (player) => {
  //   player.bufferOptions = {
  //     preferredForwardBufferDuration: 10,
  //   };
  //   player.currentTime = 20;
  // });

  const [currentPlayer, setCurrentPlayer] = React.useState(player1);

  const replacePlayer = useCallback(async () => {
    currentPlayer.pause();
    if (currentPlayer === player1) {
      // setCurrentPlayer(player2);
      // player2.play();
    } else {
      setCurrentPlayer(player1);
      player1.play();
    }
  }, [player1, currentPlayer]);

  return (
    <View style={styles.contentContainer}>
      <VideoView player={currentPlayer} style={styles.video} nativeControls />
      <TouchableOpacity style={styles.button} onPress={replacePlayer}>
        <Text style={styles.buttonText}>Replace Player</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4630ec',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#eeeeee',
    textAlign: 'center',
  },
  video: {
    width: 300,
    height: 168.75,
    marginVertical: 20,
  },
});
