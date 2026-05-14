import React, {useMemo} from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {AppBackground} from './AppBackground';
import {useMetrics} from '../hooks/useMetrics';
import {navLift} from '../theme';

type Props = {
  children: React.ReactNode;
  withNav?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function ScreenScroll({children, withNav = true, contentStyle}: Props) {
  const metrics = useMetrics();
  const dynamicContentStyle = useMemo<ViewStyle>(
    () => ({
      paddingBottom: withNav ? navLift : 34,
      paddingHorizontal: metrics.pad,
    }),
    [metrics.pad, withNav],
  );

  return (
    <AppBackground>
      <ScrollView
        bounces
        contentContainerStyle={[
          styles.content,
          dynamicContentStyle,
          contentStyle,
        ]}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </AppBackground>
  );
}

export function ScreenFixed({children}: {children: React.ReactNode}) {
  return (
    <AppBackground>
      <View style={styles.fixed}>{children}</View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 18,
  },
  fixed: {
    flex: 1,
  },
});
