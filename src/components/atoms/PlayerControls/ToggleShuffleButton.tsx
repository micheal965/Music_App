import { TouchableOpacity } from 'react-native';
import React from 'react';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { useTheme } from '@/theme';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useAudioPlayer } from '@/contexts/AudioContext';

const ToggleShuffleButton = () => {
  const { colors } = useTheme();
  const { isShuffled, toggleShuffle } = useAudioPlayer();

  return (
    <TouchableOpacity onPress={toggleShuffle}>
      <MaterialIcon
        name={isShuffled ? 'shuffle' : 'shuffle'}
        color={isShuffled ? colors.frost : colors.sky}
        size={iconSizes.md}
      />
    </TouchableOpacity>
  );
};

export default ToggleShuffleButton;
