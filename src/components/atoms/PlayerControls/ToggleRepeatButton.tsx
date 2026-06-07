import { useTheme } from '@/theme';
import { TouchableOpacity } from 'react-native';
import { iconSizes } from '@/theme/Constants/iconSizes';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAudioPlayer } from '@/contexts/AudioContext';

const ToggleRepeatButton = () => {
  const { colors } = useTheme();
  const { repeatMode, toggleRepeat } = useAudioPlayer();

  const getIconName = () => {
    if (repeatMode === 'one') return 'repeat-once';
    if (repeatMode === 'all') return 'repeat';
    return 'repeat-off';
  };

  const getIconColor = () => {
    return repeatMode !== 'off' ? colors.frost : colors.sky;
  };

  return (
    <TouchableOpacity onPress={toggleRepeat}>
      <MaterialCommunityIcons
        name={getIconName()}
        color={getIconColor()}
        size={iconSizes.md}
      />
    </TouchableOpacity>
  );
};
export default ToggleRepeatButton;
