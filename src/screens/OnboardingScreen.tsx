import React, {useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {onboardingSlides} from '../data/content';
import {useMetrics} from '../hooks/useMetrics';
import {palette, topInset} from '../theme';

type Props = {
  onDone: () => void;
};

export function OnboardingScreen({onDone}: Props) {
  const [index, setIndex] = useState(0);
  const metrics = useMetrics();
  const slide = onboardingSlides[index];
  const last = index === onboardingSlides.length - 1;

  const next = () => {
    if (last) {
      onDone();
      return;
    }

    setIndex(value => value + 1);
  };

  return (
    <ImageBackground
      source={slide.image}
      resizeMode="cover"
      style={[styles.root, {paddingTop: topInset}]}>
      <View style={[styles.overlay, {paddingHorizontal: metrics.pad}]}>
        <Pressable onPress={onDone} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        <View style={styles.copy}>
          <View style={styles.accent} />
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={[styles.title, metrics.compact && styles.titleCompact]}>
            {slide.title}
          </Text>
          <Text style={[styles.text, metrics.compact && styles.textCompact]}>
            {slide.text}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {onboardingSlides.map((item, itemIndex) => (
              <View
                key={item.id}
                style={[styles.dot, itemIndex === index && styles.dotActive]}
              />
            ))}
          </View>
          <Pressable onPress={next} style={styles.button}>
            <Text style={styles.buttonText}>{slide.action}</Text>
            <Text style={styles.buttonArrow}>➜</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#00101e',
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 12, 23, 0.12)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  skip: {
    alignItems: 'center',
    backgroundColor: 'rgba(128, 217, 245, 0.16)',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 18,
    position: 'absolute',
    right: 28,
    top: 56,
  },
  skipText: {
    color: '#65d8ff',
    fontSize: 14,
    fontWeight: '700',
  },
  copy: {
    marginBottom: 42,
  },
  accent: {
    backgroundColor: palette.cyan,
    borderRadius: 2,
    height: 3,
    marginBottom: 16,
    shadowColor: palette.cyan,
    shadowOpacity: 0.7,
    shadowRadius: 8,
    width: 42,
  },
  title: {
    color: palette.text,
    fontSize: 31,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 38,
  },
  titleCompact: {
    fontSize: 27,
    lineHeight: 33,
  },
  text: {
    color: '#a1c0cf',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 25,
    marginTop: 14,
    maxWidth: 330,
  },
  textCompact: {
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    backgroundColor: 'rgba(0, 209, 255, 0.42)',
    borderRadius: 5,
    height: 8,
    width: 8,
  },
  dotActive: {
    backgroundColor: palette.cyan,
    shadowColor: palette.cyan,
    shadowOpacity: 1,
    shadowRadius: 8,
    width: 28,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#12aeea',
    borderRadius: 24,
    flexDirection: 'row',
    gap: 10,
    height: 50,
    justifyContent: 'center',
    minWidth: 148,
    paddingHorizontal: 22,
    shadowColor: palette.cyan,
    shadowOpacity: 0.55,
    shadowRadius: 18,
  },
  buttonText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '900',
  },
  buttonArrow: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
});
