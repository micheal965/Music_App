import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAudioPlayer } from '@/contexts/AudioContext';

const NextButton = ({ size = iconSizes.lg | iconSizes.xxl }) => {
  const { colors } = useTheme();
  const { skipToNext } = useAudioPlayer();

  return (
    <TouchableOpacity onPress={skipToNext}>
      <MaterialIcons name={'skip-next'} size={size} color={colors.frost} />
    </TouchableOpacity>
  );
};

export default NextButton;
