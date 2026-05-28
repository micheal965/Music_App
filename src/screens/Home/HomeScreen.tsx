import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';
import AppHeader from '@/components/molecules/Header/AppHeader';
import { fontFamilies } from '@/theme/Constants/fonts';

const HomeScreen = () => {
  const { layout, colors, changeTheme, variant, gutters, components } =
    useTheme();

  const styles = useMemo(
    () => createStyles(colors, gutters, layout),
    [colors, gutters, layout],
  );

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <Text style={styles.headingText}>Recommended for you</Text>
      <TouchableOpacity
        onPress={onChangeTheme}
        style={[components.buttonCircle, gutters.marginBottom_16]}
        testID="change-theme-button"
      >
        <IconByVariant path="theme" stroke={colors.purple500} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: any, gutters: any, layout: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.midnight,
      ...layout.flex_1,
      ...gutters.padding_16,
    },
    headingText: {
      fontSize: 25,
      color: colors.frost,
      fontFamily: fontFamilies.regular,
    },
  });

export default HomeScreen;
