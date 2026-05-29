import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import SongCard from '@/components/molecules/SongCard/SongCard';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import { Gutters } from '@/theme/types/gutters';
import { useTheme } from '@/theme';

const SongCardWithCategory = () => {
  const { layout, colors, gutters } = useTheme();

  const styles = useMemo(
    () => createStyles(colors, gutters, layout),
    [colors, gutters, layout],
  );
  return (
    <View>
      <Text style={styles.headingText}>Recommended for you</Text>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        ListHeaderComponent={<></>}
        renderItem={() => <SongCard />}
        horizontal
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (colors: any, gutters: Gutters, layout: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.midnight,
      ...layout.flex_1,
      ...gutters.padding_16,
    },
    headingText: {
      fontSize: fontSizes.xl,
      color: colors.frost,
      fontFamily: fontFamilies.semiBold,
      ...gutters.paddingVertical_16,
    },
  });

export default SongCardWithCategory;
