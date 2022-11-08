import { DefaultTheme } from '@react-navigation/native';

const tintColorLight = '#1d1b30';
const tintColorDark = '#2f95dc';
const textColorLight = '#454f6b';

const lightColors = {
  text: textColorLight,
  subText: "#929499",
  linkText: "#388091",
  background: "#fff",
  calendarBackground: "f2f7fb",
  tint: tintColorLight,
  card: 'white',
  tabBackground: "#FFFFFF",
  tabIconActive: tintColorLight,
  tabIconInactive: '#a0a4b3',

  shadow: '#d8d8d8',
  headerTitle: textColorLight,
  headerTintColor: textColorLight,
  headerBackground: "white",
  viewBackground: 'white',
  icon: '#454f6b',
}

const darkColors = {
  text: '#fff',
  subText: "#929499",
  linkText: "#388091",
  background: '#1f2937',
  calendarBackground: "#1B1D22",
  tint: tintColorDark,
  card: '#292C3A',
  tabBackground: '#292C3A',
  tabIconActive: tintColorDark,
  tabIconInactive: '#ccc',

  shadow: 'transparent',
  headerTitle: '#fff',
  headerTintColor: 'white',
  headerBackground: '#282c3a',
  viewBackground: 'coolGray.800',
  icon: 'gray.200',
}

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...lightColors,
  },
};

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...darkColors,
  },
}

export default {
  light: lightColors,
  dark: darkColors,
};