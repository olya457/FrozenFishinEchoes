import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Marker, type Region} from 'react-native-maps';
import {Pill} from '../components/Pill';
import {ScreenFixed} from '../components/ScreenScroll';
import {locations} from '../data/content';
import {useMetrics} from '../hooks/useMetrics';
import {navGap, navHeight, palette} from '../theme';
import type {Location} from '../types';

type Props = {
  onOpenLocation: (id: string) => void;
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

const initialRegion: Region = {
  latitude: 42,
  longitude: 25,
  latitudeDelta: 124,
  longitudeDelta: 285,
};

const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{color: '#08213a'}],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{color: '#9edfff'}],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{color: '#00111f'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#001a30'}],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{color: '#062849'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#123b5c'}],
  },
  {
    featureType: 'poi',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'transit',
    stylers: [{visibility: 'off'}],
  },
];

export function MapScreen({onOpenLocation}: Props) {
  const mapRef = useRef<MapView>(null);
  const metrics = useMetrics();
  const [selectedId, setSelectedId] = useState('lake-inari');
  const [region, setRegion] = useState<Region>(initialRegion);
  const [expanded, setExpanded] = useState(metrics.height >= 760);
  const sheetHeight = expanded ? (metrics.height < 760 ? 292 : 350) : 132;
  const selected =
    locations.find(item => item.id === selectedId) ?? locations[0];
  const orderedLocations = useMemo(
    () => [selected, ...locations.filter(item => item.id !== selected.id)],
    [selected],
  );
  const mapBottom = sheetHeight + navGap + navHeight - 1;

  const fitAll = useCallback(() => {
    mapRef.current?.fitToCoordinates(
      locations.map(item => item.coordinate),
      {
        animated: true,
        edgePadding: {
          top: 118,
          right: 42,
          bottom: mapBottom + 32,
          left: 42,
        },
      },
    );
  }, [mapBottom]);

  const focusLocation = useCallback((location: Location) => {
    setSelectedId(location.id);
    mapRef.current?.animateToRegion(
      {
        ...location.coordinate,
        latitudeDelta: 8,
        longitudeDelta: 12,
      },
      450,
    );
  }, []);

  const stepLocation = useCallback(
    (direction: -1 | 1) => {
      const index = locations.findIndex(item => item.id === selected.id);
      const nextIndex =
        (index + direction + locations.length) % locations.length;
      focusLocation(locations[nextIndex]);
    },
    [focusLocation, selected.id],
  );

  const zoom = useCallback(
    (direction: 'in' | 'out') => {
      const factor = direction === 'in' ? 0.55 : 1.8;
      mapRef.current?.animateToRegion(
        {
          ...region,
          latitudeDelta: Math.min(
            Math.max(region.latitudeDelta * factor, 1),
            160,
          ),
          longitudeDelta: Math.min(
            Math.max(region.longitudeDelta * factor, 1),
            320,
          ),
        },
        300,
      );
    },
    [region],
  );

  return (
    <ScreenFixed>
      <View style={styles.mapWrap}>
        <MapView
          ref={mapRef}
          customMapStyle={darkMapStyle}
          initialRegion={initialRegion}
          loadingBackgroundColor="#00182b"
          loadingEnabled
          mapPadding={{
            top: 96,
            right: 16,
            bottom: mapBottom + 10,
            left: 16,
          }}
          mapType={Platform.OS === 'ios' ? 'mutedStandard' : 'standard'}
          moveOnMarkerPress={false}
          onMapReady={() => setTimeout(fitAll, 350)}
          onRegionChangeComplete={setRegion}
          rotateEnabled={false}
          showsCompass={false}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          style={styles.map}
          toolbarEnabled={false}
          zoomControlEnabled={false}>
          {locations.map(item => {
            const selectedMarker = selectedId === item.id;

            return (
              <Marker
                key={item.id}
                coordinate={item.coordinate}
                description={`${item.flag} ${item.country} • ${item.temperature}`}
                onCalloutPress={() => onOpenLocation(item.id)}
                onPress={() => setSelectedId(item.id)}
                title={shortName(item.name)}>
                <View
                  style={[
                    styles.markerWrap,
                    selectedMarker && styles.markerWrapSelected,
                  ]}>
                  <View
                    style={[
                      styles.markerPulse,
                      selectedMarker && styles.markerPulseSelected,
                    ]}
                  />
                  <View
                    style={[
                      styles.marker,
                      selectedMarker && styles.markerSelected,
                    ]}>
                    <Text style={styles.markerText}>🎣</Text>
                  </View>
                </View>
              </Marker>
            );
          })}
        </MapView>
        <View pointerEvents="none" style={styles.mapTint} />
        <Text style={[styles.title, {left: metrics.pad}]}>Interactive Map</Text>
        <View
          style={[
            styles.selectedCard,
            {left: metrics.pad, right: metrics.pad, bottom: mapBottom + 14},
          ]}>
          <Image
            source={selected.image}
            resizeMode="cover"
            style={styles.cardThumb}
          />
          <View style={styles.cardCopy}>
            <Text numberOfLines={1} style={styles.cardTitle}>
              {shortName(selected.name)}
            </Text>
            <Text numberOfLines={1} style={styles.cardMeta}>
              {selected.flag} {selected.country} · {selected.coordinates}
            </Text>
          </View>
          <Pressable
            onPress={() => onOpenLocation(selected.id)}
            style={styles.cardButton}>
            <Text style={styles.cardButtonText}>›</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.controls,
            metrics.compact ? styles.controlsCompact : styles.controlsRegular,
            {
              right: metrics.pad,
            },
          ]}>
          <Pressable onPress={() => zoom('in')} style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </Pressable>
          <Pressable onPress={() => zoom('out')} style={styles.controlButton}>
            <Text style={styles.controlText}>−</Text>
          </Pressable>
          <Pressable onPress={fitAll} style={styles.controlWide}>
            <Text style={styles.controlSmallText}>All</Text>
          </Pressable>
          <Pressable
            onPress={() => focusLocation(selected)}
            style={styles.controlButton}>
            <Text style={styles.controlText}>⌖</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.stepControls,
            {
              left: metrics.pad,
              right: metrics.pad,
              bottom: mapBottom + 94,
            },
          ]}>
          <Pressable onPress={() => stepLocation(-1)} style={styles.stepButton}>
            <Text style={styles.stepText}>‹</Text>
          </Pressable>
          <Pressable
            onPress={() => setExpanded(value => !value)}
            style={styles.listButton}>
            <Text style={styles.listButtonText}>
              {expanded ? 'Less' : 'List'}
            </Text>
          </Pressable>
          <Pressable onPress={() => stepLocation(1)} style={styles.stepButton}>
            <Text style={styles.stepText}>›</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.sheet,
          {
            bottom: navGap + navHeight - 1,
            height: sheetHeight,
            paddingHorizontal: metrics.pad,
          },
        ]}>
        <View style={styles.handle} />
        <Text style={styles.sheetLabel}>Nearby Locations</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orderedLocations.map(item => {
            const active = selectedId === item.id;

            return (
              <Pressable
                key={item.id}
                onPress={() => focusLocation(item)}
                style={[
                  styles.locationRow,
                  active && styles.locationRowActive,
                ]}>
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={styles.thumb}
                />
                <View style={styles.rowCopy}>
                  <Text numberOfLines={1} style={styles.rowTitle}>
                    {shortName(item.name)}
                  </Text>
                  <Text numberOfLines={1} style={styles.country}>
                    {item.flag} {item.country}
                  </Text>
                  <Pill icon="🧊" style={styles.rowPill}>
                    {item.thickness}
                  </Pill>
                </View>
                <View style={styles.rowActions}>
                  <Text style={styles.temp}>{item.temperature}</Text>
                  <Pressable
                    onPress={() => onOpenLocation(item.id)}
                    style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>›</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </ScreenFixed>
  );
}

const styles = StyleSheet.create({
  mapWrap: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 17, 31, 0.16)',
  },
  title: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '900',
    position: 'absolute',
    top: 28,
  },
  markerWrap: {
    alignItems: 'center',
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  markerWrapSelected: {
    height: 76,
    width: 76,
  },
  markerPulse: {
    backgroundColor: 'rgba(0, 209, 255, 0.12)',
    borderColor: 'rgba(0, 209, 255, 0.34)',
    borderRadius: 32,
    borderWidth: 1,
    height: 64,
    position: 'absolute',
    width: 64,
  },
  markerPulseSelected: {
    backgroundColor: 'rgba(0, 209, 255, 0.2)',
    borderColor: 'rgba(0, 209, 255, 0.62)',
    borderRadius: 38,
    height: 76,
    width: 76,
  },
  marker: {
    alignItems: 'center',
    backgroundColor: '#10c9ff',
    borderColor: 'rgba(219, 250, 255, 0.92)',
    borderRadius: 18,
    borderWidth: 2,
    height: 34,
    justifyContent: 'center',
    shadowColor: palette.cyan,
    shadowOpacity: 0.86,
    shadowRadius: 12,
    width: 34,
  },
  markerSelected: {
    borderRadius: 22,
    height: 42,
    width: 42,
  },
  markerText: {
    fontSize: 16,
  },
  selectedCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(2, 14, 32, 0.9)',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 74,
    padding: 10,
    position: 'absolute',
  },
  cardThumb: {
    borderRadius: 12,
    height: 54,
    width: 54,
  },
  cardCopy: {
    flex: 1,
    marginHorizontal: 12,
  },
  cardTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
  cardMeta: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },
  cardButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 209, 255, 0.14)',
    borderColor: palette.line,
    borderRadius: 16,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  cardButtonText: {
    color: palette.cyan,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 30,
  },
  controls: {
    gap: 8,
    position: 'absolute',
  },
  controlsCompact: {
    top: 72,
  },
  controlsRegular: {
    top: 82,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(2, 14, 32, 0.88)',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  controlWide: {
    alignItems: 'center',
    backgroundColor: 'rgba(2, 14, 32, 0.88)',
    borderColor: palette.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  controlText: {
    color: palette.cyan,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 27,
  },
  controlSmallText: {
    color: palette.cyan,
    fontSize: 12,
    fontWeight: '900',
  },
  stepControls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  stepButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(2, 14, 32, 0.9)',
    borderColor: palette.line,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 54,
  },
  stepText: {
    color: palette.cyan,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 32,
  },
  listButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 209, 255, 0.15)',
    borderColor: palette.line,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    minWidth: 74,
    paddingHorizontal: 18,
  },
  listButtonText: {
    color: palette.cyan,
    fontSize: 13,
    fontWeight: '900',
  },
  sheet: {
    backgroundColor: 'rgba(2, 14, 32, 0.96)',
    borderColor: palette.line,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    left: 0,
    paddingBottom: 10,
    paddingTop: 14,
    position: 'absolute',
    right: 0,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: palette.cyan,
    borderRadius: 2,
    height: 4,
    marginBottom: 18,
    opacity: 0.7,
    width: 36,
  },
  sheetLabel: {
    color: '#9bb9c8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  locationRow: {
    alignItems: 'center',
    borderBottomColor: 'rgba(255, 255, 255, 0.07)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 88,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  locationRowActive: {
    backgroundColor: 'rgba(0, 209, 255, 0.08)',
    borderRadius: 16,
  },
  thumb: {
    borderRadius: 11,
    height: 62,
    width: 62,
  },
  rowCopy: {
    flex: 1,
    marginLeft: 14,
  },
  rowTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
  country: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
  },
  rowPill: {
    marginTop: 6,
  },
  rowActions: {
    alignItems: 'flex-end',
    gap: 8,
    marginLeft: 10,
  },
  temp: {
    color: palette.cyan,
    fontSize: 15,
    fontWeight: '900',
  },
  detailsButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 209, 255, 0.12)',
    borderColor: palette.line,
    borderRadius: 14,
    borderWidth: 1,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  detailsButtonText: {
    color: palette.cyan,
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 24,
  },
});
