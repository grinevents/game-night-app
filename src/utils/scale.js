import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Base design width: 375px (iPhone 7 / SE).
// All sizes scale proportionally from this baseline.
export const BASE_WIDTH = 375;
export const scale = width / BASE_WIDTH;

// s(size, min, max) — scale a value with optional floor and ceiling
export function s(size, min, max) {
  let val = Math.round(size * scale);
  if (min !== undefined) val = Math.max(min, val);
  if (max !== undefined) val = Math.min(max, val);
  return val;
}
