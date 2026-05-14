import React, {useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {GlassCard} from '../components/GlassCard';
import {ScreenScroll} from '../components/ScreenScroll';
import {facts, stories} from '../data/content';
import {palette} from '../theme';

type Props = {
  onOpenStory: (id: string) => void;
};

export function StoriesScreen({onOpenStory}: Props) {
  const [factIndex, setFactIndex] = useState<number | null>(null);

  const randomFact = () => {
    setFactIndex(value => {
      const next = Math.floor(Math.random() * facts.length);
      return next === value ? (next + 1) % facts.length : next;
    });
  };

  return (
    <ScreenScroll>
      <Text style={styles.kicker}>Field Notes</Text>
      <Text style={styles.title}>Stories & Tips</Text>

      <Pressable onPress={randomFact} style={styles.factButton}>
        <Text style={styles.factButtonText}>🎲 Random Fishin Fact</Text>
      </Pressable>

      {factIndex !== null ? (
        <GlassCard style={styles.factCard}>
          <View style={styles.factIcon}>
            <Text style={styles.factEmoji}>❄️</Text>
          </View>
          <View style={styles.factCopy}>
            <Text style={styles.factLabel}>Fishin Fact</Text>
            <Text style={styles.factText}>{facts[factIndex]}</Text>
          </View>
        </GlassCard>
      ) : null}

      <View style={styles.storyList}>
        {stories.map(story => (
          <Pressable key={story.id} onPress={() => onOpenStory(story.id)}>
            <GlassCard style={styles.storyCard}>
              <ImageBackground
                source={story.image}
                resizeMode="cover"
                style={styles.storyImage}>
                <View style={styles.storyTop}>
                  <View style={styles.category}>
                    <Text style={styles.categoryText}>{story.category}</Text>
                  </View>
                  <View style={styles.time}>
                    <Text style={styles.timeText}>⏱ {story.readTime}</Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.storyBody}>
                <Text numberOfLines={2} style={styles.storyTitle}>
                  {story.title}
                </Text>
                <Text numberOfLines={2} style={styles.storyExcerpt}>
                  {story.excerpt}
                </Text>
                <View style={styles.readButton}>
                  <Text style={styles.readText}>Read more</Text>
                  <Text style={styles.readArrow}>➜</Text>
                </View>
              </View>
            </GlassCard>
          </Pressable>
        ))}
      </View>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  kicker: {
    color: palette.cyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2.3,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: palette.text,
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 32,
    marginTop: 6,
  },
  factButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(5, 57, 90, 0.64)',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    marginTop: 42,
  },
  factButtonText: {
    color: palette.cyan,
    fontSize: 16,
    fontWeight: '900',
  },
  factCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    marginTop: 22,
    padding: 18,
  },
  factIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 209, 255, 0.16)',
    borderColor: palette.line,
    borderRadius: 16,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  factEmoji: {
    fontSize: 21,
  },
  factCopy: {
    flex: 1,
  },
  factLabel: {
    color: palette.cyan,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  factText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  storyList: {
    gap: 16,
    marginTop: 22,
  },
  storyCard: {
    borderRadius: 20,
  },
  storyImage: {
    height: 178,
  },
  storyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
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
  storyBody: {
    backgroundColor: 'rgba(1, 14, 31, 0.72)',
    padding: 18,
  },
  storyTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 25,
  },
  storyExcerpt: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    marginTop: 8,
  },
  readButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderColor: palette.cyan,
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    height: 44,
    marginTop: 16,
    paddingHorizontal: 18,
  },
  readText: {
    color: palette.cyan,
    fontSize: 15,
    fontWeight: '900',
  },
  readArrow: {
    color: palette.cyan,
    fontSize: 15,
    fontWeight: '900',
  },
});
