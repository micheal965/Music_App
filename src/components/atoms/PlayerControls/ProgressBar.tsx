import { StyleSheet, View } from 'react-native';
import { useAudioPlayer } from '@/contexts/AudioContext';

const ProgressBar = () => {
  const { position, duration } = useAudioPlayer();
  const progress = duration > 0 ? position / duration : 0;

  return (
    <View style={styles.line}>
      <View
        style={[
          styles.progress,
          {
            width: `${progress * 100}%`,
          },
        ]}
      />
    </View>
  );
};
export default ProgressBar;

const styles = StyleSheet.create({
  line: {
    height: 4,
    width: '100%',
    backgroundColor: '#969696',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#5b03ff',
  },
});
