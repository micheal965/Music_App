import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useTheme } from '@/theme';
import AppHeader from '@/components/molecules/Header/AppHeader';
import { Gutters } from '@/theme/types/gutters';
import SongCardWithCategory from '@/components/molecules/SongCardWithCategory/SongCardWithCategory';
import FloatingPlayer from '@/components/molecules/FloatingPlayer/FloatingPlayer';
import { SafeScreen } from '@/components/templates';
import RowedSongCardWithCategory from '@/components/molecules/RowedSongCardWithCategory/RowedSongCardWithCategory';
import { songsWithCategory } from '@/data/songsWithCategory';
import { useAudioPlayer } from '@/contexts/AudioContext';
import { recommendedSongs } from '@/data/songs';
import { SongType } from '@/Constants/SongType';

const HomeScreen = () => {
  const { layout, colors, gutters } = useTheme();
  const { loadQueue, playSong, isPlayerReady } = useAudioPlayer();

  const styles = useMemo(
    () => createStyles(colors, gutters, layout),
    [colors, gutters, layout],
  );

  useEffect(() => {
    // Wait for player to be ready before loading queue
    if (isPlayerReady) {
      console.log('Player ready, loading initial queue');
      loadQueue(recommendedSongs);
    }
  }, [isPlayerReady]);

  const handleSongPress = (song: SongType, categoryId: number) => {
    // Find the category to get the full song list
    const category = songsWithCategory.find(cat => cat.id === categoryId);
    if (category) {
      // Play the selected song with its category as the queue
      playSong(song, category.songs);
    }
  };

  return (
    <SafeScreen style={styles.wrapper}>
      <View style={styles.container}>
        <AppHeader />
        <FlatList
          data={songsWithCategory}
          renderItem={({ item }) => (
            <View>
              {item.id > 2 ? (
                <RowedSongCardWithCategory
                  title={item.title}
                  songs={item.songs}
                  horizontal
                  numOfColumns={1}
                  onSeeAll={() => console.log(`See all ${item.title}`)}
                  onSongPress={(song) => handleSongPress(song, item.id)}
                />
              ) : (
                <SongCardWithCategory
                  title={item.title}
                  songs={item.songs}
                  horizontal
                  numOfColumns={1}
                  onSeeAll={() => console.log(`See all ${item.title}`)}
                  onSongPress={(song) => handleSongPress(song, item.id)}
                />
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={gutters.paddingBottom_80} />}
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
    },
  });

export default HomeScreen;
