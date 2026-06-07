import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/theme';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import type { Gutters } from '@/theme/types/gutters';
import type { Borders } from '@/theme/types/borders';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { SongType } from '@/Constants/SongType';

type RowedSongCardProps = {
  song: SongType;
  onPress?: () => void;
  onDelete?: () => void;
};

const RowedSongCard = ({ song, onPress, onDelete }: RowedSongCardProps) => {
  const { colors, gutters, borders, layout } = useTheme();

  const styles = useMemo(
    () => createStyles(colors,gutters, borders),
    [colors,gutters, borders],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.cardContainer,
        layout.row,
        layout.itemsCenter,
        gutters.padding_6,
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: song.artwork }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={[layout.flex_1, gutters.marginLeft_16]}>
        <Text numberOfLines={1} style={styles.title}>
          {song.title}
        </Text>
        <View style={[layout.row, layout.justifyBetween, layout.itemsCenter]}>
          <Text numberOfLines={1} style={styles.artist}>
            {song.artist}
          </Text>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <MaterialIcons
                name="delete-outline"
                color={colors.red500}
                size={iconSizes.sm}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: any, gutters: Gutters, borders: Borders) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.cardPlaceholder,
      borderRadius: 12,
      ...gutters.marginBottom_4
    },
    imageContainer: {
      width: 74,
      height: 74,
      ...borders.rounded_12,
      overflow: 'hidden',
      backgroundColor: colors.midnight,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    title: {
      color: colors.frost,
      fontFamily: fontFamilies.semiBold,
      fontSize: fontSizes.md,
      marginBottom: 4,
    },
    artist: {
      color: colors.sky,
      fontFamily: fontFamilies.regular,
      fontSize: fontSizes.sm,
      flex: 1,
    },
    deleteButton: {
      padding: 4,
    },
  });

export default RowedSongCard;
