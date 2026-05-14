import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {palette} from '../theme';

type Props = {
  children: React.ReactNode;
  icon?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Pill({children, icon, style, textStyle}: Props) {
  return (
    <View style={[styles.pill, style]}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text numberOfLines={1} style={[styles.text, textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(3, 160, 210, 0.18)',
    borderColor: palette.line,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 5,
    minHeight: 26,
    paddingHorizontal: 10,
  },
  icon: {
    color: palette.cyan,
    fontSize: 11,
  },
  text: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '700',
  },
});
