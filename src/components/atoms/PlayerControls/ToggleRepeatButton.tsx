import { useTheme } from '@/theme';
import { TouchableOpacity } from 'react-native';
import { iconSizes } from '@/theme/Constants/iconSizes';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ToggleRepeatButton = () => {
  const { colors } = useTheme();
  const isRepeat = true;

  return (
    <TouchableOpacity>
      <MaterialCommunityIcons
        name={isRepeat ? 'repeat' : 'repeat-off'}
        color={colors.sky}
        size={iconSizes.md}
      />
    </TouchableOpacity>
  );
};
export default ToggleRepeatButton;
