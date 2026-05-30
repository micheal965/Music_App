import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { useTheme } from '@/theme';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ToggleShuffleButton = () => {
  const { colors } = useTheme();
  const isShuffled = true;
  return (
    <TouchableOpacity>
      <MaterialIcon
        name={isShuffled ? 'shuffle' : 'unshuffle'}
        color={colors.sky}
        size={iconSizes.md}
      />
    </TouchableOpacity>
  );
};

export default ToggleShuffleButton;
