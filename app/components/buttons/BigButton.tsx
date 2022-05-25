import { ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { BigButtonProps } from './interfaces';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { Typography } from '../Typography';

export function BigButton(props: BigButtonProps) {
  const { text, disabled, disabledBackgroundColor, backgroundColor, textColor, disabledTextColor, containerStyle, load } = props;

  const _containerStyle = useMemo(() => [
    containerStyle,
    { backgroundColor: disabled ? disabledBackgroundColor : backgroundColor },
  ], [containerStyle, disabled, disabledBackgroundColor, backgroundColor]);

  return (
    <TouchableOpacity
      {...props}
      style={_containerStyle}
    >
      {load ? <ActivityIndicator color={StyleGuide.palette.white} /> : <Typography
        color={disabled ? disabledTextColor : textColor}
        type={TypographyTypes.REGULAR16}
      >{text}</Typography>}
    </TouchableOpacity>
  );
}

BigButton.defaultProps = {
  disabled: false,
  backgroundColor: StyleGuide.palette.pink,
  disabledBackgroundColor: StyleGuide.palette.gray,
  textColor: StyleGuide.palette.white,
  disabledTextColor: StyleGuide.palette.white,
};
