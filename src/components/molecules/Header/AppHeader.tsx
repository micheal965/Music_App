import { TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';

//icons
const AppHeader = () => {
  const { colors, layout } = useTheme();

  return (
    <View style={[layout.row, layout.justifyBetween]}>
      <TouchableOpacity>
        <FontAwesome5
          name={'grip-lines'}
          color={colors.frost}
          size={iconSizes.lg}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <EvilIcons name={'search'} color={colors.frost} size={iconSizes.lg} />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;
