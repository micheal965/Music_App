import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import { Gutters } from '@/theme/types/gutters';
import { useTheme } from '@/theme';
import RowedSongCard from '../RowedSongCard/RowedSongCard';
import { SongType } from '@/Constants/SongType';

type RowedSongCardWithCategoryProps = {
  title: string;
  songs: SongType[];
  horizontal?: boolean;
  numOfColumns?: number;
  onSeeAll?: () => void;
  onSongPress?: (song: SongType) => void;
};

const RowedSongCardWithCategory = ({
  title,
  songs,
  numOfColumns,
  onSeeAll,
  onSongPress,
}: RowedSongCardWithCategoryProps) => {
  const { colors, gutters, layout } = useTheme();
  const styles = useMemo(
    () => createStyles(colors, gutters),
    [colors, gutters],
  );

  let cardWidth = 0;
  if (numOfColumns) {
    const screenWidth = Dimensions.get('window').width;
    cardWidth = (screenWidth - 45) / numOfColumns;
  }

  return (
    <View style={gutters.marginBottom_24}>
      <View
        style={[
          layout.row,
          layout.justifyBetween,
          layout.itemsCenter,
          gutters.paddingHorizontal_2,
          gutters.paddingBottom_12,
        ]}
      >
        <Text style={styles.headingText}>{title}</Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={songs}
        numColumns={numOfColumns}
        renderItem={({ item }) => (
          <RowedSongCard song={item} onPress={() => onSongPress?.(item)} />
        )}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (colors: any, gutters: Gutters) =>
  StyleSheet.create({
    headingText: {
      fontSize: fontSizes.xl,
      color: colors.frost,
      fontFamily: fontFamilies.bold,
    },
    seeAllText: {
      color: colors.sky,
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.sm,
    },
  });

export default RowedSongCardWithCategory;
