import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {assets} from '../data/content';
import {topInset} from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppBackground({children, style}: Props) {
  return (
    <ImageBackground
      source={assets.backgroundIce}
      resizeMode="cover"
      style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView style={[styles.safe, {paddingTop: topInset}, style]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#00111f',
  },
  safe: {
    flex: 1,
  },
});
