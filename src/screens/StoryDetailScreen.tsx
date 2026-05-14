import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenScroll} from '../components/ScreenScroll';
import {palette} from '../theme';
import type {Story} from '../types';

type Props = {
  story: Story;
  onBack: () => void;
};

export function StoryDetailScreen({story, onBack}: Props) {
  return (
    <ScreenScroll withNav={false} contentStyle={styles.content}>
      <ImageBackground
        source={story.image}
        resizeMode="cover"
        style={styles.hero}>
        <View style={styles.heroShade}>
          <Pressable onPress={onBack} style={styles.back}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <View style={styles.heroMeta}>
            <View style={styles.category}>
              <Text style={styles.categoryText}>{story.category}</Text>
            </View>
            <View style={styles.time}>
              <Text style={styles.timeText}>⏱ {story.readTime}</Text>
            </View>
          </View>
          <Text adjustsFontSizeToFit numberOfLines={2} style={styles.title}>
            {story.title}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.divider}>
        <View style={styles.line} />
        <View style={styles.dot} />
        <View style={styles.line} />
      </View>

      {story.body.map((paragraph, index) => (
        <Text key={`${story.id}-${index}`} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 0,
  },
  hero: {
    height: 286,
    marginHorizontal: -20,
  },
  heroShade: {
    backgroundColor: 'rgba(0, 10, 24, 0.44)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  back: {
    alignItems: 'center',
    backgroundColor: 'rgba(1, 19, 38, 0.72)',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    left: 20,
    position: 'absolute',
    top: 20,
    width: 38,
  },
  backText: {
    color: palette.text,
    fontSize: 31,
    fontWeight: '300',
    includeFontPadding: false,
    lineHeight: 34,
  },
  heroMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  category: {
    backgroundColor: 'rgba(0, 131, 160, 0.35)',
    borderColor: palette.line,
    borderRadius: 17,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  categoryText: {
    color: palette.cyan,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  time: {
    backgroundColor: 'rgba(0, 12, 27, 0.66)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  timeText: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '800',
  },
  title: {
    color: palette.text,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  divider: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
    marginTop: 28,
  },
  line: {
    backgroundColor: 'rgba(0, 209, 255, 0.25)',
    flex: 1,
    height: 1,
  },
  dot: {
    backgroundColor: palette.cyan,
    borderRadius: 4,
    height: 7,
    shadowColor: palette.cyan,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    width: 7,
  },
  paragraph: {
    color: '#b7d2df',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: 22,
  },
});
