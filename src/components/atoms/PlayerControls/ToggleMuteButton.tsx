import React from 'react';
import { TouchableOpacity } from 'react-native';
import { iconSizes } from '@/theme/Constants/iconSizes';

import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@/theme';

const ToggleMuteButton = () => {
  const isMuted = false;
  const { colors } = useTheme();

  return (
    <TouchableOpacity>
      <Feather
        name={isMuted ? 'volume-x' : 'volume-1'}
        color={colors.sky}
        size={iconSizes.md}
      />
    </TouchableOpacity>
  );
};

export default ToggleMuteButton;
