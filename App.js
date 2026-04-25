import { useState } from 'react';
import MenuScreen from './src/screens/MenuScreen';
import DirectionsScreen from './src/screens/DirectionsScreen';
import CardScreen from './src/screens/CardScreen';

export default function App() {
  const [screen, setScreen] = useState('menu');

  if (screen === 'directions') {
    return <DirectionsScreen onBack={function () { setScreen('menu'); }} />;
  }
  if (screen === 'game') {
    return <CardScreen onBack={function () { setScreen('menu'); }} />;
  }
  return (
    <MenuScreen
      onPlay={function () { setScreen('game'); }}
      onDirections={function () { setScreen('directions'); }}
    />
  );
}
