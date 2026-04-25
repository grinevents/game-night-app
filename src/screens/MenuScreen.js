import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import HexBackground from '../components/HexBackground';
import { s } from '../utils/scale';

export default function MenuScreen({ onPlay, onDirections }) {
  return (
    <View style={styles.container}>
      <HexBackground />
      <View style={styles.logoArea}>
        <Text style={styles.title}>Game Night</Text>
        <Text style={styles.subtitle}>by Grin Events</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onDirections}>
          <Text style={styles.buttonText}>Learn To Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Choose A Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPlay}>
          <Text style={styles.buttonText}>Play Now</Text>
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
  logoArea: { alignItems: 'center', marginTop: s(40, 30, 60) },
  title: { fontSize: s(28, 22, 36), fontWeight: '700', color: '#FFF', letterSpacing: 4 },
  subtitle: { fontSize: s(14, 12, 18), color: 'rgba(255,255,255,0.7)', letterSpacing: 3, marginTop: s(4, 3, 6) },
  buttons: { width: '80%', alignItems: 'center', gap: s(4, 2, 10) },
  button: { paddingVertical: s(12, 10, 18), alignItems: 'center', width: '100%' },
  buttonText: { fontSize: s(22, 18, 28), fontWeight: '700', color: '#FFFFFF', letterSpacing: 1 },
  cardTeaser: { width: '100%', alignItems: 'center', marginBottom: -20, overflow: 'hidden' },
  teaserImage: { width: '100%', height: s(300, 220, 420) },
});
