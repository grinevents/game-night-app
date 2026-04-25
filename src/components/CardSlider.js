import { useRef } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import { s } from '../utils/scale';

export default function CardSlider({ index, total, onChange }) {
  const trackWidth = useRef(0);

  const sliderPan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: function () { return true; },
    onPanResponderGrant: function (e) {
      if (trackWidth.current === 0) return;
      const x = e.nativeEvent.locationX;
      const ratio = Math.max(0, Math.min(1, x / trackWidth.current));
      onChange(Math.round(ratio * (total - 1)));
    },
    onPanResponderMove: function (e) {
      if (trackWidth.current === 0) return;
      const x = e.nativeEvent.locationX;
      const ratio = Math.max(0, Math.min(1, x / trackWidth.current));
      onChange(Math.round(ratio * (total - 1)));
    },
  })).current;

  const thumbPos = total > 1 ? (index / (total - 1)) * 100 : 0;

  return (
    <View style={styles.sliderRow}>
      <View
        style={styles.sliderTrack}
        onLayout={function (e) { trackWidth.current = e.nativeEvent.layout.width; }}
        {...sliderPan.panHandlers}
      >
        <View style={[styles.sliderFill, { width: thumbPos + '%' }]} />
        <View style={[styles.sliderThumb, { left: thumbPos + '%' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderRow: { paddingHorizontal: s(24, 18, 32), marginBottom: s(4, 2, 8) },
  sliderTrack: {
    height: s(30, 24, 40), justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: s(15, 12, 20),
  },
  sliderFill: { height: 4, backgroundColor: '#FFF', borderRadius: 2 },
  sliderThumb: {
    position: 'absolute', width: s(18, 14, 24), height: s(18, 14, 24),
    borderRadius: s(9, 7, 12), backgroundColor: '#FFF',
    marginLeft: -s(9, 7, 12), top: s(6, 5, 8),
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3, shadowRadius: 2, elevation: 3,
  },
});
