import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAudioPlayer } from '@/contexts/AudioContext';

const PreviousButton = ({ size = iconSizes.lg | iconSizes.xxl }) => {
  const { colors } = useTheme();
  const { skipToPrevious } = useAudioPlayer();

  return (
    <TouchableOpacity onPress={skipToPrevious}>
      <MaterialIcons name={'skip-previous'} size={size} color={colors.frost} />
    </TouchableOpacity>
  );
};
export default PreviousButton;
