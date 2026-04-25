import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';
import HexBackground from '../components/HexBackground';
import { DIRECTIONS } from '../data/directions';
import { s } from '../utils/scale';

const { width } = Dimensions.get('window');

export default function DirectionsScreen({ onBack }) {
  const [pageIndex, setPageIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const animate = function (dir, cb) {
    Animated.sequence([
      Animated.timing(translateX, { toValue: dir * -width, duration: 200, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: dir * width, duration: 0, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(cb);
  };

  const goNext = function () {
    if (pageIndex >= DIRECTIONS.length - 1) { onBack(); return; }
    animate(1, function () { setPageIndex(function (i) { return i + 1; }); });
  };

  const goPrev = function () {
    if (pageIndex === 0) { onBack(); return; }
    animate(-1, function () { setPageIndex(function (i) { return i - 1; }); });
  };

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: function (_, g) { return Math.abs(g.dx) > 20; },
    onPanResponderRelease: function (_, g) {
      if (g.dx < -50) goNext();
      else if (g.dx > 50) goPrev();
    },
  })).current;

  const page = DIRECTIONS[pageIndex];

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <HexBackground />
      <Animated.View style={[styles.card, { transform: [{ translateX }] }]}>
        <View style={[styles.header, { backgroundColor: page.headerColor }]}>
          <Text style={styles.headerText}>{page.headerText}</Text>
        </View>
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
          {page.steps
            ? page.steps.map(function (step, i) {
                return (
                  <View key={i} style={[styles.step, { backgroundColor: step.bg }]}>
                    <Text style={styles.stepText}>{step.text}</Text>
                  </View>
                );
              })
            : <Text style={styles.bodyText}>{page.body}</Text>
          }
        </ScrollView>
        {page.footer ? <Text style={styles.footer}>{page.footer}</Text> : null}
        <View style={styles.nav}>
          <TouchableOpacity onPress={goPrev}>
            <Text style={styles.navText}>{pageIndex === 0 ? '← Menu' : '← Back'}</Text>
          </TouchableOpacity>
          <Text style={styles.navDots}>
            {DIRECTIONS.map(function (_, i) { return i === pageIndex ? '●' : '○'; }).join(' ')}
          </Text>
          <TouchableOpacity onPress={goNext}>
            <Text style={styles.navText}>{pageIndex === DIRECTIONS.length - 1 ? 'Done →' : 'Next →'}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#7B4A1E' },
  card: {
    flex: 1, margin: s(16, 12, 24), backgroundColor: '#FFF', borderRadius: s(16, 12, 24),
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, overflow: 'hidden',
  },
  header: { paddingVertical: s(20, 16, 28), alignItems: 'center' },
  headerText: { fontSize: s(24, 20, 32), fontWeight: '900', color: '#FFF', letterSpacing: 1 },
  body: { flex: 1 },
  bodyContent: { padding: s(20, 16, 28) },
  bodyText: { fontSize: s(15, 13, 18), color: '#333', lineHeight: s(24, 20, 30) },
  step: { borderRadius: s(8, 6, 12), paddingVertical: s(12, 10, 18), paddingHorizontal: s(16, 12, 24), marginVertical: s(5, 4, 8), alignItems: 'center' },
  stepText: { fontSize: s(16, 14, 20), fontWeight: '700', color: '#FFF' },
  footer: { textAlign: 'center', padding: s(12, 10, 16), color: '#999', fontSize: s(13, 11, 16) },
  nav: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: s(20, 16, 28), paddingVertical: s(16, 12, 22),
    borderTopWidth: 1, borderTopColor: '#EEE',
  },
  navText: { fontSize: s(15, 13, 18), color: '#2980B9', fontWeight: '700' },
  navDots: { fontSize: s(12, 10, 14), color: '#999', letterSpacing: 4 },
});
