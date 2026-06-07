import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { iconSizes } from '@/theme/Constants/iconSizes';
import { useTheme } from '@/theme';
import { Gutters } from '@/theme/types/gutters';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import { SafeScreen } from '@/components/templates';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '@/Constants/AppTypes';

import ToggleMuteButton from '@/components/atoms/PlayerControls/ToggleMuteButton';
import ToggleRepeatButton from '@/components/atoms/PlayerControls/ToggleRepeatButton';
import ToggleShuffleButton from '@/components/atoms/PlayerControls/ToggleShuffleButton';
import ProgressBar from '@/components/atoms/PlayerControls/ProgressBar';
import PreviousButton from '@/components/atoms/PlayerControls/PreviousButton';
import PlayButton from '@/components/atoms/PlayerControls/PlayPauseButton';
import NextButton from '@/components/atoms/PlayerControls/NextButton';
import { useAudioPlayer } from '@/contexts/AudioContext';
import { useLikedSongs } from '@/contexts/LikedSongsContext';
import { formatTime } from '@/utils/formatTime';

const placeHolderImage =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/061/325x325/com-bota-1771513264-f9unBALkU6.jpg';

const PlayerScreen = () => {
  const navigation = useNavigation<Nav>();
  const { colors, gutters } = useTheme();
  const { currentTrack, position, duration } = useAudioPlayer();
  const { isLiked, toggleLike } = useLikedSongs();
  const styles = useMemo(
    () => createStyles(colors, gutters),
    [colors, gutters],
  );

  const handleToggleLike = () => {
    if (currentTrack) {
      toggleLike(currentTrack);
    }
  };

  const trackIsLiked = currentTrack ? isLiked(currentTrack.url) : false;

  return (
    <SafeScreen style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="arrowleft"
            size={iconSizes.lg}
            color={colors.frost}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>PLAYING NOW</Text>
      </View>

      {/* Content */}
      <View>
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: currentTrack?.artwork || placeHolderImage }}
            style={styles.coverImage}
          />
        </View>

        <View style={styles.contentHeartRowContainer}>
          <View>
            <Text style={styles.title}>
              {currentTrack?.title || 'No track playing'}
            </Text>
            <Text style={styles.artist}>
              {currentTrack?.artist?.toUpperCase() || 'UNKNOWN ARTIST'}
            </Text>
          </View>
          <TouchableOpacity style={styles.rightIcon} onPress={handleToggleLike}>
            <AntDesign
              name={trackIsLiked ? 'heart' : 'hearto'}
              size={iconSizes.md}
              color={trackIsLiked ? colors.purple500 : colors.frost}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.controlsRow}>
          <ToggleMuteButton />
          <View style={styles.rightControls}>
            <ToggleRepeatButton />
            <ToggleShuffleButton />
          </View>
        </View>

        <View style={styles.sliderContainer}>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
          <ProgressBar />
        </View>
        <View style={styles.playerControlsContainer}>
          <PreviousButton size={iconSizes.xxl} />
          <PlayButton size={iconSizes.xxl} />
          <NextButton size={iconSizes.xxl} />
        </View>
      </View>
    </SafeScreen>
  );
};

const createStyles = (colors: any, gutters: Gutters) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.midnight,
      ...gutters.padding_16,
    },

    // Header
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      ...gutters.padding_16,
    },
    leftIcon: {
      position: 'absolute',
      left: 0,
    },
    headerText: {
      color: colors.frost,
      fontSize: fontSizes.lg,
      fontWeight: '600',
      letterSpacing: 1,
    },

    // Content
    coverImageContainer: {
      alignItems: 'center',
    },
    coverImage: {
      width: 300,
      height: 300,
      borderRadius: 4,
      resizeMode: 'cover',
    },

    contentHeartRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.frost,
      marginTop: 16,
      textAlign: 'center',
    },
    artist: {
      fontSize: 14,
      color: colors.sky,
      textTransform: 'uppercase',
    },
    rightIcon: {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: [{ translateY: -5 }],
    },
    controlsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    rightControls: {
      flexDirection: 'row',
      gap: 12,
    },
    sliderContainer: {
      marginTop: 20,
      gap: 8,
    },
    timeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeText: {
      color: colors.frost,
      fontFamily: fontFamilies.regular,
      fontSize: fontSizes.md,
    },
    playerControlsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24,
      paddingTop: 24,
    },
  });

export default PlayerScreen;
