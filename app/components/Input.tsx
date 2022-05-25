import React, { useCallback, useMemo } from 'react';
import {
  View, StyleSheet, ViewStyle, Text, Keyboard, TextStyle,
} from 'react-native';
import moment from 'moment';
import { Separator } from './Separator';
import { StyleGuide } from '../resources/StyleGuide';
import { DatePicker } from './DatePicker';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  input: {
    ...StyleGuide.typography.REGULAR17,
    color: StyleGuide.palette.black,
    paddingHorizontal: 0,
  },
});

interface InputImitationProps {
  wrapperStyle?: ViewStyle;
  onPress?: () => void;
  value?: string;
  placeholder: string;
}
export function InputImitation(props: InputImitationProps) {
  const { onPress } = props;
  const wrapperStyle = useMemo(() => StyleSheet.flatten([styles.wrapper, props.wrapperStyle]), [props.wrapperStyle]);
  const style = useMemo(() => [styles.input, { color: props.value ? StyleGuide.palette.black : StyleGuide.palette.dark_grey }], [props.value]);
  return (
    <View style={wrapperStyle}>
      <Text
        {...props}
        onPress={onPress}
        style={style}
      >
        {props.value || props.placeholder}
      </Text>
      <Separator color={StyleGuide.palette.light_gray} />
    </View>
  );
}

interface DateInputProps {
  value?: moment.Moment;
  placeholder: string;
  wrapperStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onChange: (value: moment.Moment) => void;
  date: boolean;
  timeSelected?: boolean;
}
export function DateInput(props: DateInputProps) {
  const wrapperStyle = useMemo(() => [styles.wrapper, props.wrapperStyle], [props.wrapperStyle]);
  const style = useMemo(() => [styles.input, props.inputStyle, { opacity: props.value && (props.date || props.timeSelected) ? 1 : 0.3 }], [props.inputStyle, props.value, props.date, props.timeSelected]);
  const { value, onChange } = props;
  const format = 'DD.MM.YYYY';
  const showPicker = useCallback(() => {
    Keyboard.dismiss();
    DatePicker.show({
      onChange: (date) => {
        onChange(moment(date));
      },
      value: value ? moment(value, format).toDate() : new Date(),
      mode: props.date,
    });
  }, [value, props.date, onChange]);
  return (
    <View style={wrapperStyle}>
      <Text
        {...props}
        onPress={showPicker}
        style={style}
      >
        {props.value && (props.date || props.timeSelected) ? props.value.format(format) : props.placeholder}
      </Text>
    </View>
  );
}
