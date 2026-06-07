import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import { useTheme } from '@/theme';
import { Gutters } from '@/theme/types/gutters';
import { Borders } from '@/theme/types/borders';
import { SongType } from '@/Constants/SongType';

type SongCardProps = {
  song: SongType;
  width?: number;
  onPress?: () => void;
};

const SongCard = ({ song, width, onPress }: SongCardProps) => {
  const { colors, gutters, borders } = useTheme();

  const styles = useMemo(
    () => createStyles(colors, gutters, borders),
    [colors, gutters, borders],
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, width ? { width } : undefined]}
    >
      <View style={styles.cardContainer}>
        <Image source={{ uri: song.artwork }} style={styles.coverImage} />
        <Text numberOfLines={1} style={styles.title}>
          {song.title}
        </Text>
        <Text numberOfLines={1} style={styles.author}>
          {song.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any, gutters: Gutters, borders: Borders) =>
  StyleSheet.create({
    container: {
      height: 250,
      width: 200,
    },
    cardContainer: {
      flex: 1,
      alignItems: 'center',
    },
    coverImage: {
      width: '95%',
      height: 160,
      ...borders.rounded_12,
      backgroundColor: colors.purple100,
    },
    title: {
      color: colors.frost,
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.md,
      ...gutters.paddingTop_12,
      width: '90%',
      textAlign: 'center',
    },
    author: {
      color: colors.sky,
      fontSize: fontSizes.sm,
      fontFamily: fontFamilies.regular,
      width: '90%',
      textAlign: 'center',
    },
  });

export default SongCard;
