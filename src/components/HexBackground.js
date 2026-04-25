import { StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { s } from '../utils/scale';

const { width, height } = Dimensions.get('window');

// Pointy-top hexagons: tips at top & bottom, flat sides left & right.
export default function HexBackground() {
  const r = s(40, 30, 55);
  const hexW = Math.sqrt(3) * r;
  const colSpacing = hexW;
  const rowSpacing = r * 1.5;

  const cols = Math.ceil(width  / colSpacing) + 3;
  const rows = Math.ceil(height / rowSpacing) + 3;

  const hexPoints = function (cx, cy) {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 90);
      pts.push(
        (cx + r * Math.cos(angle)).toFixed(1) + ',' +
        (cy + r * Math.sin(angle)).toFixed(1)
      );
    }
    return pts.join(' ');
  };

  const hexagons = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * colSpacing + (row % 2 === 1 ? colSpacing / 2 : 0) - hexW;
      const cy = row * rowSpacing - r;
      hexagons.push(
        <Polygon key={row + '-' + col} points={hexPoints(cx, cy)}
          fill="#7B4A1E" stroke="#5C3510" strokeWidth="1.5" />
      );
    }
  }

  return (
    <Svg style={StyleSheet.absoluteFill} width={width} height={height}>
      {hexagons}
    </Svg>
  );
}
