import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/theme';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import { Gutters } from '@/theme/types/gutters';
import PreviousButton from '@/components/atoms/PlayerControls/PreviousButton';
import PlayButton from '@/components/atoms/PlayerControls/PlayPauseButton';
import NextButton from '@/components/atoms/PlayerControls/NextButton';
import ProgressBar from '@/components/atoms/PlayerControls/ProgressBar';
import MovingText from '@/components/atoms/MovingText/MovingText';
import { Paths } from '@/navigation/paths';
import { useNavigation } from '@react-navigation/core';
import { Nav } from '@/Constants/types';
import { iconSizes } from '@/theme/Constants/iconSizes';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/085/325x325/devaste-1776124867-AtI72sytQ6.png';

const FloatingPlayer = () => {
  const navigation = useNavigation<Nav>();
  const { colors, gutters } = useTheme();

  const styles = useMemo(
    () => createStyles(colors, gutters),
    [colors, gutters],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate(Paths.Player)}
    >
      <ProgressBar progress={0.3} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image source={{ uri: imageUrl }} style={styles.coverImage} />
          <View style={styles.titleContainer}>
            <MovingText
              text={'Monster Go Home'}
              animationThreshold={15}
              style={styles.title}
            />
            <Text style={styles.artist}>Alan Walker</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <PreviousButton size={iconSizes.lg} />
          <PlayButton size={iconSizes.lg} />
          <NextButton size={iconSizes.lg} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;

const createStyles = (colors: any, gutters: Gutters) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    coverImage: {
      height: 50,
      width: 50,
    },
    titleContainer: {
      flex: 1,
      overflow: 'hidden',
      ...gutters.marginLeft_8,
      ...gutters.paddingTop_6,
      ...gutters.gap_2,
    },
    title: {
      color: colors.frost,
      fontSize: fontSizes.md,
      fontFamily: fontFamilies.medium,
    },
    artist: {
      color: colors.sky,
      fontSize: fontSizes.sm,
    },
    controlsContainer: {
      flexDirection: 'row',
      ...gutters.gap_12,
      ...gutters.paddingRight_16,
    },
  });
