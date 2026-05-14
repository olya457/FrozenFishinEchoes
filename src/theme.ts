import {Platform} from 'react-native';

export const palette = {
  text: '#d8f5ff',
  muted: '#82a8bd',
  dim: '#4c6b80',
  cyan: '#05d8ff',
  blue: '#129dea',
  panel: 'rgba(2, 18, 38, 0.82)',
  panelStrong: 'rgba(5, 24, 51, 0.94)',
  panelSoft: 'rgba(7, 42, 72, 0.62)',
  line: 'rgba(24, 203, 255, 0.28)',
  whiteLine: 'rgba(207, 244, 255, 0.12)',
  danger: '#ff5770',
  success: '#18d59d',
};

export const androidEdge = 30;
export const navGap = Platform.OS === 'android' ? 30 : 20;
export const navHeight = 74;
export const navLift = navGap + navHeight + 24;
export const topInset = Platform.OS === 'android' ? androidEdge : 0;
