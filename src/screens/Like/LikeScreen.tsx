import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { Gutters } from '@/theme/types/gutters';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import { SafeScreen } from '@/components/templates';

import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '@/Constants/AppTypes';
import { songsWithCategory } from '@/data/songsWithCategory';
import RowedSongCardWithCategory from '@/components/molecules/RowedSongCardWithCategory/RowedSongCardWithCategory';
import { useAudioPlayer } from '@/contexts/AudioContext';
import { SongType } from '@/Constants/SongType';

const LikeScreen = () => {
  const navigation = useNavigation<Nav>();
  const { playSong } = useAudioPlayer();

  const { colors, gutters, layout } = useTheme();
  const styles = useMemo(
    () => createStyles(colors, gutters, layout),
    [colors, gutters, layout],
  );

  const handleSongPress = (song: SongType) => {
    // Play the selected song with liked songs as the queue
    playSong(song, songsWithCategory[1].songs);
  };

  return (
    <SafeScreen style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            color={colors.frost}
            size={iconSizes.md}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <SimpleLineIcons
            name="equalizer"
            color={colors.frost}
            size={iconSizes.sm}
          />
        </TouchableOpacity>
      </View>
      <RowedSongCardWithCategory
        title={songsWithCategory[1].title}
        songs={songsWithCategory[1].songs}
        horizontal
        numOfColumns={1}
        onSongPress={handleSongPress}
      />
    </SafeScreen>
  );
};

const createStyles = (colors: any, gutters: Gutters, layout: any) =>
  StyleSheet.create({
    container: {
      ...layout.flex_1,
      backgroundColor: colors.midnight,
      ...gutters.padding_16,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...gutters.paddingBottom_16,
    },
    headingText: {
      fontSize: fontSizes.xl,
      color: colors.frost,
      fontFamily: fontFamilies.bold,
      ...gutters.paddingVertical_12,
    },
  });

export default LikeScreen;
