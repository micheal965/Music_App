import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import SongCard from '@/components/molecules/SongCard/SongCard';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import { Gutters } from '@/theme/types/gutters';
import { useTheme } from '@/theme';

type SongCardWithCategoryProps = {
  title: string;
  horizontal?: boolean;
  numOfColumns?: number;
};

const SongCardWithCategory = ({
  title,
  horizontal = true,
  numOfColumns,
}: SongCardWithCategoryProps) => {
  const { colors, gutters } = useTheme();
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
    <View>
      <Text style={styles.headingText}>{title}</Text>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        horizontal={horizontal}
        numColumns={horizontal ? 1 : numOfColumns}
        columnWrapperStyle={
          !horizontal ? { justifyContent: 'space-between' } : undefined
        }
        renderItem={() => (
          <SongCard width={!horizontal ? cardWidth : undefined} />
        )}
        keyExtractor={(item) => item.toString()}
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
      ...gutters.paddingVertical_16,
      ...gutters.paddingHorizontal_2,
    },
  });

export default SongCardWithCategory;
