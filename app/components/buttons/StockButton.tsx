import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StockButtonProps } from './interfaces';
import style from '../../screens/Main/style';
import { CHEVRON_RIGHT, FIRE } from '../../resources/images';
import { Typography } from '../Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import I18n from '../../resources/localization/translations';

export function StockButton(props: StockButtonProps) {
  const { load, count, onPress, wrapperStyle } = props;

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={onPress}
      style={wrapperStyle}
    >
      <View style={style.nameContent}>
        <Image
          source={FIRE}
          style={style.imgFire}
        />
        <Typography
          color={StyleGuide.palette.pink}
          type={TypographyTypes.REGULAR17}
        >{I18n.t('stock')}</Typography>
      </View>
      <View style={style.nameContent}>
        {load ? <ActivityIndicator color={StyleGuide.palette.pink} /> : <Typography
          color={StyleGuide.palette.pink}
          type={TypographyTypes.REGULAR14}
        >{count}</Typography>}
        <Image
          source={CHEVRON_RIGHT}
          style={style.imgRightColor}
        />
      </View>
    </TouchableOpacity>
  );
}
