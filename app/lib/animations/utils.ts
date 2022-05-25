import Animated from 'react-native-reanimated';
import color2array from 'color2array';

export function toAnimatedColor(color: string): Animated.Node<number> {
  const [r, g, b] = color2array(color);
  return Animated.color(r, g, b, 1);
}
