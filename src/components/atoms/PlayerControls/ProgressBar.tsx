import { StyleSheet, View } from 'react-native';
import { useAudioPlayer } from '@/contexts/AudioContext';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/theme';
import { useState } from 'react';

const ProgressBar = () => {
  const { position, duration, seekTo, isPlaying } = useAudioPlayer();
  const { colors } = useTheme();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  const displayPosition = isSeeking ? seekPosition : position;
  const progress = duration > 0 ? displayPosition / duration : 0;

  const handleSlidingStart = () => {
    setIsSeeking(true);
    setSeekPosition(position);
  };

  const handleValueChange = (value: number) => {
    setSeekPosition(value * duration);
  };

  const handleSlidingComplete = (value: number) => {
    const newPosition = value * duration;
    seekTo(newPosition);
    setIsSeeking(false);
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        value={progress}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={colors.purple500}
        maximumTrackTintColor={colors.gray400}
        thumbTintColor={colors.frost}
        onSlidingStart={handleSlidingStart}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 30,
  },
});
