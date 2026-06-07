import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import type { ThemeConfiguration } from '@/theme/types/config';

export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  gray100: '#E8E8E8',
  gray200: '#B8B8B8',
  gray400: '#6B6B6B',
  gray50: '#F8F9FC',
  gray800: '#2A2A2A',
  purple100: '#E8E7F5',
  purple50: '#F3F2FB',
  purple500: '#5B4DC7',
  red500: '#E74C3C',
  skeleton: '#D1D1D6',

  midnight: '#FFFFFF', // background - clean white
  frost: '#1A1A2E', // primary text, primary icon - deep dark
  sky: '#5E6272', // secondary text - muted gray
  mutedBlue: '#9BA3C4', // secondary icon - soft blue-gray
  cardPlaceholder: '#F5F6FA', // card background - subtle off-white
} as const;

const colorsDark = {
  gray100: '#000000',
  gray200: '#BABABA',
  gray400: '#969696',
  gray50: '#EFEFEF',
  gray800: '#E0E0E0',
  purple100: '#252732',
  purple50: '#1B1A23',
  purple500: '#A6A4F0',
  red500: '#C13333',
  skeleton: '#303030',

  midnight: '#091227', //background
  frost: '#EAF0FF', //textprimary,iconprimary
  sky: '#A5C0FF', //textsecondary
  mutedBlue: '#8996B8', //iconsecondary
  cardPlaceholder: '#16213D',
} as const;

const sizes = [0, 1, 2, 4, 6, 8, 12, 16, 24, 32, 40, 80] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: sizes,
    widths: sizes,
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.midnight,
    card: colorsLight.midnight,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.purple50,
        card: colorsDark.purple50,
      },
    },
  },
} as const satisfies ThemeConfiguration;
