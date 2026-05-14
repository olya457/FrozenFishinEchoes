import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {TabKey} from '../types';
import {navGap, navHeight, palette} from '../theme';

type Props = {
  active: TabKey;
  onSelect: (tab: TabKey) => void;
};

const items: {key: TabKey; label: string; icon: string}[] = [
  {key: 'explore', label: 'Explore', icon: '🏠'},
  {key: 'map', label: 'Map', icon: '🗺️'},
  {key: 'stories', label: 'Stories', icon: '📘'},
  {key: 'quiz', label: 'Quiz', icon: '❔'},
  {key: 'saved', label: 'Saved', icon: '🔖'},
];

export function BottomNav({active, onSelect}: Props) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.bar}>
        {items.map(item => {
          const selected = item.key === active;

          return (
            <Pressable
              accessibilityRole="button"
              key={item.key}
              onPress={() => onSelect(item.key)}
              style={styles.item}>
              <View
                style={[styles.iconBubble, selected && styles.activeBubble]}>
                <Text style={[styles.icon, selected && styles.activeText]}>
                  {item.icon}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={[styles.label, selected && styles.activeText]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    bottom: navGap,
    left: 14,
    position: 'absolute',
    right: 14,
  },
  bar: {
    alignItems: 'center',
    backgroundColor: 'rgba(1, 12, 27, 0.92)',
    borderColor: palette.whiteLine,
    borderRadius: 26,
    borderWidth: 1,
    flexDirection: 'row',
    height: navHeight,
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: '#00c8ff',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    gap: 3,
    justifyContent: 'center',
    minWidth: 0,
  },
  iconBubble: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    width: 38,
  },
  activeBubble: {
    backgroundColor: 'rgba(0, 209, 255, 0.16)',
    borderColor: palette.cyan,
  },
  icon: {
    color: palette.muted,
    fontSize: 18,
    includeFontPadding: false,
    textAlign: 'center',
  },
  label: {
    color: palette.dim,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeText: {
    color: palette.cyan,
  },
});
