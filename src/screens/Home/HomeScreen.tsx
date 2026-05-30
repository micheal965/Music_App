import { FlatList, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/theme';
import AppHeader from '@/components/molecules/Header/AppHeader';
import { Gutters } from '@/theme/types/gutters';
import SongCardWithCategory from '@/components/molecules/SongCardWithCategory/SongCardWithCategory';
import FloatingPlayer from '@/components/molecules/FloatingPlayer/FloatingPlayer';
import { SafeScreen } from '@/components/templates';

const HomeScreen = () => {
  const { layout, colors, gutters } = useTheme();

  const styles = useMemo(
    () => createStyles(colors, gutters, layout),
    [colors, gutters, layout],
  );

  return (
    <SafeScreen style={styles.wrapper}>
      <View style={styles.container}>
        <AppHeader />
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => (
            <SongCardWithCategory
              title={'Recommended for you'}
              horizontal
              numOfColumns={1}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FloatingPlayer />
    </SafeScreen>
  );
};

const createStyles = (colors: any, gutters: Gutters, layout: any) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      backgroundColor: colors.midnight,
      ...layout.flex_1,
      ...gutters.padding_16,
      ...gutters.paddingBottom_0,
    },
  });

export default HomeScreen;
