import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import { useTheme } from '@/theme';
import { Gutters } from '@/theme/types/gutters';
import { Borders } from '@/theme/types/borders';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/002/090/325x325/back2u-1777474859-WXPpBcDkbv.png';

const SongCard = () => {
  const { colors, gutters, borders } = useTheme();
  const styles = useMemo(
    () => createStyles(colors, gutters, borders),
    [colors, gutters, borders],
  );

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: imageUrl }} style={styles.coverImage} />
        <Text style={styles.title}>Monster Go home</Text>
        <Text style={styles.author}>Alan walker</Text>
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
      width: 175,
      height: 175,
      alignItems: 'center',
    },
    coverImage: {
      width: '100%',
      height: '100%',
      ...borders.rounded_8,
    },
    title: {
      color: colors.frost,
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.lg,
      ...gutters.paddingTop_16,
    },
    author: {
      color: colors.sky,
      fontSize: fontSizes.md,
      fontFamily: fontFamilies.regular,
    },
  });

export default SongCard;
