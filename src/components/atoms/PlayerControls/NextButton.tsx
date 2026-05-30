import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NextButton = ({ size = iconSizes.lg | iconSizes.xxl }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity>
      <MaterialIcons name={'skip-next'} size={size} color={colors.frost} />
    </TouchableOpacity>
  );
};

export default NextButton;
