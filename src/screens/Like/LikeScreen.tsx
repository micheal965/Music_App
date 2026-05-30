import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/theme';
import { iconSizes } from '@/theme/Constants/iconSizes';
import { Gutters } from '@/theme/types/gutters';
import { fontFamilies, fontSizes } from '@/theme/Constants/fonts';
import SongCardWithCategory from '@/components/molecules/SongCardWithCategory/SongCardWithCategory';
import { SafeScreen } from '@/components/templates';

import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { Nav } from '@/Constants/types';

const LikeScreen = () => {
  const navigation = useNavigation<Nav>();

  const { colors, gutters, layout } = useTheme();
  const styles = useMemo(
    () => createStyles(colors, gutters, layout),
    [colors, gutters, layout],
  );

  return (
    <SafeScreen style={styles.container}>
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <SongCardWithCategory
            title="Liked Songs"
            horizontal={false}
            numOfColumns={2}
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                color={colors.frost}
                size={iconSizes.md}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <SimpleLineIcons
                name="equalizer"
                color={colors.frost}
                size={iconSizes.sm}
              />
            </TouchableOpacity>
          </View>
        }
      />
    </SafeScreen>
  );
};

const createStyles = (colors: any, gutters: Gutters, layout: any) =>
  StyleSheet.create({
    container: {
      ...layout.flex_1,
      backgroundColor: colors.midnight,
      ...gutters.padding_16,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headingText: {
      fontSize: fontSizes.xl,
      color: colors.frost,
      fontFamily: fontFamilies.bold,
      ...gutters.paddingHorizontal_8,
      ...gutters.paddingVertical_16,
    },
  });

export default LikeScreen;
