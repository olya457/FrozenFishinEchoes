import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-maps', () => {
  const ReactMock = require('react');
  const {View} = require('react-native');

  const MockMapView = ReactMock.forwardRef(
    (
      {children, ...props}: {children: React.ReactNode},
      ref: React.Ref<unknown>,
    ) => {
      ReactMock.useImperativeHandle(ref, () => ({
        animateToRegion: jest.fn(),
        fitToCoordinates: jest.fn(),
      }));

      return <View {...props}>{children}</View>;
    },
  );

  return {
    __esModule: true,
    default: MockMapView,
    Marker: ({children}: {children: React.ReactNode}) => (
      <View>{children}</View>
    ),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));

test('renders correctly', async () => {
  jest.useFakeTimers();
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    await Promise.resolve();
  });

  ReactTestRenderer.act(() => {
    renderer?.unmount();
  });

  jest.useRealTimers();
});
