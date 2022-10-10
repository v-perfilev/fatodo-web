import {COLORS, GRADIENT_COLORS} from './colors';

export const defaultTypography = {
  fontFamily: 'Roboto, serif',
};

export const defaultPalette = {
  primary: {
    main: COLORS.TURQUOISE,
    contrastText: COLORS.WHITE,
  },
  secondary: {
    main: COLORS.YELLOW,
    contrastText: COLORS.WHITE,
  },
  tertiary: {
    main: COLORS.TURQUOISE,
    contrastText: COLORS.WHITE,
  },
  info: {
    main: COLORS.INFO,
    contrastText: COLORS.WHITE,
  },
  success: {
    main: COLORS.SUCCESS,
    contrastText: COLORS.WHITE,
  },
  warning: {
    main: COLORS.WARNING,
    contrastText: COLORS.WHITE,
  },
  error: {
    main: COLORS.ERROR,
    contrastText: COLORS.WHITE,
  },
  text: {
    primary: COLORS.BLACK,
  },
  background: {
    default: COLORS.WHITE,
  },
  gradient: GRADIENT_COLORS.YELLOW,
};

export const yellowPalette = {
  ...defaultPalette,
  primary: {
    main: COLORS.TURQUOISE,
    contrastText: COLORS.WHITE,
  },
  secondary: {
    main: COLORS.YELLOW,
    contrastText: COLORS.WHITE,
  },
  tertiary: {
    main: COLORS.YELLOW,
    contrastText: COLORS.WHITE,
  },
  gradient: GRADIENT_COLORS.YELLOW,
};

export const turquoisePalette = {
  ...defaultPalette,
  primary: {
    main: COLORS.TURQUOISE,
    contrastText: COLORS.WHITE,
  },
  secondary: {
    main: COLORS.YELLOW,
    contrastText: COLORS.WHITE,
  },
  tertiary: {
    main: COLORS.TURQUOISE,
    contrastText: COLORS.WHITE,
  },
  gradient: GRADIENT_COLORS.TURQUOISE,
};

export const purplePalette = {
  ...defaultPalette,
  primary: {
    main: COLORS.PURPLE,
    contrastText: COLORS.WHITE,
  },
  secondary: {
    main: COLORS.YELLOW,
    contrastText: COLORS.WHITE,
  },
  tertiary: {
    main: COLORS.PURPLE,
    contrastText: COLORS.WHITE,
  },
  gradient: GRADIENT_COLORS.PURPLE,
};

export const greenPalette = {
  ...defaultPalette,
  primary: {
    main: COLORS.GREEN,
    contrastText: COLORS.WHITE,
  },
  secondary: {
    main: COLORS.YELLOW,
    contrastText: COLORS.WHITE,
  },
  tertiary: {
    main: COLORS.GREEN,
    contrastText: COLORS.WHITE,
  },
  gradient: GRADIENT_COLORS.GREEN,
};

export const bluePalette = {
  ...defaultPalette,
  primary: {
    main: COLORS.BLUE,
    contrastText: COLORS.WHITE,
  },
  secondary: {
    main: COLORS.YELLOW,
    contrastText: COLORS.WHITE,
  },
  tertiary: {
    main: COLORS.BLUE,
    contrastText: COLORS.WHITE,
  },
  gradient: GRADIENT_COLORS.BLUE,
};
