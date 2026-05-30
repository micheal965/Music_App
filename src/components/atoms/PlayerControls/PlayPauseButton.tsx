import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PlayButton = ({ size = iconSizes.lg | iconSizes.xxl}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity>
      <MaterialIcons
        name={true ? 'pause' : 'play-arrow'}
        size={size}
        color={colors.frost}
      />
    </TouchableOpacity>
  );
};

export default PlayButton;
