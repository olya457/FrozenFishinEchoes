import type {ImageSourcePropType} from 'react-native';

export type TabKey = 'explore' | 'map' | 'stories' | 'quiz' | 'saved';

export type Location = {
  id: string;
  name: string;
  country: string;
  flag: string;
  coordinates: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  temperature: string;
  thickness: string;
  mainFishIds: string[];
  description: string;
  image: ImageSourcePropType;
  marker: {
    x: number;
    y: number;
  };
};

export type Fish = {
  id: string;
  name: string;
  latin: string;
  habitat: string;
  avgWeight: string;
  bestDepth: string;
  season: string;
  description: string;
  image: ImageSourcePropType;
};

export type Story = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  body: string[];
  image: ImageSourcePropType;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
};

export type QuizSet = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export type OnboardingSlide = {
  id: string;
  title: string;
  text: string;
  action: string;
  image: ImageSourcePropType;
  icon: string;
};
