import React, { useMemo } from 'react';
import { View, StyleSheet, PixelRatio, ViewStyle } from 'react-native';
import { StyleGuide } from '../resources/StyleGuide';

const styles = StyleSheet.create({
  separator: {
    width: '100%',
  },
});

interface SeparatorProps {
  color: string;
  height?: number;
  wrapperStyle?: ViewStyle;
}
export function Separator(props: SeparatorProps) {
  const { height = StyleGuide.halfPixelBorderWidth, color } = props;
  const style = useMemo(() => ([styles.separator, { backgroundColor: color, height, borderRadius: PixelRatio.roundToNearestPixel(height ? height / 2 : 0) }]), [color, height]);
  return (
    <View style={props.wrapperStyle}>
      <View style={style} />
    </View>
  );
}
