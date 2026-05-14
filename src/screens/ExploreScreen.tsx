import React, {useMemo} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GlassCard} from '../components/GlassCard';
import {Pill} from '../components/Pill';
import {ScreenScroll} from '../components/ScreenScroll';
import {locations} from '../data/content';
import {useMetrics} from '../hooks/useMetrics';
import {palette} from '../theme';

type Props = {
  onOpenLocation: (id: string) => void;
  onSeeAllLocations: () => void;
};

const tips = [
  {
    icon: '🧊',
    title: 'Check Fishin Thickness',
    text: 'Minimum 15 cm for walking, 25 cm for snowmobile',
  },
  {
    icon: '🌡️',
    title: 'Watch Temperature Drops',
    text: 'Rapid changes cause fishin instability',
  },
  {
    icon: '👥',
    title: 'Never Go Alone',
    text: 'Always fish with a partner in remote areas',
  },
  {
    icon: '🦺',
    title: 'Wear Safety Picks',
    text: 'Fishin awls around your neck can save your life',
  },
];

export function ExploreScreen({onOpenLocation, onSeeAllLocations}: Props) {
  const metrics = useMetrics();
  const featured =
    locations.find(item => item.id === 'lake-inari') ?? locations[0];
  const destinationCardStyle = metrics.compact
    ? styles.smallCardCompact
    : styles.smallCardRegular;
  const dateLabel = useMemo(
    () =>
      new Date()
        .toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
        .toUpperCase(),
    [],
  );

  return (
    <ScreenScroll>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>TODAY - {dateLabel}</Text>
          <Text style={styles.title}>Location of the Day</Text>
        </View>
        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>🧊</Text>
        </View>
      </View>

      <Pressable onPress={() => onOpenLocation(featured.id)}>
        <GlassCard style={styles.heroCard}>
          <ImageBackground
            source={featured.image}
            resizeMode="cover"
            style={styles.heroImage}>
            <View style={styles.heroShade}>
              <Pill style={styles.countryPill} icon={featured.flag}>
                {featured.country}
              </Pill>
              <View style={styles.heroBottom}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.heroTitle}>
                  {featured.name.replace(' Northern Lights', '')}
                </Text>
                <View style={styles.heroMeta}>
                  <Pill icon="🌡️">{featured.temperature}</Pill>
                  <Pill icon="🧊">{featured.thickness}</Pill>
                </View>
                <View style={styles.cta}>
                  <Text style={styles.ctaText}>View Details</Text>
                  <Text style={styles.ctaArrow}>➜</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </GlassCard>
      </Pressable>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>More Destinations</Text>
        <Pressable
          accessibilityRole="button"
          hitSlop={10}
          onPress={onSeeAllLocations}
          style={styles.seeAllButton}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.destinationRow}>
        {locations
          .filter(item => item.id !== featured.id)
          .slice(0, 6)
          .map(item => (
            <Pressable key={item.id} onPress={() => onOpenLocation(item.id)}>
              <GlassCard style={[styles.smallCard, destinationCardStyle]}>
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={styles.smallImage}
                />
                <View style={styles.smallShade} />
                <Text numberOfLines={1} style={styles.smallTitle}>
                  {item.name.split(' Fishin')[0].replace(' Frozen Forest', '')}
                </Text>
                <Text style={styles.smallTemp}>{item.temperature}</Text>
              </GlassCard>
            </Pressable>
          ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Safety Tips</Text>
      </View>
      <GlassCard style={styles.tipsCard}>
        {tips.map((tip, index) => (
          <View
            key={tip.title}
            style={[
              styles.tipRow,
              index !== tips.length - 1 && styles.tipDivider,
            ]}>
            <View style={styles.tipIcon}>
              <Text style={styles.tipEmoji}>{tip.icon}</Text>
            </View>
            <View style={styles.tipCopy}>
              <Text numberOfLines={1} style={styles.tipTitle}>
                {tip.title}
              </Text>
              <Text numberOfLines={2} style={styles.tipText}>
                {tip.text}
              </Text>
            </View>
          </View>
        ))}
      </GlassCard>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  kicker: {
    color: palette.cyan,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  title: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
    marginTop: 3,
  },
  headerIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(6, 191, 255, 0.28)',
    borderRadius: 18,
    height: 38,
    justifyContent: 'center',
    shadowColor: palette.cyan,
    shadowOpacity: 0.55,
    shadowRadius: 12,
    width: 38,
  },
  headerIconText: {
    fontSize: 17,
  },
  heroCard: {
    height: 158,
  },
  heroImage: {
    flex: 1,
  },
  heroShade: {
    backgroundColor: 'rgba(0, 10, 25, 0.26)',
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  countryPill: {
    alignSelf: 'flex-end',
  },
  heroBottom: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
    maxWidth: '86%',
  },
  heroMeta: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  cta: {
    alignItems: 'center',
    backgroundColor: '#13abe9',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 7,
    height: 38,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  ctaText: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '900',
  },
  ctaArrow: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '900',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
  seeAllButton: {
    minHeight: 32,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  seeAll: {
    color: palette.cyan,
    fontSize: 11,
    fontWeight: '800',
  },
  destinationRow: {
    gap: 10,
    paddingRight: 20,
  },
  smallCard: {
    height: 96,
    justifyContent: 'flex-end',
  },
  smallCardCompact: {
    width: 136,
  },
  smallCardRegular: {
    width: 150,
  },
  smallImage: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
  },
  smallShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 12, 26, 0.34)',
  },
  smallTitle: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
  },
  smallTemp: {
    color: palette.cyan,
    fontSize: 11,
    fontWeight: '800',
    paddingBottom: 9,
    paddingHorizontal: 10,
  },
  tipsCard: {
    padding: 12,
  },
  tipRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 10,
  },
  tipDivider: {
    borderBottomColor: 'rgba(255, 255, 255, 0.07)',
    borderBottomWidth: 1,
  },
  tipIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 209, 255, 0.14)',
    borderColor: palette.line,
    borderRadius: 14,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  tipEmoji: {
    fontSize: 16,
  },
  tipCopy: {
    flex: 1,
  },
  tipTitle: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '900',
  },
  tipText: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16,
    marginTop: 2,
  },
});
