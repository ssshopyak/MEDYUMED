import React from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import style from './styles';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';
import { Typography } from '../Typography';

interface ButtonEntryProps {
  needImg?: boolean,
  load: boolean,
  needLoad?: boolean,
  onPress: ()=>void,
  img?: ImageSourcePropType,
  tintColor?: string,
  backgroundColor?: string,
  text: string,
}

export default function ButtonEntry(props: ButtonEntryProps) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={props.load}
      onPress={props.onPress}
      style={[style.buttonCancel, { backgroundColor: props.backgroundColor }]}
    >
      {props.needLoad && props.load ? <ActivityIndicator color={StyleGuide.palette.pink} /> : <View style={style.mainViewContent}>
        {props.needImg ? <Image
          source={props.img!}
          style={[style.imgButtonCancel, { tintColor: props.tintColor }]}
        /> : null}
        <Typography
          color={props.tintColor}
          type={TypographyTypes.REGULAR14}
        >{props.text}</Typography>
      </View>}
    </TouchableOpacity>
  );
}

ButtonEntry.defaultProps = {
  backgroundColor: StyleGuide.palette.white,
  tintColor: StyleGuide.palette.white,
};
