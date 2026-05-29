import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PreviousButton = ({ size = iconSizes.lg }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity>
      <MaterialIcons name={'skip-previous'} size={size} color={colors.frost} />
    </TouchableOpacity>
  );
};
export default PreviousButton;
