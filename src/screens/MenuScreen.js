import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import HexBackground from '../components/HexBackground';
import { s } from '../utils/scale';

export default function MenuScreen({ onPlay, onDirections }) {
  return (
    <View style={styles.container}>
      <HexBackground />
      <View style={styles.logoArea}>
        <Image
          source={require('../../assets/game-on-circle.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onDirections}>
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>Learn To Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>Choose A Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPlay}>
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>Play Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardTeaser}>
        <Image
          source={require('../../assets/directions-tilted.png')}
          style={styles.teaserImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#7B4A1E',
    alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: s(40, 30, 60),
  },
  logoArea: { alignItems: 'center', marginTop: s(20, 10, 40) },
  logo: { width: s(200, 150, 280), height: s(200, 150, 280) },
  buttons: { width: '80%', alignItems: 'center', gap: s(4, 2, 10) },
  button: { paddingVertical: s(12, 10, 18), alignItems: 'center', width: '100%' },
  buttonText: { fontSize: s(22, 18, 28), fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
  cardTeaser: { width: '100%', alignItems: 'center', marginBottom: -20, overflow: 'hidden' },
  teaserImage: { width: '100%', height: s(300, 220, 420) },
});
