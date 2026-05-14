import React from 'react';
import {
  ImageBackground,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GlassCard} from '../components/GlassCard';
import {ScreenScroll} from '../components/ScreenScroll';
import {palette} from '../theme';
import type {Fish} from '../types';

type Props = {
  fish: Fish;
  saved: boolean;
  onBack: () => void;
  onToggleSave: (id: string) => void;
};

export function FishDetailScreen({fish, saved, onBack, onToggleSave}: Props) {
  const share = () => {
    Share.share({
      message: `${fish.name}: ${fish.habitat}, best depth ${fish.bestDepth}`,
    });
  };

  return (
    <ScreenScroll withNav={false} contentStyle={styles.content}>
      <ImageBackground
        source={fish.image}
        resizeMode="cover"
        style={styles.hero}>
        <View style={styles.heroShade}>
          <Pressable onPress={onBack} style={styles.back}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <View style={styles.guidePill}>
            <Text style={styles.guideText}>🐟 Fish Guide</Text>
          </View>
        </View>
      </ImageBackground>

      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
        {fish.name}
      </Text>
      <Text style={styles.latin}>{fish.latin}</Text>

      <View style={styles.grid}>
        <InfoCard icon="🌊" label="Habitat" value={fish.habitat} />
        <InfoCard icon="⚖️" label="Avg Weight" value={fish.avgWeight} />
        <InfoCard icon="📏" label="Best Depth" value={fish.bestDepth} />
        <InfoCard icon="🗓️" label="Season" value={fish.season} />
      </View>

      <GlassCard style={styles.profile}>
        <Text style={styles.label}>Species Profile</Text>
        <Text style={styles.profileText}>{fish.description}</Text>
      </GlassCard>

      <GlassCard style={styles.tip}>
        <View style={styles.tipIcon}>
          <Text>💡</Text>
        </View>
        <Text style={styles.tipText}>
          Pro tip: Use a small jig or live bait at the recorded best depth for
          highest success.
        </Text>
      </GlassCard>

      <View style={styles.actions}>
        <Pressable
          onPress={() => onToggleSave(fish.id)}
          style={[styles.actionButton, saved && styles.savedButton]}>
          <Text style={[styles.actionText, saved && styles.savedText]}>
            {saved ? '✅ Saved' : '📌 Save'}
          </Text>
        </Pressable>
        <Pressable onPress={share} style={styles.actionButton}>
          <Text style={styles.actionText}>📤 Share</Text>
        </Pressable>
      </View>
    </ScreenScroll>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <GlassCard style={styles.infoCard}>
      <Text style={styles.infoLabel}>
        {icon} {label}
      </Text>
      <Text numberOfLines={2} style={styles.infoValue}>
        {value}
      </Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 0,
  },
  hero: {
    height: 206,
    marginHorizontal: -20,
  },
  heroShade: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 40, 46, 0.34)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  back: {
    alignItems: 'center',
    backgroundColor: 'rgba(1, 19, 38, 0.72)',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  backText: {
    color: palette.text,
    fontSize: 31,
    fontWeight: '300',
    includeFontPadding: false,
    lineHeight: 34,
  },
  guidePill: {
    alignItems: 'center',
    backgroundColor: 'rgba(2, 95, 116, 0.36)',
    borderColor: palette.line,
    borderRadius: 999,
    borderWidth: 1,
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  guideText: {
    color: palette.text,
    fontSize: 11,
    fontWeight: '900',
  },
  title: {
    color: palette.text,
    fontSize: 31,
    fontWeight: '900',
    lineHeight: 36,
    marginTop: -62,
  },
  latin: {
    color: '#43d4f7',
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '700',
    marginBottom: 22,
    marginTop: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoCard: {
    flexGrow: 1,
    flexBasis: '47%',
    minHeight: 78,
    padding: 13,
  },
  infoLabel: {
    color: palette.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  infoValue: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
    marginTop: 8,
  },
  profile: {
    marginTop: 12,
    padding: 16,
  },
  label: {
    color: palette.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  profileText: {
    color: '#aac8d8',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 22,
  },
  tip: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    padding: 13,
  },
  tipIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 209, 255, 0.16)',
    borderRadius: 14,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  tipText: {
    color: palette.muted,
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: palette.panel,
    borderColor: palette.line,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    height: 46,
    justifyContent: 'center',
  },
  savedButton: {
    backgroundColor: 'rgba(0, 190, 168, 0.16)',
    borderColor: 'rgba(0, 235, 200, 0.5)',
  },
  actionText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '900',
  },
  savedText: {
    color: '#4af5c7',
  },
});
