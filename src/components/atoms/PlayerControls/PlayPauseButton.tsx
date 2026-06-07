import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAudioPlayer } from '@/contexts/AudioContext';

const PlayButton = ({ size = iconSizes.lg | iconSizes.xxl }) => {
  const { colors } = useTheme();
  const { isPlaying, play, pause } = useAudioPlayer();

  const handlePress = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MaterialIcons
        name={isPlaying ? 'pause' : 'play-arrow'}
        size={size}
        color={colors.frost}
      />
    </TouchableOpacity>
  );
};

export default PlayButton;
