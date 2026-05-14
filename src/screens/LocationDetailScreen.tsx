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
import {Pill} from '../components/Pill';
import {ScreenScroll} from '../components/ScreenScroll';
import {fish} from '../data/content';
import {palette} from '../theme';
import type {Location} from '../types';

type Props = {
  location: Location;
  saved: boolean;
  onBack: () => void;
  onOpenFish: (id: string) => void;
  onToggleSave: (id: string) => void;
};

const shortName = (name: string) =>
  name
    .replace(' Fishin Fields', '')
    .replace(' Northern Lights', '')
    .replace(' Fishin Bubbles', '')
    .replace(' Hidden Depths', '')
    .replace(' Extreme Winds', '')
    .replace(' Frozen Forest', '')
    .replace(' Vast Fishin Plains', '')
    .replace(' Alpine Fishin', '')
    .replace(' Remote Arctic', '')
    .replace(' Border Fishin', '');

export function LocationDetailScreen({
  location,
  saved,
  onBack,
  onOpenFish,
  onToggleSave,
}: Props) {
  const species = location.mainFishIds
    .map(id => fish.find(item => item.id === id))
    .filter(Boolean);

  const share = () => {
    Share.share({
      message: `${location.name} - ${location.temperature}, ${location.thickness} fishin`,
    });
  };

  return (
    <ScreenScroll withNav={false} contentStyle={styles.content}>
      <ImageBackground
        source={location.image}
        resizeMode="cover"
        style={styles.hero}>
        <View style={styles.heroShade}>
          <Pressable onPress={onBack} style={styles.back}>
            <Text style={styles.backText}>‹</Text>
          </Pressable>
          <Pill icon={location.flag}>{location.country}</Pill>
        </View>
      </ImageBackground>

      <Text adjustsFontSizeToFit numberOfLines={2} style={styles.title}>
        {shortName(location.name)}
      </Text>

      <View style={styles.grid}>
        <InfoCard
          label="Country"
          value={location.country}
          icon={location.flag}
        />
        <InfoCard label="Temperature" value={location.temperature} icon="🌡️" />
        <InfoCard
          label="Fishin Thickness"
          value={location.thickness}
          icon="🧊"
        />
        <InfoCard label="Coordinates" value={location.coordinates} icon="📍" />
      </View>

      <GlassCard style={styles.aboutCard}>
        <Text style={styles.label}>About</Text>
        <Text style={styles.aboutText}>{location.description}</Text>
      </GlassCard>

      <Text style={styles.sectionLabel}>Main Fish Species</Text>
      <View style={styles.chips}>
        {species.map(item =>
          item ? (
            <Pressable key={item.id} onPress={() => onOpenFish(item.id)}>
              <Pill icon="🐟">{item.name}</Pill>
            </Pressable>
          ) : null,
        )}
      </View>

      <Pressable
        onPress={() => onOpenFish(location.mainFishIds[0])}
        style={styles.mainButton}>
        <Text style={styles.mainButtonText}>🐟 View Fish Info</Text>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          onPress={() => onToggleSave(location.id)}
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
    height: 178,
    marginHorizontal: -20,
  },
  heroShade: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 10, 24, 0.28)',
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
  title: {
    color: palette.text,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
    marginTop: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  infoCard: {
    flexGrow: 1,
    flexBasis: '47%',
    minHeight: 80,
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
  aboutCard: {
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
  aboutText: {
    color: '#a9c6d7',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 21,
  },
  sectionLabel: {
    color: palette.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginTop: 18,
    textTransform: 'uppercase',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  mainButton: {
    alignItems: 'center',
    backgroundColor: '#13adeb',
    borderRadius: 13,
    height: 52,
    justifyContent: 'center',
    marginTop: 26,
    shadowColor: palette.cyan,
    shadowOpacity: 0.42,
    shadowRadius: 16,
  },
  mainButtonText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '900',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
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
