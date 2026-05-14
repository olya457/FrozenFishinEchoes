import {useWindowDimensions} from 'react-native';

export function useMetrics() {
  const {width, height} = useWindowDimensions();
  const compact = width < 370 || height < 720;
  const narrow = width < 340;

  return {
    width,
    height,
    compact,
    narrow,
    pad: compact ? 16 : 20,
    cardRadius: compact ? 18 : 22,
  };
}
