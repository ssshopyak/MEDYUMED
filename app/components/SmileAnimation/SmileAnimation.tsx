import { Animated, Dimensions } from 'react-native';
import React from 'react';
import style from './style';

interface Props{
  animationValue: Animated.Value,
  image: any,
  left: number,
}

const { height } = Dimensions.get('window');

export default function Smile(props: Props) {
  const { animationValue, image, left } = props;

  const smile = { value: (Math.floor(Math.random() * 450) + 30) * (-1), left, top: Math.floor(Math.random() * 50) + 170 };

  return (
    <Animated.Image
      source={image}
      style={[
        style.smile, {
          left: smile.left,
          top: height - smile.top,
          opacity: animationValue.interpolate({
            inputRange: [0.01, 1],
            outputRange: [1, 0],
          }),
        },
        {
          transform: [
            {
              translateY: animationValue.interpolate({
                inputRange: [0.01, 1],
                outputRange: [0, smile.value],
              }),
            },
            {
              scale: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.5],
              }),
            },
          ],
        },
      ]}
    />
  );
}
