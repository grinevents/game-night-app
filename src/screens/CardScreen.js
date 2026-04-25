import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Vibration, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';
import HexBackground from '../components/HexBackground';
import CardSlider from '../components/CardSlider';
import { CARDS } from '../data/cards';
import { COLORS, randomColor } from '../data/colors';
import { TIMER_DURATION } from '../data/directions';
import { s } from '../utils/scale';

const { width } = Dimensions.get('window');

// Timer states: 'new' | 'running' | 'paused' | 'done'
export default function CardScreen({ onBack }) {
  const [cardIndex, setCardIndex] = useState(function () {
    return Math.floor(Math.random() * CARDS.length);
  });
  const [activeColor, setActiveColor] = useState(function () { return randomColor(); });
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerState, setTimerState] = useState('new');
  const [cardsViewed, setCardsViewed] = useState(1);
  const translateX = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);
  const timerStateRef = useRef('new');
  const cardsViewedRef = useRef(1);

  const card = CARDS[cardIndex % CARDS.length];

  useEffect(function () {
    timerStateRef.current = timerState;
  }, [timerState]);

  const clearTimer = function () { clearInterval(timerRef.current); };

  const resetTimer = function () {
    clearTimer();
    setTimeLeft(TIMER_DURATION);
    setTimerState('new');
  };

  const startTick = function () {
    clearTimer();
    timerRef.current = setInterval(function () {
      if (timerStateRef.current !== 'running') return;
      setTimeLeft(function (prev) {
        if (prev <= 1) {
          clearTimer();
          setTimerState('done');
          Vibration.vibrate([500, 200, 500]);
          const viewed = cardsViewedRef.current;
          Alert.alert(
            "Time's Up!",
            "You viewed " + viewed + " card" + (viewed === 1 ? "" : "s") + ".\nHow many did you get right?\n\nPass to the next player.\nSwipe left for the next card.",
            [{ text: "OK" }]
          );
          return 0;
        }
        if (prev === 11) Vibration.vibrate(100);
        return prev - 1;
      });
    }, 1000);
  };

  const handleHeaderTap = function () {
    if (timerState === 'new') {
      setCardsViewed(1);
      cardsViewedRef.current = 1;
      setTimerState('running');
      startTick();
    } else if (timerState === 'running') {
      clearTimer();
      setTimerState('paused');
    } else if (timerState === 'paused') {
      setTimerState('running');
      startTick();
    }
    // 'done' — tapping does nothing; use Reset
  };

  const animateCard = function (dir, cb) {
    Animated.sequence([
      Animated.timing(translateX, { toValue: dir * -width, duration: 200, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: dir * width, duration: 0, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(cb);
  };

  const nextCard = function () {
    animateCard(1, function () {
      setCardIndex(function (i) { return (i + 1) % CARDS.length; });
      setActiveColor(randomColor());
      setCardsViewed(function (n) { const next = n + 1; cardsViewedRef.current = next; return next; });
      if (timerStateRef.current === 'new' || timerStateRef.current === 'done') resetTimer();
    });
  };

  const prevCard = function () {
    animateCard(-1, function () {
      setCardIndex(function (i) { return (i - 1 + CARDS.length) % CARDS.length; });
      setActiveColor(randomColor());
      if (timerStateRef.current === 'new' || timerStateRef.current === 'done') resetTimer();
    });
  };

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: function (_, g) {
      return Math.abs(g.dx) > 20 || Math.abs(g.dy) > 20;
    },
    onPanResponderRelease: function (_, g) {
      const absX = Math.abs(g.dx);
      const absY = Math.abs(g.dy);
      if (absX > absY) {
        if (g.dx < -50) nextCard();
        else if (g.dx > 50) prevCard();
      } else {
        if (g.dy > 50 && timerStateRef.current === 'paused') resetTimer();
      }
    },
  })).current;

  const hintTop = (function () {
    if (timerState === 'new')     return 'tap the top to start the timer';
    if (timerState === 'running') return 'tap the top to pause the timer';
    if (timerState === 'paused')  return 'tap the top to resume · swipe ↓ to reset';
    if (timerState === 'done')    return 'pass to the next player';
    return '';
  })();

  const hintBottom = 'swipe left for the next card';

  const timerDisplay = (function () {
    if (timerState === 'done')    return 'TIME!';
    if (timerState === 'new')     return '▶ ' + TIMER_DURATION;
    if (timerState === 'paused')  return '❙❙ ' + timeLeft;
    return String(timeLeft);
  })();

  const timerColor = timeLeft <= 10 && timerState !== 'new' ? '#E74C3C' : '#2ECC71';
  const headerBg = '#222222';
  const isWild = activeColor.key === 'wild';

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <HexBackground />

      <TouchableOpacity style={[styles.header, { backgroundColor: headerBg }]} onPress={handleHeaderTap}>
        <Text style={styles.headerTitle}>GAME NIGHT</Text>
        <Text style={styles.headerSub}>by Grin Events</Text>
      </TouchableOpacity>

      <Text style={styles.hintText}>{hintTop}</Text>

      <Animated.View style={[styles.card, { transform: [{ translateX }] }]}>
        {Object.entries(COLORS).map(function (entry) {
          const key = entry[0];
          const value = entry[1];
          const isActive = activeColor.key === key || isWild;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.clueRow, { backgroundColor: value.bg }, isActive ? styles.activeClue : styles.inactiveClue]}
              onPress={function () {
                if (timerState === 'new') {
                  setActiveColor({ key: key, label: value.label, bg: value.bg, allPlay: false });
                }
              }}
            >
              <Text style={styles.clueText} numberOfLines={1} adjustsFontSizeToFit>
                {card[key]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      <TouchableOpacity
        style={[styles.colorBadge, { backgroundColor: activeColor.bg }]}
        onPress={function () { if (timerState === 'new') setActiveColor(randomColor()); }}
      >
        <Text style={styles.colorBadgeText}>{activeColor.label}</Text>
        {timerState === 'new' && <Text style={styles.colorBadgeSub}>tap to change</Text>}
      </TouchableOpacity>

      <Text style={[styles.timerText, { color: timerColor }]}>{timerDisplay}</Text>
      <Text style={styles.hintText}>{hintBottom}</Text>

      <CardSlider
        index={cardIndex}
        total={CARDS.length}
        onChange={function (val) { setCardIndex(val); setActiveColor(randomColor()); resetTimer(); }}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.footerBtn}>← Menu</Text>
        </TouchableOpacity>
        <Text style={styles.footerCard}>Card {cardIndex + 1} of {CARDS.length}</Text>
        <TouchableOpacity onPress={resetTimer}>
          <Text style={styles.footerBtn}>Reset ↺</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#7B4A1E' },
  header: { paddingTop: s(50, 44, 70), paddingBottom: s(12, 10, 18), alignItems: 'center' },
  headerTitle: { fontSize: s(22, 18, 28), fontWeight: '900', color: '#FFF', letterSpacing: 4 },
  headerSub: { fontSize: s(11, 10, 14), color: 'rgba(255,255,255,0.7)', letterSpacing: 2, marginTop: s(2, 1, 4) },
  hintText: { fontSize: s(11, 10, 14), color: 'rgba(255,255,255,0.6)', textAlign: 'center', paddingHorizontal: s(16, 12, 24), marginVertical: s(2, 1, 4), letterSpacing: 0.5 },
  card: {
    flex: 1, marginHorizontal: s(16, 12, 24), marginVertical: s(4, 2, 8), backgroundColor: '#FFF',
    borderRadius: s(16, 12, 24), padding: s(8, 6, 12),
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
  },
  clueRow: { flex: 1, borderRadius: s(8, 6, 12), justifyContent: 'center', paddingHorizontal: s(16, 12, 24), marginVertical: s(2, 1, 4) },
  activeClue: { opacity: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 },
  inactiveClue: { opacity: 0.45 },
  clueText: { fontSize: s(18, 15, 24), fontWeight: '700', color: '#FFF', textAlign: 'center', letterSpacing: 0.5 },
  colorBadge: {
    alignSelf: 'center', marginTop: s(6, 4, 10), paddingHorizontal: s(24, 18, 32),
    paddingVertical: s(8, 6, 12), borderRadius: s(20, 16, 28), minWidth: s(160, 130, 210), alignItems: 'center',
  },
  colorBadgeText: { fontSize: s(16, 14, 22), fontWeight: '900', color: '#FFF', letterSpacing: 1 },
  colorBadgeSub: { fontSize: s(10, 9, 13), color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  timerText: { fontSize: s(40, 32, 56), fontWeight: '900', textAlign: 'center', marginVertical: s(4, 2, 8) },
  footer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: s(24, 18, 32), paddingBottom: s(28, 22, 40),
  },
  footerBtn: { fontSize: s(13, 12, 16), color: 'rgba(255,255,255,0.8)', fontWeight: '700' },
  footerCard: { fontSize: s(12, 10, 14), color: 'rgba(255,255,255,0.5)', letterSpacing: 1 },
});
