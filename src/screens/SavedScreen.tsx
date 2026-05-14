import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GlassCard} from '../components/GlassCard';
import {Pill} from '../components/Pill';
import {ScreenScroll} from '../components/ScreenScroll';
import {assets, fish, locations} from '../data/content';
import {palette} from '../theme';

type Props = {
  locationIds: string[];
  fishIds: string[];
  onOpenLocation: (id: string) => void;
  onOpenFish: (id: string) => void;
  onRemoveLocation: (id: string) => void;
  onRemoveFish: (id: string) => void;
  onExplore: () => void;
};

type Segment = 'locations' | 'fish';

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

export function SavedScreen({
  locationIds,
  fishIds,
  onOpenLocation,
  onOpenFish,
  onRemoveLocation,
  onRemoveFish,
  onExplore,
}: Props) {
  const [segment, setSegment] = useState<Segment>('locations');
  const savedLocations = locations.filter(item =>
    locationIds.includes(item.id),
  );
  const savedFish = fish.filter(item => fishIds.includes(item.id));
  const empty =
    segment === 'locations'
      ? savedLocations.length === 0
      : savedFish.length === 0;

  return (
    <ScreenScroll>
      <Text style={styles.kicker}>Your Collection</Text>
      <Text style={styles.title}>Saved</Text>

      <View style={styles.segment}>
        <SegmentButton
          active={segment === 'locations'}
          label="📍 Locations"
          onPress={() => setSegment('locations')}
        />
        <SegmentButton
          active={segment === 'fish'}
          label="🐟 Fish"
          onPress={() => setSegment('fish')}
        />
      </View>

      {empty ? (
        <View style={styles.emptyWrap}>
          <GlassCard style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              {segment === 'locations' ? '📍' : '🐟'}
            </Text>
            <Text style={styles.emptyText}>
              {segment === 'locations'
                ? 'Explore more locations'
                : 'Explore more fish species'}
            </Text>
          </GlassCard>
          <Pressable onPress={onExplore} style={styles.emptyButton}>
            <Text style={styles.emptyButtonText}>
              {segment === 'locations' ? 'To locations ➜' : 'To fish guide ➜'}
            </Text>
          </Pressable>
          <Image
            source={assets.tentBadge}
            resizeMode="contain"
            style={styles.tent}
          />
        </View>
      ) : segment === 'locations' ? (
        <View style={styles.locationList}>
          {savedLocations.map(item => (
            <Pressable key={item.id} onPress={() => onOpenLocation(item.id)}>
              <GlassCard style={styles.locationCard}>
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={styles.locationImage}
                />
                <View style={styles.locationCopy}>
                  <Text numberOfLines={1} style={styles.locationTitle}>
                    {shortName(item.name)}
                  </Text>
                  <Text numberOfLines={1} style={styles.country}>
                    {item.flag} {item.country}
                  </Text>
                  <Text numberOfLines={1} style={styles.iceText}>
                    🧊 {item.thickness} fishin
                  </Text>
                </View>
                <View style={styles.locationSide}>
                  <Pill>{item.temperature}</Pill>
                  <Pressable
                    onPress={() => onRemoveLocation(item.id)}
                    style={styles.remove}>
                    <Text style={styles.removeText}>×</Text>
                  </Pressable>
                </View>
              </GlassCard>
            </Pressable>
          ))}
          <Image
            source={assets.tentBadge}
            resizeMode="contain"
            style={styles.tentSmall}
          />
        </View>
      ) : (
        <View style={styles.fishGrid}>
          {savedFish.map(item => (
            <GlassCard key={item.id} style={styles.fishCard}>
              <Pressable
                onPress={() => onOpenFish(item.id)}
                style={styles.fishPress}>
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={styles.fishImage}
                />
                <View style={styles.fishBody}>
                  <Text numberOfLines={1} style={styles.fishTitle}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.latin}>
                    {item.latin}
                  </Text>
                  <Pill style={styles.season}>{item.season}</Pill>
                </View>
              </Pressable>
              <Pressable
                onPress={() => onRemoveFish(item.id)}
                style={styles.removeFish}>
                <Text style={styles.removeText}>×</Text>
              </Pressable>
            </GlassCard>
          ))}
          <GlassCard style={styles.moreFishCard}>
            <Text style={styles.emptyIcon}>🐟</Text>
            <Text style={styles.emptyText}>Explore more fish species</Text>
          </GlassCard>
          <Image
            source={assets.tentBadge}
            resizeMode="contain"
            style={styles.tentSmall}
          />
        </View>
      )}
    </ScreenScroll>
  );
}

