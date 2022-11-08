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

export const calendarColors = [
  "#e84330",
  "#ff836f",
  "#f49d38",
  "#f8d100",
  "#4a9e28",
  "#008f6a",
  "#007d94",
  "#0667cc",
  "#1d3895",
  "#292662",
];

export const brightCalendarColors = [
  "#e7b5b0",
  "#ffddd7",
  "#f3d7b6",
  "#f6e89c",
  "#9ebc92",
  "#7baa9e",
  "#799ca2",
  "#93b6da",
  "#8a96c2",
  "#7e7ca6",
];

export const calendarColorsForDarkMode = [
  "#9e0142",
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#fee08b",
  "#e6f598",
  "#abdda4",
  "#66c2a5",
  "#3288bd",
  "#5e4fa2",
];