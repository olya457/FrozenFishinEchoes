import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {AppBackground} from '../components/AppBackground';
import {assets} from '../data/content';

export function SplashScreen() {
  return (
    <AppBackground>
      <View style={styles.center}>
        <Image
          source={assets.tentBadge}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 246,
    width: 246,
  },
});