function SegmentButton({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.segmentButton, active && styles.segmentActive]}>
      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
        {label}
      </Text>
    </Pressable>
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
  segment: {
    backgroundColor: 'rgba(9, 39, 70, 0.66)',
    borderColor: palette.line,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    marginTop: 26,
    padding: 5,
  },
  segmentButton: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 11,
    borderWidth: 1,
    flex: 1,
    height: 42,
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: 'rgba(0, 209, 255, 0.1)',
    borderColor: palette.line,
  },
  segmentText: {
    color: palette.dim,
    fontSize: 14,
    fontWeight: '900',
  },
  segmentTextActive: {
    color: palette.cyan,
  },
  emptyWrap: {
    alignItems: 'center',
    flex: 1,
    marginTop: 22,
  },
  emptyCard: {
    alignItems: 'center',
    height: 142,
    justifyContent: 'center',
    width: '100%',
  },
  emptyIcon: {
    fontSize: 22,
    marginBottom: 10,
  },
  emptyText: {
    color: palette.dim,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
  },
  emptyButton: {
    alignItems: 'center',
    borderColor: palette.cyan,
    borderRadius: 13,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    marginTop: 26,
    paddingHorizontal: 18,
  },
  emptyButtonText: {
    color: palette.cyan,
    fontSize: 15,
    fontWeight: '900',
  },
  tent: {
    height: 218,
    marginTop: 130,
    width: 218,
  },
  locationList: {
    gap: 12,
    marginTop: 22,
  },
  locationCard: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 104,
    padding: 12,
  },
  locationImage: {
    borderRadius: 12,
    height: 78,
    width: 86,
  },
  locationCopy: {
    flex: 1,
    marginLeft: 14,
  },
  locationTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
  country: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 7,
  },
  iceText: {
    color: '#5ccde9',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 7,
  },
  locationSide: {
    alignItems: 'flex-end',
    gap: 10,
  },
  remove: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 80, 112, 0.12)',
    borderColor: 'rgba(255, 80, 112, 0.35)',
    borderRadius: 12,
    borderWidth: 1,
    height: 26,
    justifyContent: 'center',
    width: 26,
  },
  removeText: {
    color: '#ff7e93',
    fontSize: 18,
    fontWeight: '900',
    includeFontPadding: false,
    lineHeight: 20,
  },
  tentSmall: {
    alignSelf: 'center',
    height: 190,
    marginTop: 16,
    width: 190,
  },
  fishGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 22,
  },
  fishCard: {
    flexBasis: '47%',
    flexGrow: 1,
    minHeight: 222,
  },
  fishPress: {
    flex: 1,
  },
  fishImage: {
    height: 128,
    width: '100%',
  },
  fishBody: {
    padding: 12,
  },
  fishTitle: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '900',
  },
  latin: {
    color: '#4bd1ee',
    fontSize: 11,
    fontStyle: 'italic',
    fontWeight: '700',
    marginTop: 4,
  },
  season: {
    marginTop: 14,
  },
  removeFish: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 80, 112, 0.18)',
    borderRadius: 12,
    height: 25,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 8,
    width: 25,
  },
  moreFishCard: {
    alignItems: 'center',
    flexBasis: '47%',
    flexGrow: 1,
    height: 222,
    justifyContent: 'center',
    padding: 18,
  },
});
