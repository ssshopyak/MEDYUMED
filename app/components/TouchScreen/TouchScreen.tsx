import React from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export function TouchScreen(props: Props) {
  const onPress = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{ flex: 1 }}
    >
      {props.children}
    </TouchableOpacity>
  );
}
