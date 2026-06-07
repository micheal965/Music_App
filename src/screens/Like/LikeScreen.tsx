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
import RowedSongCardWithCategory from '@/components/molecules/RowedSongCardWithCategory/RowedSongCardWithCategory';
import { useAudioPlayer } from '@/contexts/AudioContext';
import { useLikedSongs } from '@/contexts/LikedSongsContext';
import { SongType } from '@/Constants/SongType';

const LikeScreen = () => {
  const navigation = useNavigation<Nav>();
  const { playSong } = useAudioPlayer();
  const { likedSongs } = useLikedSongs();

  const { colors, gutters, layout } = useTheme();
  const styles = useMemo(
    () => createStyles(colors, gutters, layout),
    [colors, gutters, layout],
  );

  const handleSongPress = (song: SongType) => {
    // Play the selected song with liked songs as the queue
    playSong(song, likedSongs);
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
      {likedSongs.length > 0 ? (
        <RowedSongCardWithCategory
          title="Liked Songs"
          songs={likedSongs}
          horizontal
          numOfColumns={1}
          onSongPress={handleSongPress}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AntDesign name="hearto" size={64} color={colors.sky} />
          <Text style={styles.emptyText}>No liked songs yet</Text>
          <Text style={styles.emptySubText}>
            Songs you like will appear here
          </Text>
        </View>
      )}
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
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
    emptyText: {
      fontSize: fontSizes.xl,
      color: colors.frost,
      fontFamily: fontFamilies.bold,
    },
    emptySubText: {
      fontSize: fontSizes.md,
      color: colors.sky,
      fontFamily: fontFamilies.regular,
    },
  });

export default LikeScreen;
