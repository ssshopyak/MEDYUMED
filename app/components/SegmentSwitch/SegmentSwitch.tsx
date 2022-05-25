import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import style from './style';
import { Typography } from '../Typography';
import { StyleGuide, TypographyTypes } from '../../resources/StyleGuide';

interface Props {
  selectedSegment: number;
  onPress: (num: number) => void,
  date: string[],
}

export function SegmentSwitch(props: Props) {
  return (
    <View style={style.mainSwitch}>
      <View style={style.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props.onPress(0)}
          style={props.selectedSegment === 0 ? style.activeButton : style.disableButton}
        >
          <Typography
            color={props.selectedSegment === 0 ? StyleGuide.palette.pink : StyleGuide.palette.dark_grey}
            type={TypographyTypes.REGULAR14}
          >{props.date[0]}</Typography>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props.onPress(1)}
          style={props.selectedSegment === 1 ? style.activeButton : style.disableButton}
        >
          <Typography
            color={props.selectedSegment === 1 ? StyleGuide.palette.pink : StyleGuide.palette.dark_grey}
            type={TypographyTypes.REGULAR14}
          >{props.date[1]}</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}
