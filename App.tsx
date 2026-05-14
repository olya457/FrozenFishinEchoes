import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomNav} from './src/components/BottomNav';
import {fish, locations, stories} from './src/data/content';
import {ExploreScreen} from './src/screens/ExploreScreen';
import {FishDetailScreen} from './src/screens/FishDetailScreen';
import {LocationDetailScreen} from './src/screens/LocationDetailScreen';
import {MapScreen} from './src/screens/MapScreen';
import {OnboardingScreen} from './src/screens/OnboardingScreen';
import {QuizScreen} from './src/screens/QuizScreen';
import {SavedScreen} from './src/screens/SavedScreen';
import {SplashScreen} from './src/screens/SplashScreen';
import {StoriesScreen} from './src/screens/StoriesScreen';
import {StoryDetailScreen} from './src/screens/StoryDetailScreen';
import type {TabKey} from './src/types';

type ScreenKey = TabKey | 'locationDetail' | 'fishDetail' | 'storyDetail';

const storageKeys = {
  onboarded: '@frozen-fishin/onboarded',
  savedLocations: '@frozen-fishin/saved-locations',
  savedFish: '@frozen-fishin/saved-fish',
};

const tabs: TabKey[] = ['explore', 'map', 'stories', 'quiz', 'saved'];

function parseIds(value: string | null) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter(item => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

function App(): React.JSX.Element {
  const [hydrated, setHydrated] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [screen, setScreen] = useState<ScreenKey>('explore');
  const [activeTab, setActiveTab] = useState<TabKey>('explore');
  const [selectedLocationId, setSelectedLocationId] = useState('lake-inari');
  const [selectedFishId, setSelectedFishId] = useState('arctic-char');
  const [selectedStoryId, setSelectedStoryId] = useState('perfect-drill');
  const [fishBackScreen, setFishBackScreen] = useState<ScreenKey>('explore');
  const [savedLocationIds, setSavedLocationIds] = useState<string[]>([]);
  const [savedFishIds, setSavedFishIds] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function hydrate() {
      try {
        const [onboardedValue, locationValue, fishValue] = await Promise.all([
          AsyncStorage.getItem(storageKeys.onboarded),
          AsyncStorage.getItem(storageKeys.savedLocations),
          AsyncStorage.getItem(storageKeys.savedFish),
        ]);

        setOnboarded(onboardedValue === 'true');
        setSavedLocationIds(parseIds(locationValue));
        setSavedFishIds(parseIds(fishValue));
      } finally {
        setHydrated(true);
      }
    }

    hydrate();
  }, []);

  const selectedLocation = useMemo(
    () =>
      locations.find(item => item.id === selectedLocationId) ?? locations[0],
    [selectedLocationId],
  );
  const selectedFish = useMemo(
    () => fish.find(item => item.id === selectedFishId) ?? fish[0],
    [selectedFishId],
  );
  const selectedStory = useMemo(
    () => stories.find(item => item.id === selectedStoryId) ?? stories[0],
    [selectedStoryId],
  );
  const showNav = tabs.includes(screen as TabKey);

  const finishOnboarding = async () => {
    setOnboarded(true);
    await AsyncStorage.setItem(storageKeys.onboarded, 'true');
  };

  const navigateTab = (tab: TabKey) => {
    setActiveTab(tab);
    setScreen(tab);
  };

  const openLocation = (id: string) => {
    setSelectedLocationId(id);
    setScreen('locationDetail');
  };

  const openFish = (id: string) => {
    setFishBackScreen(screen);
    setSelectedFishId(id);
    setScreen('fishDetail');
  };

  const openStory = (id: string) => {
    setSelectedStoryId(id);
    setScreen('storyDetail');
  };

  const toggleLocationSave = async (id: string) => {
    const next = savedLocationIds.includes(id)
      ? savedLocationIds.filter(item => item !== id)
      : [...savedLocationIds, id];

    setSavedLocationIds(next);
    await AsyncStorage.setItem(
      storageKeys.savedLocations,
      JSON.stringify(next),
    );
  };

  const toggleFishSave = async (id: string) => {
    const next = savedFishIds.includes(id)
      ? savedFishIds.filter(item => item !== id)
      : [...savedFishIds, id];

    setSavedFishIds(next);
    await AsyncStorage.setItem(storageKeys.savedFish, JSON.stringify(next));
  };

  const removeLocation = async (id: string) => {
    const next = savedLocationIds.filter(item => item !== id);
    setSavedLocationIds(next);
    await AsyncStorage.setItem(
      storageKeys.savedLocations,
      JSON.stringify(next),
    );
  };

  const removeFish = async (id: string) => {
    const next = savedFishIds.filter(item => item !== id);
    setSavedFishIds(next);
    await AsyncStorage.setItem(storageKeys.savedFish, JSON.stringify(next));
  };

  const backToActiveTab = () => setScreen(activeTab);

  if (!hydrated || !splashDone) {
    return <SplashScreen />;
  }

  if (!onboarded) {
    return <OnboardingScreen onDone={finishOnboarding} />;
  }

  const renderedScreen = (() => {
    switch (screen) {
      case 'map':
        return <MapScreen onOpenLocation={openLocation} />;
      case 'stories':
        return <StoriesScreen onOpenStory={openStory} />;
      case 'quiz':
        return <QuizScreen />;
      case 'saved':
        return (
          <SavedScreen
            fishIds={savedFishIds}
            locationIds={savedLocationIds}
            onExplore={() => navigateTab('explore')}
            onOpenFish={openFish}
            onOpenLocation={openLocation}
            onRemoveFish={removeFish}
            onRemoveLocation={removeLocation}
          />
        );
      case 'locationDetail':
        return (
          <LocationDetailScreen
            location={selectedLocation}
            onBack={backToActiveTab}
            onOpenFish={openFish}
            onToggleSave={toggleLocationSave}
            saved={savedLocationIds.includes(selectedLocation.id)}
          />
        );
      case 'fishDetail':
        return (
          <FishDetailScreen
            fish={selectedFish}
            onBack={() => setScreen(fishBackScreen)}
            onToggleSave={toggleFishSave}
            saved={savedFishIds.includes(selectedFish.id)}
          />
        );
      case 'storyDetail':
        return (
          <StoryDetailScreen story={selectedStory} onBack={backToActiveTab} />
        );
      case 'explore':
      default:
        return <ExploreScreen onOpenLocation={openLocation} />;
    }
  })();

  return (
    <View style={styles.root}>
      {renderedScreen}
      {showNav ? <BottomNav active={activeTab} onSelect={navigateTab} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
