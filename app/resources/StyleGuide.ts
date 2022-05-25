import { PixelRatio, TextStyle, ViewStyle } from 'react-native';

export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

const fontWeight: {
  [name in
    | 'THIN'
    | 'EXTRA_LIGHT'
    | 'LIGHT'
    | 'NORMAL'
    | 'MEDIUM'
    | 'SEMI_BOLD'
    | 'BOLD'
    | 'EXTRA_BOLD'
    | 'HEAVY']: FontWeight;
} = {
  THIN: '100',
  EXTRA_LIGHT: '200',
  LIGHT: '300',
  NORMAL: '400',
  MEDIUM: '500',
  SEMI_BOLD: '600',
  BOLD: '700',
  EXTRA_BOLD: '800',
  HEAVY: '800',
};

export enum TypographyTypes {
  REGULAR10 = 'REGULAR10',
  REGULAR12 = 'REGULAR12',
  REGULAR13 = 'REGULAR13',
  REGULAR14 = 'REGULAR14',
  REGULAR15 = 'REGULAR15',
  REGULAR16 = 'REGULAR16',
  REGULAR17 = 'REGULAR17',
  REGULAR18 = 'REGULAR18',
  REGULAR20 = 'REGULAR20',
  REGULAR24 = 'REGULAR24',
  REGULAR32 = 'REGULAR32',
}

const typography: { [key in TypographyTypes]: TextStyle } = {
  [TypographyTypes.REGULAR10]: {
    fontSize: 10,
  },
  [TypographyTypes.REGULAR12]: {
    fontSize: 12,
  },
  [TypographyTypes.REGULAR13]: {
    fontSize: 13,
  },
  [TypographyTypes.REGULAR14]: {
    fontSize: 14,
  },
  [TypographyTypes.REGULAR15]: {
    fontSize: 15,
  },
  [TypographyTypes.REGULAR16]: {
    fontSize: 16,
  },
  [TypographyTypes.REGULAR17]: {
    fontSize: 17,
  },
  [TypographyTypes.REGULAR18]: {
    fontSize: 18,
  },
  [TypographyTypes.REGULAR20]: {
    fontSize: 20,
  },
  [TypographyTypes.REGULAR24]: {
    fontSize: 24,
  },
  [TypographyTypes.REGULAR32]: {
    fontSize: 32,
  },
};

const palette = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  overlay: '#00000080',
  separator: '#F6F6F7',
  pink: '#E6345E',
  background: '#f2f2f2',
  gray: '#CCCDD3',
  calendarDisactive: '#d9e1e8',
  dark_grey: '#989FA6',
  darkness_grey: '#6D6D78',
  blue: '#007AFF',
  orange: '#FF5A5A',
  light_gray: '#EAEEF1',
  yellow: '#FFC453',
  green: '#53BC64',
};

export const StyleGuide = {
  shadow: {
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  } as ViewStyle,
  halfPixelBorderWidth: PixelRatio.roundToNearestPixel(0.5),
  fontWeight,
  palette,
  typography,
};
